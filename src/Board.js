import React from "react";
import Square from "./Square";

export default function Board({ board }) {
    function generateColumns(board) {
        return board.map((row, index) => {
            return (
                <div className='column' value={index}>
                    {generateRows(board[index])}
                </div>
            );
        });
    }

    function generateRows(board) {
        return board.map((column, index) => {
            return (
                <>
                    <button value={index} onClick={() => columnClick(index)}>
                        {column}
                    </button>
                    <br />
                </>
            );
        });
    }

    function columnClick(j) {
        console.log(j);
    }

    return <div className='board'>{generateColumns(board)}</div>;
}
