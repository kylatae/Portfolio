import React, { useState } from 'react';
import '../css/Tictactoe.css';

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

function Board({ gameIndex, squares, onClick }) {

  function renderSquare(i) {
    return (
      <Square
        value={squares[i]}
        onClick={() => onClick(gameIndex, i)}
      />
    );
  }


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
  const [gameStates, setGameStates] = useState([
    {
      squares: Array(9).fill(null),
      xIsNext: true
    },
    {
      squares: Array(9).fill(null),
      xIsNext: true
    },
    {
      squares: Array(9).fill(null),
      xIsNext: true
    },
    {
      squares: Array(9).fill(null),
      xIsNext: true
    },
    {
      squares: Array(9).fill(null),
      xIsNext: true
    },
    {
      squares: Array(9).fill(null),
      xIsNext: true
    },
    {
      squares: Array(9).fill(null),
      xIsNext: true
    },
    {
      squares: Array(9).fill(null),
      xIsNext: true
    },
    {
      squares: Array(9).fill(null),
      xIsNext: true
    }
  ]);
  const [activeBoardIndex, setActiveBoardIndex] = useState(5); // Keep track of the active board
  const [xIsNext, setXIsNext] = useState(true); // Overall X's turn or O's turn
  const [stepNumber, setStepNumber] = useState(0);

  const handleSquareClick = (gameIndex, squareIndex) => {
    // If game over or not the active board, do nothing
    if (calculateWinner(gameStates[gameIndex].squares) ) {
      return;
    }

    const nextGameStates = [...gameStates]
    const currentGame = nextGameStates[gameIndex];

    currentGame.squares[squareIndex] = xIsNext ? 'X' : 'O';
    currentGame.xIsNext = !xIsNext;

    nextGameStates[gameIndex] = currentGame
    // Set the next active board based on the square clicked
    setActiveBoardIndex(squareIndex);
    setGameStates(nextGameStates);
    setXIsNext(!xIsNext);
    
  };



  const renderBoard = (gameIndex) => {  
    return (    
    <Board      
      gameIndex = {gameIndex}
      squares={gameStates[gameIndex].squares}      
      onClick={(i) =>  handleSquareClick(gameIndex, i)}    
      />  
      );
    }

  const winner = gameStates.some(game => calculateWinner(game.squares)) ?
                calculateWinner(gameStates.find(game => calculateWinner(game.squares)).squares) :
                null;
  const status = winner ?
                 'Winner: ' + winner :
                 'Next player: ' + (xIsNext ? 'X' : 'O');

  return (
    <div className="game">
      <div className="game-info">
        <div className="status">{status}</div>
      </div>
      <div className="game-boards">
        {/* Render 9 boards in a 3x3 grid */}
        <div className="board-row">
          {renderBoard(0)}
          {renderBoard(1)}
          {renderBoard(2)}
        </div>
        <div className="board-row">
          {renderBoard(3)}
          {renderBoard(4)}
          {renderBoard(5)}
        </div>
        <div className="board-row">
          {renderBoard(6)}
          {renderBoard(7)}
          {renderBoard(8)}
        </div>
      </div>
    </div>
  );
}

// Helper function to calculate the winner
function calculateWinner(squares) {
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