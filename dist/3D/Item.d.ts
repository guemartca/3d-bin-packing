export declare const RotationType_WHD = 0;
export declare const RotationType_HWD = 1;
export declare const RotationType_HDW = 2;
export declare const RotationType_DHW = 3;
export declare const RotationType_DWH = 4;
export declare const RotationType_WDH = 5;
export type RotationType = 0 | 1 | 2 | 3 | 4 | 5;
export declare const WidthAxis = 0;
export declare const HeightAxis = 1;
export declare const DepthAxis = 2;
export type Axis = 0 | 1 | 2;
export type Position = [number, number, number];
export declare const StartPosition: Position;
export declare const RotationTypeStrings: {
    [key in RotationType]: string;
};
export default class Item {
    name: string;
    width: number;
    height: number;
    depth: number;
    weight: number;
    allowedRotation: RotationType[];
    rotationType: RotationType;
    position: Position;
    constructor(name: string, w: number, h: number, d: number, wg: number, allowedRotation?: RotationType[]);
    getWidth(): number;
    getHeight(): number;
    getDepth(): number;
    getWeight(): number;
    getRotationType(): RotationType;
    getAllowedRotation(): RotationType[];
    getRotationTypeString(): string;
    getDimension(): [number, number, number];
    intersect(i2: Item): boolean;
    getVolume(): number;
    toString(): string;
}
export declare const rectIntersect: (i1: Item, i2: Item, x: Axis, y: Axis) => boolean;
