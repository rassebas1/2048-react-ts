import React from "react";
import { BoardProvider } from "./BoardContext";
import { boardMargin, tileCount as defaultTileCount } from "./models/BoardModels";
import Grid from "../Grid/Grid";
import { TileMeta, tileTotalWidth } from "../Tile/models/TileModels";
import Tile from "../Tile/Tile";
import "./board.scss";
type Props = {
    tiles: TileMeta[];
    tileCountPerRow: number;
};

const Board = ({ tiles, tileCountPerRow = defaultTileCount }: Props) => {
    // container width = tile width * tile count per row
    const containerWidth = tileTotalWidth * tileCountPerRow;
    // board width = container width + margin
    const boardWidth = containerWidth + boardMargin;

    // render all tiles on the board
    const tileList = tiles.map(({ id, ...restProps }) => (
        <Tile key={`tile-${id}`} {...restProps} zIndex={id} />
    ));

    return (
        <div className="board" >
            <BoardProvider
                containerWidth={containerWidth}
                tileCount={tileCountPerRow}
            >
                <div className="tile-container">{tileList}

                </div>
                <Grid />
            </BoardProvider>
        </div>
    );
};
export default Board;