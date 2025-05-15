import { factoredInteger } from "./util";

export const RotationType_WHD = 0;
export const RotationType_HWD = 1;
export const RotationType_HDW = 2;
export const RotationType_DHW = 3;
export const RotationType_DWH = 4;
export const RotationType_WDH = 5;

export type RotationType = 0 | 1 | 2 | 3 | 4 | 5;

export const WidthAxis = 0;
export const HeightAxis = 1;
export const DepthAxis = 2;

export type Axis = 0 | 1 | 2;

export type Position = [number, number, number];

export const StartPosition: Position = [0, 0, 0];

export const RotationTypeStrings: { [key in RotationType]: string } = {
  [RotationType_WHD]: "RotationType_WHD (w,h,d)",
  [RotationType_HWD]: "RotationType_HWD (h,w,d)",
  [RotationType_HDW]: "RotationType_HDW (h,d,w)",
  [RotationType_DHW]: "RotationType_DHW (d,h,w)",
  [RotationType_DWH]: "RotationType_DWH (d,w,h)",
  [RotationType_WDH]: "RotationType_WDH (w,d,h)",
};

export default class Item {
  name: string = "";
  width: number = 0;
  height: number = 0;
  depth: number = 0;
  weight: number = 0;
  allowedRotation: RotationType[] = [0, 1, 2, 3, 4, 5];

  rotationType: RotationType = RotationType_WHD;
  position: Position = [0, 0, 0]; // x, y, z

  constructor(
    name: string,
    w: number,
    h: number,
    d: number,
    wg: number,
    allowedRotation?: RotationType[]
  ) {
    this.name = name;
    this.width = factoredInteger(w);
    this.height = factoredInteger(h);
    this.depth = factoredInteger(d);
    this.weight = factoredInteger(wg);
    this.allowedRotation = allowedRotation
      ? allowedRotation
      : this.allowedRotation;
  }

  getWidth(): number {
    return this.width;
  }

  getHeight(): number {
    return this.height;
  }

  getDepth(): number {
    return this.depth;
  }

  getWeight(): number {
    return this.weight;
  }

  getRotationType(): RotationType {
    return this.rotationType;
  }

  getAllowedRotation(): RotationType[] {
    return this.allowedRotation;
  }

  getRotationTypeString(): string {
    return RotationTypeStrings[this.getRotationType()];
  }

  getDimension(): [number, number, number] {
    let d: [number, number, number];
    switch (this.rotationType) {
      case RotationType_WHD:
        d = [this.getWidth(), this.getHeight(), this.getDepth()];
        break;
      case RotationType_HWD:
        d = [this.getHeight(), this.getWidth(), this.getDepth()];
        break;
      case RotationType_HDW:
        d = [this.getHeight(), this.getDepth(), this.getWidth()];
        break;
      case RotationType_DHW:
        d = [this.getDepth(), this.getHeight(), this.getWidth()];
        break;
      case RotationType_DWH:
        d = [this.getDepth(), this.getWidth(), this.getHeight()];
        break;
      case RotationType_WDH:
        d = [this.getWidth(), this.getDepth(), this.getHeight()];
        break;
    }
    return d;
  }

  intersect(i2: Item): boolean {
    return (
      rectIntersect(this, i2, WidthAxis, HeightAxis) &&
      rectIntersect(this, i2, HeightAxis, DepthAxis) &&
      rectIntersect(this, i2, WidthAxis, DepthAxis)
    );
  }

  getVolume(): number {
    return this.getWidth() * this.getHeight() * this.getDepth();
  }

  toString(): string {
    return `Item:${
      this.name
    } (${this.getRotationTypeString()} = ${this.getDimension().join(
      "x"
    )}, Wg. = ${this.weight})`;
  }
}

export const rectIntersect = (
  i1: Item,
  i2: Item,
  x: Axis,
  y: Axis
): boolean => {
  let d1: [number, number, number],
    d2: [number, number, number],
    cx1: number,
    cy1: number,
    cx2: number,
    cy2: number,
    ix: number,
    iy: number;

  d1 = i1.getDimension();
  d2 = i2.getDimension();

  cx1 = i1.position[x] + d1[x] / 2;
  cy1 = i1.position[y] + d1[y] / 2;
  cx2 = i2.position[x] + d2[x] / 2;
  cy2 = i2.position[y] + d2[y] / 2;

  ix = Math.max(cx1, cx2) - Math.min(cx1, cx2);
  iy = Math.max(cy1, cy2) - Math.min(cy1, cy2);

  return ix < (d1[x] + d2[x]) / 2 && iy < (d1[y] + d2[y]) / 2;
};
