import React, { useState } from 'react';
import '../css/tictactoe.css'; // Import your CSS file

function Square(props) {
  // Button component to represent a tic-tac-toe square.
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

function Board({ squares, onClick }) {
  // Renders the 3x3 board of squares.
  console.log(onClick)
  const renderSquare = (i) => {
    return (
      <Square
        value={squares[i]}
        onClick={() => onClick(i)}
      />
    );
  };

  return (
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
}




function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [xIsNext, setXIsNext] = useState(true);
  const [stepNumber, setStepNumber] = useState(0);

  const handleClick = (i) => {
    const newHistory = history.slice(0, stepNumber + 1); // Preserves history up to current move
    const currentSquares = newHistory[newHistory.length - 1];
    const squares = currentSquares.slice();

    if (squares[i] || calculateWinner(squares)) {
      return; // Ignore click if square is filled or there's a winner
    }
    squares[i] = xIsNext ? 'X' : 'O';
    setHistory(newHistory.concat([squares]));
    setStepNumber(newHistory.length);
    setXIsNext(!xIsNext);
  };

  const currentSquares = history[stepNumber];
  const winner = calculateWinner(currentSquares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board 
          squares={currentSquares} 
          onClick={(i) => handleClick(i)} 
        />
      </div>
      <div className="game-info">
        <div>{status}</div>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  // Helper to determine the winner.
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default Game;