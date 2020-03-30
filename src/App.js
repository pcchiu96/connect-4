import React, { useState, useRef, useEffect } from "react";
import Board from "./Board.js";
import "./App.css";

export default function App() {
    const x = 7,
        y = 6;
    const b = Array(x)
        .fill(0)
        .map(() => Array(y).fill(0));
    const [board, setBoard] = useState([]);

    useEffect(() => {
        setBoard(b);
    }, []);

    let turn = "X";

    function updateBoard(i) {
        let newBoard = [...board];
        for (let j = newBoard[i].length - 1; j >= 0; j--) {
            if (newBoard[i][j] === 0) {
                newBoard[i][j] = turn;
                break;
            }
        }
        setBoard(newBoard);
        //console.log(board);
    }

    return (
        <div className='board'>
            <Board board={board} updateBoard={updateBoard} />
        </div>
    );
}
