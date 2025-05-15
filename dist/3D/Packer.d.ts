import Bin from "./Bin";
import Item from "./Item";
export default class Packer {
    bins: Bin[];
    items: Item[];
    unfitItems: Item[];
    addBin(bin: Bin): void;
    addItem(item: Item): void;
    findFittedBin(i: Item): Bin | null;
    getBiggerBinThan(b: Bin): Bin | null;
    unfitItem(): void;
    packToBin(b: Bin, items: Item[]): Item[];
    pack(): null;
}
