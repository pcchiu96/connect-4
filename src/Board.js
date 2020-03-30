import React from "react";
import Square from "./Square";

export default function Board({ board, updateBoard }) {
    function generateColumns(board) {
        return board.map((row, index) => {
            return (
                <div className='column' value={index}>
                    {generateHeight(board[index], index)}
                </div>
            );
        });
    }

    function generateHeight(board, j) {
        return board.map((column, index) => {
            return (
                <>
                    <button value={j} onClick={handleClick}>
                        {column}
                    </button>
                    <br />
                </>
            );
        });
    }

    function handleClick(event) {
        updateBoard(event.target.value);
        console.log(event.target.value);
    }

    return <div className='board'>{generateColumns(board)}</div>;
}
