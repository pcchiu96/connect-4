import React from "react";

export default function Board({ board, updateBoard }) {
    function generateColumns(board) {
        return board.map((row, index) => {
            return (
                <div className='column' key={index} onClick={() => handleClick(index)}>
                    {generateHeight(board[index], index)}
                </div>
            );
        });
    }

    function generateHeight(column, columnIndex) {
        return column.map((token, rowIndex) => {
            let color = "circle";
            if (token === "O") {
                color = "circle yellow";
            } else if (token === "X") {
                color = "circle red";
            }
            return (
                <button key={columnIndex + "" + rowIndex} className={color}>
                    {/* {columnIndex + "" + rowIndex} */}
                </button>
            );
        });
    }

    function handleClick(index) {
        updateBoard(index);
    }

    return <div className='board'>{generateColumns(board)}</div>;
}
