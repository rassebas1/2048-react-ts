import React, { TouchEvent, useEffect, useState } from "react";
import { useThrottledCallback } from "use-debounce";

import { useGame } from "./useGame";
import Board from "../Board/BoardView";
import { animationDuration, tileCount } from "../Board/models/BoardModels";
import "./game.scss"

const Game = () => {

    const [tiles, moveLeft, moveRight, moveUp, moveDown, resetGame, score, highScore] = useGame();
    let gameOver = false;
    let startX = 0;
    let startY = 0;
    const [oldHighScore, setOldHighScore] = useState(0);

    const handleTouchStart = (event: TouchEvent) => {
        event.preventDefault();
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
        event.preventDefault();
        if (gameOver) {
            return;
        }
        if (event.changedTouches.length != 1) {
            return;
        }
        var deltaX = event.changedTouches[0].screenX - startX;
        var deltaY = event.changedTouches[0].screenY - startY;
        var direction = () => { };
        if (Math.abs(deltaX) > 2 * Math.abs(deltaY) && Math.abs(deltaX) > 20) {
            direction = deltaX > 0 ? moveRight : moveLeft;

        } else if (Math.abs(deltaY) > 2 * Math.abs(deltaX) && Math.abs(deltaY) > 20) {
            direction = deltaY > 0 ? moveDown : moveUp;

        }
        if (direction) {
            direction();
        }


    }
    const handleKeyDown = (e: KeyboardEvent | TouchEvent) => {
        // disables page scrolling with keyboard arrows

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
            handleTouchStart(e as TouchEvent);
        }
        if (e.type === "touchend") {
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

        window.addEventListener("touchstart", (evt) => throttledHandleKeyDown(evt as unknown as TouchEvent), false);
        window.addEventListener("touchend", (evt) => throttledHandleKeyDown(evt as unknown as TouchEvent), false);
        return () => {
            window.removeEventListener("touchstart", () => throttledHandleKeyDown);
            window.removeEventListener("touchend", () => throttledHandleKeyDown);
            window.removeEventListener("keydown", throttledHandleKeyDown);
        };
    }, [throttledHandleKeyDown]);

    return (
        <div className="game">
            <div id="board-container" >
                <Board tiles={tiles} tileCountPerRow={tileCount} />

            </div>
            <div className="score-container">
                <i></i>
                <span>Score: {score}</span>
                <span>HighScore: {highScore}</span>
            </div>
            <button onClick={resetGame}>Reset</button>
        </div >
    );
};
export default Game;