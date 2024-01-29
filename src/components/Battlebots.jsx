import React, { useState, useEffect } from 'react';
import '../css/Battlebots2.css'

function BotBattle() {
  const [selectedBot1, setSelectedBot1] = useState(null);
  const [selectedBot2, setSelectedBot2] = useState(null);
  const [battleStarted, setBattleStarted] = useState(false);
  const [battleLog, setBattleLog] = useState([]);
  const [winner, setWinner] = useState(null);

  const handleBotSelect = (botId) => {
    if (!selectedBot1) {
      setSelectedBot1(botId);
    } else if (!selectedBot2) {
      setSelectedBot2(botId);
    } 
  };

  const handleBotRemove = (slot) => {
    if (slot === 1) {
      setSelectedBot1(null);
    } else if (slot === 2) {
      setSelectedBot2(null);
    }
  };

  const startBattle = () => {
    setBattleStarted(true);
    setBattleLog([]); // Clear log on new battle
    setWinner(null);

    // Create copies of bots to avoid modifying originals
    const bot1Copy = { 
      ...bots.find((b) => b.id === selectedBot1),
      maxHealth: bots.find((b) => b.id === selectedBot1).health // Add maxHealth
    };
    const bot2Copy = { 
      ...bots.find((b) => b.id === selectedBot2),
      maxHealth: bots.find((b) => b.id === selectedBot2).health // Add maxHealth
    };

    // Start the battle loop
    const battleInterval = setInterval(() => {
      // Decide actions for each bot
      takeAction(bot1Copy, bot2Copy); 
      if (bot2Copy.isDead) {
        setWinner(bot1Copy);
        clearInterval(battleInterval);
        return;
      }
      takeAction(bot2Copy, bot1Copy);
      if (bot1Copy.isDead) {
        setWinner(bot2Copy);
        clearInterval(battleInterval);
        return;
      } 
    }, 3000); 
  };

  const takeAction = (bot, bot2) => {
    
    const shouldHeal = Math.random() * 100 > (bot.health / bot.maxHealth) * 100; 

    if (shouldHeal) {
      const healAmount = Math.round(0.3 * bot.maxHealth);
      bot.health = Math.min(bot.health + healAmount, bot.maxHealth);
      setBattleLog((prevLog) => [
        ...prevLog,
        `${bot.name} chose to heal for ${healAmount} HP! (${bot.health}/${bot.maxHealth})`,
      ]);
    } else {
      attack(bot, bot2); 
    }
  };

  const attack = (attacker, defender) => {
    let damage = Math.max(1, Math.round(attacker.attack - (defender.armor / 100) * attacker.attack)); // Ensure at least 1 damage
    defender.health -= damage;
    if (defender.health <= 0) {
      defender.health = 0;
      defender.isDead = true;
    }

    setBattleLog((prevLog) => [
      ...prevLog,
      `${attacker.name} attacks ${defender.name} for ${damage} damage! (${defender.health}/${defender.maxHealth})`,
    ]);
  };

  const resetFight = () => {
    setBattleStarted(false);
    setBattleLog([]);
    setWinner(null);
    setSelectedBot1(null);
    setSelectedBot2(null);
  };


  const bots = [
    {
      id: 1,
      name: "Mech Warrior",
      health: 100,
      armor: 50,
      attack: 20,
      isDead: false,
      equipment: [null, null], // Two equipment slots
    },
    {
      id: 2,
      name: "Cyber Ninja",
      health: 80,
      armor: 30,
      attack: 30,
      isDead: false,
      equipment: [null, null],
    },
    {
      id: 3,
      name: "Technomancer",
      health: 70,
      armor: 20,
      attack: 25,
      isDead: false,
      equipment: [null, null],
    },
    {
      id: 4,
      name: "Stealth Assassin",
      health: 60,
      armor: 10,
      attack: 40,
      isDead: false,
      equipment: [null, null],
    },
    {
      id: 5,
      name: "Biohazard",
      health: 90,
      armor: 40,
      attack: 15,
      isDead: false,
      equipment: [null, null],
    },
  ];

  return (
    <div className="bot-battle-container">
      <h2>Select Your Bots</h2>
      <div className="bot-selection">
        {bots.map((bot) => (
          <button
            key={bot.id}
            className="bot-button"
            onClick={() => handleBotSelect(bot.id, 1)}
          >
            {bot.name}
          </button>
        ))}
      </div>

      {/* ... Bot Selection for Bot 2 (similar structure) */}

      <div className="battle-status">
        <p>Bot 1: {selectedBot1 ? bots.find((b) => b.id === selectedBot1).name : 'None'}</p>
        <p>Bot 2: {selectedBot2 ? bots.find((b) => b.id === selectedBot2).name : 'None'}</p>
        {selectedBot1 && (
          <button onClick={() => handleBotRemove(1)}>Remove Bot 1</button>
        )}
        {selectedBot2 && (
          <button onClick={() => handleBotRemove(2)}>Remove Bot 2</button>
        )}
      </div>


      {battleStarted && (
        <div className="battle-log">
          {battleLog.map((entry, index) => (
            <p key={index}>{entry}</p>
          ))}
          {winner && <p>{winner.name} wins!</p>}
          <button onClick={resetFight}>Reset Fight</button>
        </div>
      )}

      {!battleStarted && selectedBot1 && selectedBot2 && (
        <button className="start-battle-button" onClick={startBattle}>
          Start Battle
        </button>
      )}
    </div>
  );
}

export default BotBattle;