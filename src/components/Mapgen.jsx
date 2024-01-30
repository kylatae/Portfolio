import React, { useState, useEffect } from 'react';
import Tile from './Tile';
import '../css/Mapgen.css'; 

function MapGrid() {
  const [gridSize, setGridSize] = useState({ rows: 50, cols: 50 });
  const [weights, setWeights] = useState({ plains: 30, forest: 50, water: 20 });
  const [gridData, setGridData] = useState([]);


  function checkAndAdjustTile(grid, row, col, type) {
    if (type !== 'water') return; // Only process water tiles
  
    const visited = new Set(); // Keep track of visited tiles
    const queue = [[row, col]]; // Start the flood fill
  
    while (queue.length > 0) {
      const [currentRow, currentCol] = queue.shift();
      const key = `${currentRow}-${currentCol}`;
  
      if (visited.has(key)) continue; // Skip already visited tiles
      visited.add(key);
  
      // Check valid neighbors for water (in four directions)
      const neighbors = [
        [currentRow - 1, currentCol], // Up
        [currentRow + 1, currentCol], // Down
        [currentRow, currentCol - 1], // Left
        [currentRow, currentCol + 1]  // Right
      ];
  
      for (const [newRow, newCol] of neighbors) {
        if (newRow >= 0 && newRow < grid.length &&
            newCol >= 0 && newCol < grid[0].length &&
            grid[newRow][newCol] === 'water') {
          queue.push([newRow, newCol]); 
        }
      }
    }
  
    // After flood fill, check if all water was connected
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[0].length; j++) {
        if (grid[i][j] === 'water' && !visited.has(`${i}-${j}`)) {
          // Isolated water found - adjust (e.g., convert to plains)
          grid[i][j] = 'plains'; 
        }
      }
    }
  }
  

  const generateMap = () => {
    const gridData = [];
    const terrainTypes = ['plains', 'forest', 'water'];
    const totalWeight = Object.values(weights).reduce((sum, w) => sum + w, 0);  
  
    for (let row = 0; row < gridSize.rows; row++) {
      gridData.push([]); // Create a new row
      for (let col = 0; col < gridSize.cols; col++) {
        const randomValue = Math.random() * totalWeight;
        let terrainType = determineTerrain(randomValue, weights);
  
        // Simple clumping logic
        terrainType = adjustForClumping(gridData, row, col, terrainType);
  
        gridData[row].push(terrainType);
      }
    }
    for (let i = 0; i < gridSize.rows; i++) {
      for (let j = 0; j < gridSize.cols; j++) {
        checkAndAdjustTile(gridData, i, j, gridData[i][j]);
      }
    }
    setGridData(gridData);
  };
  
  function determineTerrain(randomValue, weights) {
    let cumulativeWeight = 0;
    for (const terrain in weights) {
      cumulativeWeight += weights[terrain]; 
      if (randomValue <= cumulativeWeight) {
        return terrain;
      }
    }
  }
  
  function adjustForClumping(gridData, row, col, currentTerrain) {
    const neighborBias = .9; // Adjust this for stronger/weaker clumping

    if (row > 0 && gridData[row - 1][col] === currentTerrain) {
      if (Math.random() < neighborBias) return currentTerrain;
    }
    // ... similar check for the tile to the left
  
    // No neighbors match, return the original terrain 
    return currentTerrain;  }

  useEffect(() => {
    generateMap();
  }, [gridSize, weights]);


  function identifyClusters(grid, visited) {
    const clusters = [];
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[0].length; j++) {
        if (grid[i][j] === 'water' && !visited.has(`${i}-${j}`)) {
          const cluster = [];
          findWaterCluster(grid, visited, i, j, cluster);
          clusters.push(cluster);
        }
      }
    }
    return clusters;
  }
  
  function findWaterCluster(grid, visited, row, col, cluster) {
    const key = `${row}-${col}`;
    if (visited.has(key) || grid[row][col] !== 'water') return;
    visited.add(key);
    cluster.push([row, col]);
  
    const neighbors = [
      [row - 1, col],
      [row + 1, col],
      [row, col - 1],
      [row, col + 1]
    ];
    for (const [newRow, newCol] of neighbors) {
      findWaterCluster(grid, visited, newRow, newCol, cluster);
    }
  }

  function attemptToConnectCluster(grid, cluster) {
    // Find the closest non-water tile to the cluster
    let closestTile = null;
    let minDistance = Infinity;
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[0].length; j++) {
        if (grid[i][j] !== 'water') {
          const distance = calculateManhattanDistance(cluster, [i, j]);
          if (distance < minDistance) {
            minDistance = distance;
            closestTile = [i, j];
          }
        }
      }
    }
  
    // Attempt to create a water "bridge" towards the closest tile
    // ... (Implementation details will depend on your specific strategy) ...
  }
  
  // Helper function (replace with your distance calculation logic)
  function calculateManhattanDistance(cluster, tile) {
    // ...
  }
  


  return (
    <div className="map-container">
      {gridData.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((tileType, colIndex) => (
            <Tile key={colIndex} type={tileType} />
          ))}
        </div>
      ))}
    </div>
  );
}

export default MapGrid;