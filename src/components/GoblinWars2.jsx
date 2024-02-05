import React, { useState, useEffect } from 'react';
import '../css/GoblinWars2.css'; // Your CSS file
import GoblinKing from './GoblinPieces/GoblinKing2';

function GoblinWars() {
  // State for your game logic (board, players, resources, etc.)
  const [board, setBoard] = useState(createInitialBoard()); 
  const [currentPlayer, setCurrentPlayer] = useState('player');
  const [isLocked, setIsLocked] = useState(false);

  // Create the initial 10x10 board
  function createInitialBoard() {
    const newBoard = [];
    for (let row = 0; row < 10; row++) {
      newBoard.push(new Array(10).fill(null)); // Fill with empty cells
    }
    newBoard[0][4] = { type: 'GoblinKing', owner: 'AI', stats: { attack: 100, resource: 0, health: 1 } };    
    newBoard[9][4] = { type: 'GoblinKing', owner: 'player', stats: { attack: 100, resource: 0, health: 1 } };    
    return newBoard;  
  }

  const handlePieceClick = (rowIndex, colIndex) => {
    if (isLocked) return; // Don't allow moves when locked
  
    const piece = board[rowIndex][colIndex];
    if (piece && piece.owner === currentPlayer) {
      const possibleMoves = getValidMoves(rowIndex, colIndex);
      // Allow moving this piece
      // ... implement movement logic here (update board state)
      setIsLocked(true);
  
      setTimeout(() => {
        // AI's turn after a 3-second delay
        makeAIMove();
        setIsLocked(false);
        setCurrentPlayer('player'); // Back to player's turn
      }, 3000);
    }
  };

  function getValidMoves(rowIndex, colIndex) {
    const validMoves = [];
    const deltas = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
  
    for (const [deltaRow, deltaCol] of deltas) {
      const newRow = rowIndex + deltaRow;
      const newCol = colIndex + deltaCol;
  
      if (isValidPosition(newRow, newCol)) {
        validMoves.push([newRow, newCol]);
      }
    }

    function isValidPosition(row, col) {
      return row >= 0 && row < 10 && col >= 0 && col < 10; // Within bounds
    }
  
    return validMoves;
  }

  function makeAIMove() {
    // Find AI's Goblin King
    let aiKingPos = null;
    for (let row = 0; row < 10; row++) {
      for (let col = 0; col < 10; col++) {
        if (board[row][col] && board[row][col].owner === 'AI') {
          aiKingPos = [row, col];
          break;
        }
      }
    }
  
    if (aiKingPos) {
      const validMoves = getValidMoves(aiKingPos[0], aiKingPos[1]);
      if (validMoves.length > 0) {
        const randomMove = validMoves[Math.floor(Math.random() * validMoves.length)];
  
        // Update board state to move the AI King
      }
    }
    // ... (Rest of makeAIMove)
  }
  
  // Render the game board
  const renderBoard = () => {
    return board.map((row, rowIndex) => (
      <div className="board-row" key={rowIndex}>
        {row.map((cell, colIndex) => (
          <div
          className="board-cell"
          key={`${rowIndex}-${colIndex}`}
          onClick={() => handlePieceClick(rowIndex, colIndex)}
        >
          {board[rowIndex][colIndex] && (
            <GoblinKing owner={board[rowIndex][colIndex].owner} />
          )}
        </div>
        ))}
      </div>
    ));
  };

  return (
    <div className="game-container">
      <div className="stats-board">
        {/* Player stats, resource counts, etc. */}
      </div>
      <div className="game-board">
        {renderBoard()}
      </div>
    </div>
  );
}

export default GoblinWars;


