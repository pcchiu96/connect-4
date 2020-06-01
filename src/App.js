import React, { useState, useEffect } from "react";
import Board from "./Board.js";
import "./App.css";

export default function App() {
    const x = 7;
    const y = 6;
    const size = x * y;
    const empty = "";
    const player1 = "O";
    const player2 = "X";
    const winCondition = 4;

    const arr = Array(x)
        .fill(empty)
        .map(() => Array(y).fill(empty));

    const [board, setBoard] = useState(arr);
    const [turn, setTurn] = useState(true);
    const [game, setGame] = useState(true);
    const [counter, setCounter] = useState(1);
    const [message, setMessage] = useState("");

    useEffect(() => {
        //setBoard(board);
    }, [board]);

    function updateBoard(x) {
        if (!game) return;

        if (board[x][0] !== empty) {
            setMessage("Column full, pick another column");
            console.log("Column full, pick another column");
        } else {
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
            setCounter(counter + 1);
            setMessage("Turn " + counter);
            console.log("Token: " + counter);

            if (checkVertical(x, y) || checkHorizontal(x, y) || checkRise(x, y) || checkFall(x, y)) {
                setGame(false);
                let winner = turn ? "Player1" : "Player2";
                setMessage("Game over! " + winner + " Won!");
                console.log("Connect 4!");

                //TODO make connected 4 tokens glow
            }

            if (counter === size) {
                setGame(false);
                setMessage("Game over! Draw!");
                console.log("Game over");
            }
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
        //console.log("vertical is " + count);
        return count >= 4;
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

        //console.log("horizontal is " + count);
        return count >= winCondition;
    }

    function checkRise(x, y) {
        let count = 0;
        let token = turn ? player1 : player2;

        for (let right = x, top = y; right < board.length && top >= 0; right++, top--) {
            if (board[right][top] === token) {
                count++;
            } else {
                break;
            }
        }

        for (let left = x - 1, bottom = y + 1; left >= 0 && bottom < board[x].length; left--, bottom++) {
            if (board[left][bottom] === token) {
                count++;
            } else {
                break;
            }
        }

        //console.log("rise is " + count);
        return count >= winCondition;
    }

    function checkFall(x, y) {
        let count = 0;
        let token = turn ? player1 : player2;

        for (let right = x, bottom = y; right < board.length && bottom < board[x].length; right++, bottom++) {
            if (board[right][bottom] === token) {
                count++;
            } else {
                break;
            }
        }

        for (let left = x - 1, top = y - 1; left >= 0 && top >= 0; left--, top--) {
            if (board[left][top] === token) {
                count++;
            } else {
                break;
            }
        }

        //console.log("fall is " + count);
        return count >= winCondition;
    }

    function resetBoard() {
        setBoard(arr);
        setGame(true);
        setCounter(1);
        setMessage("");
    }

    return (
        <div className='connect4'>
            <header>Connect 4</header>
            <Board board={board} updateBoard={updateBoard} />
            <button onClick={resetBoard}>Restart</button>
            <p>{message}</p>
        </div>
    );
}
