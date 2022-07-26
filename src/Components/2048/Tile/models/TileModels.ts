import { pixelSize } from "../../../../Constants/Constants";

export type TileMeta = {
    id: number;
    position: [number, number];
    value: number;
    mergeWith?: number;
};

const tileMargin = 2.25 * pixelSize;

const tileWidthMultiplier = 13;

const tileWidth = tileWidthMultiplier * pixelSize;

export const tileTotalWidth = tileWidth + tileMargin;