import React from 'react';
import '../../css/GoblinWars2.css'; // Your CSS file

function GoblinKing(props) {
  return (
    <div className={`goblin-king ${props.owner}`}>GK</div> // Apply owner-based styling
  );
}

export default GoblinKing;