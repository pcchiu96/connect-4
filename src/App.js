import React, { useState, useRef, useEffect } from "react";
import Board from "./Board.js";
import "./App.css";

export default function App() {
    const x = 7;
    const y = 6;
    const arr = Array(x)
        .fill("O")
        .map(() => Array(y).fill("O"));

    const empty = "O";

    const [board, setBoard] = useState([]);

    useEffect(() => {
        setBoard(arr);
    }, []);

    let turn = "X";

    function updateBoard(i) {
        let newBoard = [...board];
        for (let j = newBoard[i].length - 1; j >= 0; j--) {
            if (newBoard[i][j] === empty) {
                newBoard[i][j] = turn;
                break;
            }
        }
        setBoard(newBoard);
        //console.log(board);
    }

    return (
        <div className='connect4'>
            <Board board={board} updateBoard={updateBoard} />
        </div>
    );
}
