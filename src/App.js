import React, { useState } from "react";
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
    const [turn, setTurn] = useState(true); //a toggle that cycles between p1 and p2
    const [gameOn, setGame] = useState(true); //mainly to determine game ends before a winner
    const [counter, setCounter] = useState(1); //for terminate game when out of spaces
    const [message, setMessage] = useState("");
    const [history, setHistory] = useState([arr]);
    const [color, setColor] = useState("message");

    const updateBoard = (x) => {
        if (!gameOn) return;
        if (board[x][0] !== empty) return setMessage("Column full, pick another column");

        let newBoard = board.map((columns) => columns.map((row) => row)); //make a brand new board to make changes to
        let token = turn ? player1 : player2;
        let player = turn ? "Player 1" : "Player 2";
        let classColor = turn ? "message yellow" : "message red";

        //check token from bottom up
        let y = newBoard[x].length - 1;
        for (; y >= 0; y--) {
            if (newBoard[x][y] === empty) {
                newBoard[x][y] = token;
                break;
            }
        }

        setBoard(newBoard);
        setTurn(!turn);
        setCounter((prevCounter) => prevCounter + 1);
        setMessage("");
        setHistory((prevBoards) => {
            return prevBoards.concat([newBoard]);
        });
        setColor("message");

        //get all direction counts
        let horizontal = getHorizontalCount(x, y, token, newBoard);
        let vertical = getVerticalCount(x, y, token, newBoard);
        let rise = getRiseCount(x, y, token, newBoard);
        let fall = getFallCount(x, y, token, newBoard);

        //the game only ends if either player win or no more spaces left
        if (horizontal >= winCondition || vertical >= winCondition || rise >= winCondition || fall >= winCondition) {
            setGame(false);
            setMessage(`Game over! ${player} Won!`);
            setColor(classColor);
        } else if (counter - 1 === size) {
            setGame(false);
            setMessage("Game over! Draw!");
        }
    };

    function getHorizontalCount(x, y, token, board) {
        let count = 0;

        //count right side
        for (let right = x; right < board.length; right++) {
            if (board[right][y] === token) {
                count++;
            } else {
                break;
            }
        }

        //count left side
        for (let left = x - 1; left >= 0; left--) {
            if (board[left][y] === token) {
                count++;
            } else {
                break;
            }
        }
        return count;
    }

    function getVerticalCount(x, y, token, board) {
        let count = 0;

        //count downwards
        for (; y < board[x].length; y++) {
            if (board[x][y] === token) {
                count++;
            } else {
                break;
            }
        }

        return count;
    }

    function getRiseCount(x, y, token, board) {
        let count = 0;

        //count top right
        for (let right = x, top = y; right < board.length && top >= 0; right++, top--) {
            if (board[right][top] === token) {
                count++;
            } else {
                break;
            }
        }

        //count bottom left
        for (let left = x - 1, bottom = y + 1; left >= 0 && bottom < board[x].length; left--, bottom++) {
            if (board[left][bottom] === token) {
                count++;
            } else {
                break;
            }
        }

        return count;
    }

    function getFallCount(x, y, token, board) {
        let count = 0;

        //count bottom right
        for (let right = x, bottom = y; right < board.length && bottom < board[x].length; right++, bottom++) {
            if (board[right][bottom] === token) {
                count++;
            } else {
                break;
            }
        }

        //count top left
        for (let left = x - 1, top = y - 1; left >= 0 && top >= 0; left--, top--) {
            if (board[left][top] === token) {
                count++;
            } else {
                break;
            }
        }

        return count;
    }

    const undoBoard = () => {
        if (counter === 1) return;
        setBoard(history[history.length - 2]);
        setTurn(!turn);
        setGame(true);
        setCounter((prevCounter) => prevCounter - 1);
        setMessage("");
        setHistory((prevHistory) => {
            return prevHistory.slice(0, prevHistory.length - 1);
        });
        setColor("message");
    };

    const resetBoard = () => {
        setBoard(arr);
        setTurn(true);
        setGame(true);
        setCounter(1);
        setMessage("");
        setHistory([arr]);
        setColor("message");
    };

    return (
        <div className='connect4'>
            <header className='yellow'>
                <a className='back' href='https://pcchiu96.github.io/portfolio'>
                    <i className='fa fa-arrow-circle-left' aria-hidden='true'></i>
                </a>
                <div>
                    Connect <span className='red'>4</span>
                </div>
            </header>
            <Board board={board} updateBoard={updateBoard} />
            <br></br>
            <button className='b-restart' onClick={resetBoard}>
                Restart
            </button>
            <button className='b-undo' onClick={undoBoard}>
                Undo
            </button>
            <p className='turn-indicator'>
                <span className={turn ? "message yellow" : "message"}>P1</span>
                <span className={turn ? "message" : "message red"}>P2</span>
            </p>
            <p className={color}>{message}</p>
        </div>
    );
}
