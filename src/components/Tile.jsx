import React from 'react';
import '../css/Mapgen.css'; 

function Tile({ type }) {
  const tileColors = {
    plains: '#FFD700', // Golden yellow
    water: '#0000FF', // Blue
    forest: '#006400', // Dark green
  };

  const tileStyle = {
    backgroundColor: tileColors[type] || 'gray', // Default to gray if type is unknown
    width: '20px',
    height: '20px',
    border: '1px solid black',
  };

  return <div className="tile" style={tileStyle} />;
}

export default Tile;