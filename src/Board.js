import React from "react";

export default function Board({ board, updateBoard }) {
    function generateColumns(board) {
        return board.map((column, columnIndex) => {
            return (
                <div className='column' key={columnIndex} onClick={() => handleClick(columnIndex)}>
                    {generateHeight(column, columnIndex)}
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
