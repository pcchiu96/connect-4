import React, { useState, useRef, useEffect } from "react";
import Board from "./Board.js";
import "./App.css";

export default function App() {
    const [state, setState] = useState();
    const x = 7,
        y = 6;
    const board = Array(x).fill(Array(y).fill(0)); //[x][y]

    function handleClick(i) {
        console.log(i);
    }

    return (
        <div className='board'>
            <Board board={board} />
        </div>
    );
}
