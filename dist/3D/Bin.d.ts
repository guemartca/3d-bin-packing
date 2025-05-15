import Item, { Position, RotationType } from "./Item";
export default class Bin {
    name: string;
    width: number;
    height: number;
    depth: number;
    maxWeight: number;
    items: Item[];
    constructor(name: string, w: number, h: number, d: number, mw: number);
    getName(): string;
    getWidth(): number;
    getHeight(): number;
    getDepth(): number;
    getMaxWeight(): number;
    getItems(): Item[];
    getVolume(): number;
    getPackedWeight(): number;
    weighItem(item: Item): boolean;
    /**
     * Calculate a score for a given item and rotation type.
     *
     * Scores are higher for rotations that closest match item dimensions to Bin dimensions.
     * For example, rotating the item so the longest side is aligned with the longest Bin side.
     *
     * Example (Bin is 11 x 8.5 x 5.5, Item is 8.1 x 5.2 x 5.2):
     *  Rotation 0:
     *    8.1 / 11  = 0.736
     *    5.2 / 8.5 = 0.612
     *    5.2 / 5.5 = 0.945
     *    -----------------
     *    0.736 ** 2 + 0.612 ** 2 + 0.945 ** 2 = 1.809
     *
     *  Rotation 1:
     *    8.1 / 8.5 = 0.953
     *    5.2 / 11 = 0.473
     *    5.2 / 5.5 = 0.945
     *    -----------------
     *    0.953 ** 2 + 0.473 ** 2 + 0.945 ** 2 = 2.025
     *
     * @param {Item} item
     * @param {RotationType} rotationType
     * @return {number} score
     */
    scoreRotation(item: Item, rotationType: RotationType): number;
    /**
     * Calculate the best rotation order for a given Item based on scoreRotation().
     *
     * @param {Item} item
     * @return {Array<RotationType>} Rotation types sorted by their score, DESC
     */
    getBestRotationOrder(item: Item): RotationType[];
    putItem(item: Item, p: Position): boolean;
    toString(): string;
}
