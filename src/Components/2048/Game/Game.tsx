import React, { useEffect } from "react";
import { useThrottledCallback } from "use-debounce";

import { useGame } from "./useGame";
import Board from "../Board/BoardView";
import { animationDuration, tileCount } from "../Board/models/BoardModels";

const Game = () => {
    const [tiles, moveLeft, moveRight, moveUp, moveDown, resetGame, score] = useGame();
    let gameOver = false;
    let startX = 0;
    let startY = 0;

    const handleTouchStart = (evt: TouchEvent) => {
        evt.preventDefault();
        if (gameOver) {
            return;
        }
        if (evt.touches.length != 1) {
            return;
        }
        startX = evt.touches[0].screenX;
        startY = evt.touches[0].screenY;

    }
    const handleTouchEnd = (evt: TouchEvent) => {
        evt.preventDefault();
        if (gameOver) {
            return;
        }
        if (evt.changedTouches.length != 1) {
            return;
        }
        var deltaX = evt.changedTouches[0].screenX - startX;
        var deltaY = evt.changedTouches[0].screenY - startY;
        var direction = () => { };
        if (Math.abs(deltaX) > 3 * Math.abs(deltaY) && Math.abs(deltaX) > 30) {
            direction = deltaX > 0 ? moveRight : moveLeft;
        } else if (Math.abs(deltaY) > 3 * Math.abs(deltaX) && Math.abs(deltaY) > 30) {
            direction = deltaY > 0 ? moveDown : moveUp;
        }
        if (direction) {
            direction();
        }
    }
    const handleKeyDown = (e: KeyboardEvent) => {
        // disables page scrolling with keyboard arrows
        e.preventDefault();

        switch (e.code) {
            case "ArrowLeft":
                moveLeft();
                break;
            case "ArrowRight":
                moveRight();
                break;
            case "ArrowUp":
                moveUp();
                break;
            case "ArrowDown":
                moveDown();
                break;
        }
    };

    // protects the reducer from being flooded with events.
    const throttledHandleKeyDown = useThrottledCallback(
        handleKeyDown,
        animationDuration,
        { leading: true, trailing: false }
    );

    useEffect(() => {
        window.addEventListener("keydown", throttledHandleKeyDown);

        return () => {
            window.removeEventListener("keydown", throttledHandleKeyDown);
        };
    }, [throttledHandleKeyDown]);

    return (
        <div className="game">
            <div onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
                <Board tiles={tiles} tileCountPerRow={tileCount} />

            </div>
            <div>
                <span style={{ color: "black" }}>Score: {score}</span>
            </div>
            <button onClick={resetGame}>Reset</button>
        </div>
    );
};
export default Game;