import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import '../css/Pagecat.css'

function Pagecat() {

  const initialCatStats = {
    name: '',
    coins: 0,
    hunger: 80,
    thirst: 80,
    litterbox: 100,
    sleep: 90,
    affection: 50,
    adoptionDate: null,
  };

  const [catStats, setCatStats] = useState(
  () => JSON.parse(localStorage.getItem('catStats')) || initialCatStats);
  const [catName, setCatName] = useState(catStats.name || '');
  const [lastSavedTimestamp, setLastSavedTimestamp] = useState(
    () => JSON.parse(localStorage.getItem('lastSavedTimestamp')) || null
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const now = dayjs()
      localStorage.setItem('lastSavedTimestamp', JSON.stringify(now.valueOf()));
      setCatStats((prevStats) => ({
        ...prevStats,
        sleep: Math.max(prevStats.sleep - 1, 0),
      }));
    }, 60000); // Update sleep every 60 seconds
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    localStorage.setItem('catStats', JSON.stringify(catStats));
  }, [catStats]);

  const handleNameChange = (event) => {
    const newValue = event.target.value.replace(/[^a-zA-Z0-9]/g, '').slice(0, 15);
    setCatName(newValue
    );
  };

  const handleNameSubmit = (event) => {
    event.preventDefault();
    if (catName.length >= 3) {
      setCatStats({
        ...catStats,
        adoptionDate: dayjs().valueOf(),
        name: catName,
      });
    }
  };

  useEffect(() => {
    const now = dayjs();
    if (lastSavedTimestamp) {
      const timeDiff = now.diff(lastSavedTimestamp, 'minutes');
      const hungerDiff = Math.floor(timeDiff / 30);
      const thirstDiff = Math.floor(timeDiff / 60);
      const litterboxDiff = Math.floor(timeDiff / 45);
      const affectionDiff = Math.floor(timeDiff / 15);
      const sleepDiff = Math.min(timeDiff, 5); // Cap sleep gain at 5 minutes

      setCatStats((prevStats) => ({
        ...prevStats,
        hunger: Math.max(prevStats.hunger - hungerDiff, 0),
        thirst: Math.max(prevStats.thirst - thirstDiff, 0),
        litterbox: Math.max(prevStats.litterbox - litterboxDiff, 0),
        affection: Math.max(prevStats.affection - affectionDiff, 0),
        sleep: Math.min(prevStats.sleep + sleepDiff, 100),
      }));
    }

    setLastSavedTimestamp(now.valueOf());
    localStorage.setItem('lastSavedTimestamp', JSON.stringify(lastSavedTimestamp));

  }, [lastSavedTimestamp]);

  const renderNeed = (needName, currentValue) => {
    const percentage = currentValue / 100;
    const barStyle = { width: `${percentage * 20}vw` };

    return (
      <div className="need-item" key={needName}>
        <label>{needName}:{currentValue}%</label>
        <div className="status-bar-container">
            
        <div className="status-bar" style={barStyle}></div>
        </div>
        {needName !== 'Sleep' && (
          <button onClick={() => handleNeedInteraction(needName)}>
            Tend to {needName}
          </button>
        )}
        {needName == 'Sleep' && (
          <button onClick={() => handleNeedInteraction(needName)}>
            How to take care of me!
          </button>
        )}
      </div>
    );
  };

  const handleNeedInteraction = (needName) => {
    switch(needName){
      case "Affection":
        if (catStats.affection < 100) {
          setCatStats((prevStats) => ({
            ...prevStats,
            affection: Math.min(prevStats.affection + 5, 100),
            coins: prevStats.coins + 10,
          }));
        }
      break;
      case "Hunger":
        if (catStats.hunger < 100) {
          let hungerDiff = 100-catStats.hunger
          if (catStats.coins >= hungerDiff)
          {
            setCatStats((prevStats) => ({
              ...prevStats,
              hunger: 100,
              coins: prevStats.coins - hungerDiff,
            }));
          }
        }
      break;
      case "Thirst":
        if (catStats.thirst < 100) {
          setCatStats((prevStats) => ({
            ...prevStats,
            thirst: 100,
          }));
        }
      break;
      case "Litterbox":
        if (catStats.litterbox < 100) {
          let litterboxDiff = (100-catStats.litterbox)*2
          if (catStats.coins >= litterboxDiff)
          {
            setCatStats((prevStats) => ({
              ...prevStats,
              litterbox: 100,
              coins: prevStats.coins - litterboxDiff,
            }));
          }
        }
      break;
      case "Sleep":
        alert(`
Guide: 
- Hunger cost 1 coin per point.
- Thirst is Free!
- Litterbox is 2 coin per point.
- Giving affection gives 10 coins per click, if affection is not at 100.
- Sleep is restored when you are not on the website, and goes down while you are here.
              Hope you enjoy your page kitty!`)
      break;
      //Cases for other buttons
      default:
      break;
    }
  };



  return (
    <div className="pagecat-container">
      {catStats.name ? (
        <div>
          <h2>Welcome Back! Here is how {catStats.name} is currently doing!</h2>
          <p>Coins: {catStats.coins}</p>
          <div className="needs-grid">
            {renderNeed('Hunger', catStats.hunger)}
            {renderNeed('Thirst', catStats.thirst)}
            {renderNeed('Litterbox', catStats.litterbox)}
            {renderNeed('Affection', catStats.affection)}
            {renderNeed('Sleep', catStats.sleep)}
          </div>
          <p>
           Adopted on {dayjs(catStats.adoptionDate).format('MMMM D, YYYY')}
          </p>
          <p>
          <img src="./img/pagecat.png" alt="orange kitty picture" className="catpic"/>          
          </p>

        </div>
      ) : (
        <div className="introduction">
          <h2>Welcome to your virtual cat adoption!</h2>
          <p>Please enter a name for your new furry friend:</p>
          <form onSubmit={handleNameSubmit}>
            <input
              type="text"
              value={catName}
              onChange={handleNameChange}
              placeholder="Enter cat name (3-15 characters)"
              maxLength={15}
            />
            <button type="submit">Adopt</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Pagecat;