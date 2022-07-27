import { pixelSize } from "../../../../Constants/Constants";

export type TileMeta = {
    id: number;
    position: [number, number];
    value: number;
    mergeWith?: number;
};

const tileMargin = 2 * pixelSize() - 2;

const tileWidthMultiplier = 13;

const tileWidth = tileWidthMultiplier * pixelSize();

export const tileTotalWidth = tileWidth + tileMargin;