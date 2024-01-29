import React, { useState } from 'react';

function CharSelect({ onCharacterSelected }) {
  const [name, setName] = useState('');
  const [selectedClass, setSelectedClass] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && selectedClass) {
      onCharacterSelected({
        name,
        class: selectedClass,
        health: 100, // Initial values
        maxHealth: 100,
        level: 1,
        strength: 5,
        dexterity: 5,
        magic: 5,
      });
    }
  };

  return (
    <div className="char-select">
      <h2>Choose your character:</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Class:</label>
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            required
          >
            <option value="" disabled>
              Select...
            </option>
            <option value="Warrior">Warrior</option>
            <option value="Ranger">Ranger</option>
            <option value="Mage">Mage</option>
          </select>
        </div>
        <button type="submit">Create Character</button>
      </form>
    </div>
  );
}

export default CharSelect;