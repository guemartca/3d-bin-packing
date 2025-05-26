import Bin from "./Bin";
import Item, {
  StartPosition,
  WidthAxis,
  HeightAxis,
  DepthAxis,
  Axis,
  Position,
} from "./Item";

export default class Packer {
  bins: Bin[] = [];
  items: Item[] = [];
  unfitItems: Item[] = [];

  addBin(bin: Bin): void {
    this.bins.push(bin);
  }

  addItem(item: Item): void {
    this.items.push(item);
  }

  findFittedBin(i: Item): Bin | null {
    for (let _i = 0; _i < this.bins.length; _i++) {
      let b = this.bins[_i];

      if (!b.weighItem(i) || !b.putItem(i, StartPosition)) {
        continue;
      }

      if (b.items.length === 1 && b.items[0] === i) {
        b.items = [];
      }

      return b;
    }
    return null;
  }

  getBiggerBinThan(b: Bin): Bin | null {
    let v = b.getVolume();
    for (let _i = 0; _i < this.bins.length; _i++) {
      let b2 = this.bins[_i];
      if (b2.getVolume() > v) {
        return b2;
      }
    }
    return null;
  }

  unfitItem(): void {
    if (this.items.length === 0) {
      return;
    }
    this.unfitItems.push(this.items[0]);
    this.items.splice(0, 1);
  }

  packToBin(b: Bin, items: Item[]): Item[] {
    let b2: Bin | null = null;
    let unpacked: Item[] = [];
    let fit = b.weighItem(items[0]) && b.putItem(items[0], StartPosition);

    if (!fit) {
      let b2 = this.getBiggerBinThan(b);
      if (b2) {
        return this.packToBin(b2, items);
      }
      return this.items;
    }

    // Pack unpacked items.
    for (let _i = 1; _i < this.items.length; _i++) {
      let fitted = false;
      let item = this.items[_i];

      if (b.weighItem(item)) {
        // Try available pivots in current bin that are not intersect with
        // existing items in current bin.
        lookup: for (let _pt = 0; _pt < 3; _pt++) {
          for (let _j = 0; _j < b.items.length; _j++) {
            let pv: Position;
            let ib = b.items[_j];
            let d = ib.getDimension();
            switch (_pt as Axis) {
              case WidthAxis:
                pv = [ib.position[0] + d[0], ib.position[1], ib.position[2]];
                break;
              case HeightAxis:
                pv = [ib.position[0], ib.position[1] + d[1], ib.position[2]];
                break;
              case DepthAxis:
                pv = [ib.position[0], ib.position[1], ib.position[2] + d[2]];
                break;
            }

            if (b.putItem(item, pv)) {
              fitted = true;
              break lookup;
            }
          }
        }
      }

      if (!fitted) {
        while (b2 !== null) {
          b2 = this.getBiggerBinThan(b);
          if (b2) {
            b2.items.push(item);
            let left = this.packToBin(b2, b2.items);
            if (left.length === 0) {
              b = b2;
              fitted = true;
              break;
            }
          }
        }

        if (!fitted) {
          unpacked.push(item);
        }
      }
    }

    return unpacked;
  }

  pack(distributeItems: boolean = true): null {
    // Sort bins smallest to largest.
    this.bins.sort((a, b) => {
      return a.getVolume() - b.getVolume();
    });

    // Sort items largest to smallest.
    this.items.sort((a, b) => {
      return b.getVolume() - a.getVolume();
    });

    if (distributeItems) {
      // Original logic: distribute items across bins
      while (this.items.length > 0) {
        let bin = this.findFittedBin(this.items[0]);

        if (bin === null) {
          this.unfitItem();
          continue;
        }

        this.items = this.packToBin(bin, this.items);
      }
    } else {
      // New logic: try to fit all items in each bin
      const originalItems = [...this.items];

      for (const bin of this.bins) {
        // Reset bin items and unfitted items
        bin.items = [];
        bin.unfittedItems = [];

        // Create a Set to track which items have been processed
        const processedItems = new Set<string>();

        // Try to fit all items in this bin
        for (const item of originalItems) {
          // Skip if we've already processed this item
          if (processedItems.has(item.name)) continue;

          let fitted = false;

          if (bin.weighItem(item)) {
            // Try to fit item in the bin
            if (bin.items.length === 0) {
              // If bin is empty, try to fit at start position
              fitted = bin.putItem(item, StartPosition);
            } else {
              // Try to fit item in available spaces
              for (let _pt = 0; _pt < 3; _pt++) {
                for (let _j = 0; _j < bin.items.length; _j++) {
                  let pv: Position;
                  let ib = bin.items[_j];
                  let d = ib.getDimension();

                  switch (_pt as Axis) {
                    case WidthAxis:
                      pv = [
                        ib.position[0] + d[0],
                        ib.position[1],
                        ib.position[2],
                      ];
                      break;
                    case HeightAxis:
                      pv = [
                        ib.position[0],
                        ib.position[1] + d[1],
                        ib.position[2],
                      ];
                      break;
                    case DepthAxis:
                      pv = [
                        ib.position[0],
                        ib.position[1],
                        ib.position[2] + d[2],
                      ];
                      break;
                  }

                  if (bin.putItem(item, pv)) {
                    fitted = true;
                    break;
                  }
                }
                if (fitted) break;
              }
            }
          }

          // Mark this item as processed
          processedItems.add(item.name);

          if (!fitted) {
            bin.unfittedItems.push(item);
          }
        }
      }
    }

    return null;
  }
}
