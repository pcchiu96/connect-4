import React from "react";
import uuidv4 from "uuid/v4";

export default function Board({ board, updateBoard }) {
    function generateColumns(board) {
        return board.map((row, index) => {
            return (
                <div className='column' key={uuidv4()} value={index}>
                    {generateHeight(board[index], index)}
                </div>
            );
        });
    }

    function generateHeight(column, index) {
        return column.map(token => {
            let color = "circle white";
            if (token === "O") {
                color = "circle green";
            } else if (token === "X") {
                color = "circle red";
            }
            return (
                <div className='square' key={uuidv4()}>
                    <button className={color} value={index} onClick={handleClick}></button>
                    <br />
                </div>
            );
        });
    }

    function handleClick(event) {
        updateBoard(event.target.value);
    }

    return (
        <div id={uuidv4()} className='board'>
            {generateColumns(board)}
        </div>
    );
}
