import React, { useState, useEffect } from "react";
import Board from "./Board.js";
import "./App.css";

export default function App() {
    const x = 7;
    const y = 6;
    const size = x * y - 1;
    const empty = "";
    const player1 = "O";
    const player2 = "X";
    const winCondition = 4;

    const arr = Array(x)
        .fill(empty)
        .map(() => Array(y).fill(empty));

    const [board, setBoard] = useState(arr);
    const [turn, setTurn] = useState(false); //a toggle that cycles between p1 and p2
    const [gameOn, setGame] = useState(true); //mainly to determine game ends before a winner
    const [counter, setCounter] = useState(1); //for terminate game when out of spaces
    const [message, setMessage] = useState("");
    const [history, setHistory] = useState([arr]);

    useEffect(() => {
        setTurn(!turn);
        console.log(history);
    }, [board]);

    function updateBoard(x) {
        if (!gameOn) return;
        if (board[x][0] !== empty) return setMessage("Column full, pick another column");

        let newBoard = board.map((columns) => columns.map((row) => row)); //make a brand new board to make changes to
        let token = turn ? player1 : player2;
        let player = turn ? "Player 1" : "Player 2";

        //check token from bottom up
        let y = newBoard[x].length - 1;
        for (; y >= 0; y--) {
            if (newBoard[x][y] === empty) {
                newBoard[x][y] = token;
                break;
            }
        }

        setBoard(newBoard);
        setCounter((prevCounter) => prevCounter + 1);
        setHistory((prevBoards) => {
            // return [...prevBoards, newBoard];
            return prevBoards.concat([newBoard]);
        });

        if (checkVertical(x, y, token, newBoard) || checkHorizontal(x, y, token, newBoard) || checkRise(x, y, token, newBoard) || checkFall(x, y, token, newBoard)) {
            setGame(false);
            setMessage(`Game over! ${player} Won!`);
        } else if (counter === size) {
            setGame(false);
            setMessage("Game over! Draw!");
        }
    }

    function checkVertical(x, y, token, board) {
        let count = 0;

        for (; y < board[x].length; y++) {
            if (board[x][y] === token) {
                count++;
            } else {
                break;
            }
        }
        // console.log("vertical is " + count);
        return count >= winCondition;
    }

    function checkHorizontal(x, y, token, board) {
        let count = 0;

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

        // console.log("horizontal is " + count);
        return count >= winCondition;
    }

    function checkRise(x, y, token, board) {
        let count = 0;

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

        // console.log("rise is " + count);
        return count >= winCondition;
    }

    function checkFall(x, y, token, board) {
        let count = 0;

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

        // console.log("fall is " + count);
        return count >= winCondition;
    }

    function undoBoard() {
        if (counter === 1) return;
        setBoard(history[history.length - 2]);
        setCounter((prevCounter) => prevCounter - 1);
        setMessage("Undo 1 turn");
        setHistory((prevHistory) => {
            return prevHistory.slice(0, prevHistory.length - 1);
        });
    }

    function resetBoard() {
        setBoard(arr);
        setTurn(false);
        setGame(true);
        setCounter(1);
        setMessage("");
        setHistory([arr]);
    }

    return (
        <div className='connect4'>
            <a className='back' href='https://pcchiu96.github.io/portfolio'>
                <i className='fa fa-arrow-circle-left' aria-hidden='true'></i>
            </a>
            <header className='yellow'>
                Connect <span className='red'>4</span>
            </header>
            <Board board={board} updateBoard={updateBoard} />
            <button className='b-restart' onClick={resetBoard}>
                Restart
            </button>
            <button className='b-undo' onClick={undoBoard}>
                Undo
            </button>
            <p className={turn ? "message yellow" : "message red"}>{turn ? "P1" : "P2"}</p>
            <p className='message'>Turn {counter}</p>
            <p className='message'>{message}</p>
        </div>
    );
}
