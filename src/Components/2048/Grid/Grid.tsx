import React from "react";
import { useBoard } from "../Board/useBoard";

import "./grid.scss";
const Grid = () => {
    const [containerWidth, tileCount] = useBoard();

    const renderGrid = () => {

        const length = tileCount * tileCount;
        const cells = [] as JSX.Element[];

        for (let index = 0; index < length; index += 1) {
            cells.push(<div key={`${index}`} className={`grid-cell`} />);
        }

        return cells;
    };

    return <div className="grid" > {renderGrid()}</div >;
};
export default Grid;