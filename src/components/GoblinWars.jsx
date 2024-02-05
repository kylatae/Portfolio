import React, { useState, useEffect } from 'react';
import '../css/GoblinWars.css'; // Your CSS file
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
      // Allow moving this piece
      const validMoves = [];
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          if (dr !== 0 || dc !== 0) { // Exclude staying in the same place
            const newRow = rowIndex + dr;
            const newCol = colIndex + dc;
            if (newRow >= 0 && newRow < 10 && newCol >= 0 && newCol < 10) {
              validMoves.push({ row: newRow, col: newCol });
            }
          }
        }
      }
      const chosenMove = // ... (get the selected move from the user)
  
      // Update board state based on chosenMove
      setBoard(prevBoard => {
        const newBoard = [...prevBoard];
        newBoard[chosenMove.row][chosenMove.col] = newBoard[rowIndex][colIndex];
        newBoard[rowIndex][colIndex] = null;
        return newBoard;
      });
      setIsLocked(true);
  
      setTimeout(() => {
        // AI's turn after a 3-second delay
        makeAIMove();
        setIsLocked(false);
        setCurrentPlayer('player'); // Back to player's turn
      }, 3000);
    }
  };

  function makeAIMove() {
    // const aiKingRow = ...;
    // const aiKingCol = ...;
  
    // Generate random valid move:
    const validMoves = []; // (same logic as in handlePieceClick)
    const randomMove = validMoves[Math.floor(Math.random() * validMoves.length)];
    setCurrentPlayer('AI'); // Switch to AI's turn
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
            <GoblinKing className={board[rowIndex][colIndex].owner} />
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


