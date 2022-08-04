import React, { useEffect, useState } from 'react'
import { pixelSize } from '../../../Constants/Constants';
import { usePrevProps } from '../../../Hooks/usePrevProps'
import { useBoard } from '../Board/useBoard'
import "./tile.scss"
type TileProps = {
    // tile value - 2, 4, 8, 16, 32, ..., 2048.∂
    value: number;
    // an array containing the x and y index on the board.
    position: [number, number];
    // the order of tile on the tile stack.
    zIndex: number;
};
export default function TileView(props: TileProps) {

    // retrieves board properties
    const [containerWidth, tileCount] = useBoard();
    //  state required to animate the highlight
    const [scale, setScale] = useState(1);

    // the previous value (prop) - it is undefined if it is a new tile.
    const previousValue = usePrevProps<number>(props.value);

    // check if tile is within the board boundries
    const withinBoardBoundaries =
        props.position[0] < tileCount && props.position[1] < tileCount;


    // if it is a new tile...
    const isNew = previousValue === undefined;
    // ...or its value has changed...
    const hasChanged = previousValue !== props.value;
    // ... then the tile should be highlighted.
    const shallHighlight = isNew || hasChanged;

    // useEffect will decide if highlight should be triggered.
    useEffect(() => {
        if (shallHighlight) {
            setScale(1.1);
            setTimeout(() => setScale(1), 100);
        }
    }, [shallHighlight, scale]);

    /**
     * Converts tile position from array index to pixels.
     */
    const positionToPixels = (position: number) => {
        if (pixelSize() === 6) {
            //formula: mobile 320px+
            const pixels = (position) * (containerWidth - 3 * pixelSize()) / tileCount + 1;
            return pixels;

        }
        if (pixelSize() === 8) {

            //formula: small screen 520px+
            const pixels = (position) * (containerWidth - 4 * pixelSize()) / tileCount + 2;
            return pixels;
        }
        if (pixelSize() === 10) {
            //formula: big screen 1200px+
            const pixels = (position) * (containerWidth - 10 * pixelSize()) / tileCount + 2;

            return pixels;
        }

    }


    // all animations come from CSS transition, and we pass them as styles
    const style = {
        // gridRow: props.position[1] + 1,
        // gridColumn: props.position[0] + 1,
        top: positionToPixels(props.position[1]),
        left: positionToPixels(props.position[0]),
        transform: `scale(${scale}) `,
        zIndex: props.zIndex,
    };

    return (
        <div className={`tile tile-${props.value}`} style={style}>
            {props.value}
        </div>
    );


}

