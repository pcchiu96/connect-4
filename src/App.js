import React, { useState, useRef, useEffect } from "react";
import Board from "./Board.js";
import "./App.css";

export default function App() {
    const x = 7;
    const y = 6;
    const empty = "";
    const player1 = "X";
    const player2 = "X";
    const winCondition = 4;

    const arr = Array(x)
        .fill(empty)
        .map(() => Array(y).fill(empty));

    const [board, setBoard] = useState([]);
    const [turn, setTurn] = useState(true);

    useEffect(() => {
        setBoard(arr);
    }, []);

    function updateBoard(x) {
        let newBoard = [...board];
        let y = newBoard[x].length - 1;
        for (; y >= 0; y--) {
            if (newBoard[x][y] === empty) {
                newBoard[x][y] = turn ? player1 : player2;
                break;
            }
        }
        setBoard(newBoard);
        setTurn(!turn);

        if (checkVertical(x, y) || checkHorizontal(x, y) || checkRise(x, y) || checkFall(x, y)) {
            console.log("Connect 4!");
            //TODO make connected 4 tokens glow
        }
    }

    function checkVertical(x, y) {
        let count = 0;
        let token = turn ? player1 : player2;

        for (let down = y; down < board[x].length; down++) {
            if (board[x][down] === token) {
                count++;
            } else {
                break;
            }
        }

        //console.log("down is " + count);
        return count;
    }

    function checkHorizontal(x, y) {
        let count = 0;
        let token = turn ? player1 : player2;

        for (let right = x; right < board.length; right++) {
            if (board[right][y] === token) {
                count++;
            } else {
                break;
            }
        }

        for (let left = x - 1; left >= 0; left--) {
            if (board[left][y] === token) {
                count++;
            } else {
                break;
            }
        }

        //console.log("left and right is " + count);
        return count >= winCondition;
    }

    function checkRise(x, y) {
        let count = 0;
        let token = turn ? player1 : player2;

        for (let right = x, top = y; right < board.length && top >= 0; right++, top--) {
            if (board[right][top] === token) {
                count++;
            } else {
                break;
            }
        }

        for (let left = x - 1, bottom = y + 1; left >= 0 && bottom < board[x].length; left--, bottom++) {
            if (board[left][bottom] === token) {
                count++;
            } else {
                break;
            }
        }

        //console.log("rise is " + count);
        return count >= winCondition;
    }

    function checkFall(x, y) {
        let count = 0;
        let token = turn ? player1 : player2;

        for (let right = x, bottom = y; right < board.length && bottom < board[x].length; right++, bottom++) {
            if (board[right][bottom] === token) {
                count++;
            } else {
                break;
            }
        }

        for (let left = x - 1, top = y - 1; left >= 0 && top >= 0; left--, top--) {
            if (board[left][top] === token) {
                count++;
            } else {
                break;
            }
        }

        //console.log("fall is " + count);
        return count >= winCondition;
    }

    return (
        <div className='connect4'>
            <Board board={board} updateBoard={updateBoard} />
        </div>
    );
}
