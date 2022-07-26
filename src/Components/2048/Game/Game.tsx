import React, { TouchEvent, useEffect, useState } from "react";
import { useThrottledCallback } from "use-debounce";

import { useGame } from "./useGame";
import Board from "../Board/BoardView";
import { animationDuration, tileCount } from "../Board/models/BoardModels";

const Game = () => {

    const [tiles, moveLeft, moveRight, moveUp, moveDown, resetGame, score, highScore] = useGame();
    let gameOver = false;
    let startX = 0;
    let startY = 0;
    const [oldHighScore, setOldHighScore] = useState(0);

    const handleTouchStart = (event: TouchEvent) => {

        console.log("touuche", event);

        if (gameOver) {
            return;
        }
        if (event.touches.length != 1) {
            return;
        }
        startX = event.touches[0].screenX;
        startY = event.touches[0].screenY;

    }
    const handleTouchEnd = (event: TouchEvent) => {
        console.log("touuche", event);
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
            console.log("horizontal");

        } else if (Math.abs(deltaY) > 3 * Math.abs(deltaX) && Math.abs(deltaY) > 30) {
            direction = deltaY > 0 ? moveDown : moveUp;
            console.log("vertical");

        }
        if (direction) {
            direction();
        }


    }
    const handleKeyDown = (e: KeyboardEvent | TouchEvent | MouseEvent) => {
        // disables page scrolling with keyboard arrows
        e.preventDefault();
        console.log(e);

        if (e.type === "keydown") {
            const evt = e as KeyboardEvent;
            switch (evt.code) {
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
        }
        if (e.type === "touchstart") {
            e.preventDefault();
            console.log("touch", e);
            handleTouchStart(e as TouchEvent);
        }
        if (e.type === "touchend") {
            e.preventDefault();
            console.log("touch", e);
            handleTouchEnd(e as TouchEvent);
        }
    }
    // protects the reducer from being flooded with events.
    const throttledHandleKeyDown = useThrottledCallback(
        handleKeyDown,

        animationDuration,
        { leading: true, trailing: false }
    );

    useEffect(() => {


        window.addEventListener("keydown", throttledHandleKeyDown);

        window.addEventListener("touchstart", throttledHandleKeyDown, true);
        window.addEventListener("touchend", throttledHandleKeyDown, true);
        return () => {
            window.removeEventListener("touchstart", throttledHandleKeyDown);
            window.removeEventListener("touchend", throttledHandleKeyDown);
            window.removeEventListener("keydown", throttledHandleKeyDown);
        };
    }, [throttledHandleKeyDown]);

    return (
        <div className="game">
            <div id="board-container" >
                <Board tiles={tiles} tileCountPerRow={tileCount} />

            </div>
            <div>
                <span style={{ color: "black" }}>Score: {score}</span>
                <span style={{ color: "black" }}>Highest Score: {highScore}</span>
            </div>
            <button onClick={resetGame}>Reset</button>
        </div >
    );
};
export default Game;