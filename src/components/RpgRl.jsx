import React, { useState, useEffect } from 'react';
import monsters from './Monsters2.jsx';
import CharSelect from './CharSelect.jsx';
import '../css/RpgRl.css';

function RpgRl() {
  const [character, setCharacter] = useState(loadCharacter());
  const [highScores, setHighScores] = useState(loadHighScores());
  const [outputText, setOutputText] = useState('');
  const [currentMonster, setCurrentMonster] = useState(null);
  const [battleLog, setBattleLog] = useState([]);
  const [areasCleared, setAreasCleared] = useState(2)

  
  useEffect(() => {
    localStorage.setItem('character', JSON.stringify(character));
  }, [character]);
 
  useEffect(() => {
    localStorage.setItem('RpgRlHS', JSON.stringify(highScores));
  }, [highScores]);

  function loadCharacter() {
    const savedCharacter = localStorage.getItem('character');
    return savedCharacter ? JSON.parse(savedCharacter) : null;
  }

  function loadHighScores() {
    const savedHighScores = localStorage.getItem('RpgRlHS');
    if (!savedHighScores)
      {
        return[{'name': 'You!', 'pClass': 'Warrior', 'pAreasCleared': 1}]
      }
    return savedHighScores ? JSON.parse(savedHighScores) : null;
  }

  function addHighScore(name, pClass, pAreasCleared) {
    console.log("Addscore")
    const newHighScores = [...highScores, { name, pClass, pAreasCleared }];
    console.log(newHighScores)
    newHighScores.sort((a, b) => b.pAreasCleared - a.pAreasCleared); // Sort descending
    newHighScores.splice(5); // Keep only top 5

    // Update either localStorage or state
        localStorage.setItem('RpgRlHS', JSON.stringify(newHighScores));
}

  const handleGoForward = () => {
    // Logic for moving to the next room/area
  };

  const handleSearchArea = () => {
    const randomValue = Math.random() * 100;

    if (randomValue < 40) {
      // Potion found
      setOutputText('You found a potion! What will you do?');
    } else if (randomValue < 60) {
      // Scroll found
      const scrollEffect = Math.random() * 4;
      if (scrollEffect < 1) {
        // Max health up
        // (implement max health increase logic)
        setOutputText('The scroll increases your max health!');
      } else if (scrollEffect < 2) {
        // Strength up
        // ...
      } else if (scrollEffect < 3) {
        // Dexterity up
        // ...
      } else {
        // Magic up
        // ...
      }
    } else if (randomValue < 70) {
      // Health fountain
      // (implement full health restore logic)
      setOutputText('The fountain restores your health!');
    } else if (randomValue < 95) {
      // Monster found
      // (start battle logic)
      setOutputText('Oh no, a monster appeared');
      startBattle();
    } else {
      // Powerup Gem
      // (implement stat increase logic)
      setOutputText('The gem increases your stats significantly!');
    }
    console.log(character.strength)
    console.log(character.dexterity)
    console.log(character.magic)
  };

  const handleDrinkPotion = () => {
    const potionEffect = Math.random() * 100;
    if (potionEffect < 40) {
      // Heal
      setOutputText('The potion heals you!');
    } else if (potionEffect < 60) {
      // Stats up
      setCharacter(prevCharacter => ({
        ...prevCharacter,
        strength: prevCharacter.strength + 1,
        dexterity: prevCharacter.dexterity + 1,
        magic: prevCharacter.magic + 1
      }));
      setOutputText('The potion increases your stats!');
    } else {
      // Poison
      setOutputText('The potion was poisonous!');
    }
  };

  const handleDiscardPotion = () => {
    setOutputText('You discarded the potion.');
  };

  const startBattle = () => {
    const randomMonsterIndex = Math.floor(Math.random() * monsters.length);
    setCurrentMonster({ ...monsters[randomMonsterIndex] }); // Deep copy monster
  };

  const handleBattleTurn = () => {
    if (!currentMonster) return; // Do nothing if not in combat

    const playerDamage = calculateDamage(character, currentMonster);
    const monsterDamage = calculateDamage(currentMonster, character);

    currentMonster.health -= playerDamage;
    if (currentMonster.health <= 0) {
      endBattle('win');
      return;
    }

    character.health -= monsterDamage;
    if (character.health <= 0) {
      endBattle('lose');
      return;
    }

    setBattleLog(prevLog => [
      ...prevLog, 
      `You dealt ${playerDamage} damage!`,
      `${currentMonster.name} dealt ${monsterDamage} damage!`
    ]);

    // Update character in local storage in case of a loss
    localStorage.setItem('character', JSON.stringify(character));
  };

  const calculateDamage = (attacker, defender) => {
    let statDiff = attacker.strength - defender.strength;
    if (attacker.class === 'Ranger') statDiff = attacker.dexterity - defender.dexterity;
    if (attacker.class === 'Mage') statDiff = attacker.magic - defender.magic;

    const damage = Math.max(1, statDiff * (Math.random() * 3 + 1)); // Randomness 1-4
    return Math.round(damage);
  };

  const endBattle = (outcome) => {
    setCurrentMonster(null);
    setBattleLog([]);

    if (outcome === 'lose') {
      setOutputText(`You have died! You cleared ${areasCleared} areas.`); // Areas cleared would need to be tracked separately
      addHighScore(character.name, character.class, areasCleared)
      localStorage.removeItem('character');
      // Add a "New Game" button here
    } else {
      setOutputText(`You defeated the ${currentMonster.name}!`); 
    }
  };

  useEffect(() => {
    if (currentMonster) {
      const intervalId = setInterval(handleBattleTurn, 3000);
      return () => clearInterval(intervalId);  // Cleanup
    }
  }, [currentMonster]);

  function HighScores() {
    return (
        <div>
            <h2>High Scores</h2>
            <table>
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Name</th>
                        <th>Class</th>
                        <th>Areas Cleared</th>
                    </tr>
                </thead>
                <tbody>
                    {highScores.map((score, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{score.name}</td>
                            <td>{score.pClass}</td>
                            <td>{score.pAreasCleared}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

  return (
    <div className="rpg-rl">
      {character ? (
        // Display game content if character is selected
        <div>
          <h2>Welcome, {character.name} ({character.class})</h2>
          <div className="char-sheet">
           <p>Health: {character.health}/{character.maxHealth}</p>
           <p>Level: {character.level}</p>
           <p>Strength: {character.strength}</p>
           <p>Dexterity: {character.dexterity}</p>
           <p>Magic: {character.magic}</p>
         </div>
        </div>
      ) : (
        // Display character selection if no character is loaded
        <CharSelect onCharacterSelected={setCharacter} />
      )}

      <div>
       <button onClick={handleGoForward}>Go Forward</button>
       <button onClick={handleSearchArea}>Search Area</button>
     </div>
     <div className="output-box">{outputText}</div> 
     {outputText.includes('What will you do?') && ( // Conditionally render choice buttons
        <div>
          <button onClick={handleDrinkPotion}>Drink</button>
          <button onClick={handleDiscardPotion}>Discard</button>
        </div>
      )}

  <HighScores />
    </div>
    
  );
}

export default RpgRl;