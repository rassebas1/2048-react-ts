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

    const handleTouchStart = (event: React.TouchEvent) => {
         event.preventDefault();
        console.log("touuche",event);
        
        if (gameOver) {
            return;
        }
        if (event.touches.length != 1) {
            return;
        }
        startX = event.touches[0].screenX;
        startY = event.touches[0].screenY;

    }
    const handleTouchEnd = (event: React.TouchEvent) => {
         event.preventDefault();
        if (gameOver) {
            return;
        }
        if (event.changedTouches.length != 1) {
            return;
        }
        var deltaX = event.changedTouches[0].screenX - startX;
        var deltaY = event.changedTouches[0].screenY - startY;
        console.log("end", deltaX);
        console.log("end", deltaY);
        var direction = () => { };
        if (Math.abs(deltaX) > 3 * Math.abs(deltaY) && Math.abs(deltaX) > 30) {
            direction = deltaX > 0 ? moveRight : moveLeft;
            console.log("horizontal", direction);

        } else if (Math.abs(deltaY) > 3 * Math.abs(deltaX) && Math.abs(deltaY) > 30) {
            direction = deltaY > 0 ? moveDown : moveUp;

        }
        if (direction) {
            direction();
        }
        console.log();

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
        // window.addEventListener("touchstart", handleTouchStart);
        // window.addEventListener("touchend", handleTouchEnd);
        return () => {
            // window.removeEventListener("touchstart", handleTouchStart);
            // window.removeEventListener("touchend", handleTouchEnd);
            window.removeEventListener("keydown", throttledHandleKeyDown);
        };
    }, [throttledHandleKeyDown]);

    return (
        <div className="game">
            <div id="board-container" onTouchStart={(evt)=>handleTouchStart(evt)} onTouchEnd={(evt)=>handleTouchEnd(evt)}>
                <Board tiles={tiles} tileCountPerRow={tileCount} />

            </div>
            <div>
                <span style={{ color: "black" }}>Score: {score}</span>
            </div>
            <button onClick={resetGame}>Reset</button>
        </div >
    );
};
export default Game;