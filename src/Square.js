import React from "react";

export default function Square(index, token, updateBoard) {
    function handleClick(event) {
        updateBoard(event.target.value);
        console.log(event.target.value);
    }

    return (
        <>
            <button value={index} onClick={handleClick}>
                {token}
            </button>
            <br />
        </>
    );
}
