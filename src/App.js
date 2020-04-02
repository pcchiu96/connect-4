import React, { useState, useRef, useEffect } from "react";
import Board from "./Board.js";
import "./App.css";

export default function App() {
    const x = 7;
    const y = 6;
    const empty = "";
    const player1 = "X";
    const player2 = "O";

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

        if (checkVertical(x, y) >= 4 || checkHorizontal(x, y) >= 4) {
            console.log("Connect 4!");
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
        console.log("down is " + count);

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
        console.log("left and right is " + count);

        return count;
    }

    return (
        <div className='connect4'>
            <Board board={board} updateBoard={updateBoard} />
        </div>
    );
}
