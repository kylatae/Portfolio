import React, { useState, useEffect } from 'react';
import '../css/Resorcerer.css';
import Woodcutter from './stations/Woodcutter';
import Stonecutter from './stations/Stonecutter';
import Savedata from './stations/Savedata';
import Trade from './stations/Trade';



function Resorcerer() {
  const [resources, setResources] = useState({
    wood: 0,
    stone: 0,
    coins: 5000,
  });
  const [activeStation, setActiveStation] = useState(null);
  const [stationLevels, setStationLevels] = useState({
    Woodcutter: {
      harvestLevel: 1,
      harvestTimeLevel: 0,
      harvestTime: 5000,
      woodcutters: 1,
    },
    Stonecutter: {
      harvestLevel: 1,
      harvestTimeLevel: 0,
      harvestTime: 16000,
      stonecutters: 1,
    },
    // Add other stations here as you create them
  });

  const handleDataLoaded = (data) => {
    setResources(data.resources);
    setStationLevels(data.stationLevels);
  };

  const [harvestProgress, setHarvestProgress] = useState({
    Woodcutter: 0,
    Stonecutter: 0,
  });

 useEffect(() => {
   const intervalId = setInterval(() => {
    setHarvestProgress((prevProgress) => ({
       ...prevProgress,
       Woodcutter: Math.min(
         prevProgress.Woodcutter + 100,
         stationLevels.Woodcutter.harvestTime
       ),
       Stonecutter: Math.min(
         prevProgress.Stonecutter + 100,
         stationLevels.Stonecutter.harvestTime
       ),
     }));
   }, 100);
   return () => clearInterval(intervalId);
 }, [stationLevels]);

  const handleHarvest = (stationName) => {
  let resourcesGained = {
    wood: resources.wood,
    stone: resources.stone,
    coins: resources.coins,
  }
  if(stationName === 'Woodcutter'){
    resourcesGained = {
      ...resourcesGained,
    wood:
      resources.wood +
      (stationLevels.Woodcutter.harvestLevel *
      stationLevels.Woodcutter.woodcutters),
      }}
  if(stationName === 'Stonecutter'){
    resourcesGained = {
      ...resourcesGained,
    stone:
      resources.stone + 
      (stationLevels.Stonecutter.harvestLevel *
      stationLevels.Stonecutter.stonecutters),
  }}
  setResources((prevResources) => ({
    ...prevResources,
    ...resourcesGained,
  }));

  setHarvestProgress((prevProgress) => ({
    ...prevProgress,
    [stationName]: 0,
  }));
};

useEffect(() => {
  Object.entries(harvestProgress).forEach(([station, progress]) => {
    if (progress >= stationLevels[station].harvestTime) {
      handleHarvest(station);
    }
  });
}, [harvestProgress, stationLevels]);
 
  const handleResourceClick = (stationName) => {
    setActiveStation(stationName);
  };
  return (
    <div className="game-container">
      <div className="resource-bar">
        <div className="resource">Wood: <span id="wood-count">{resources.wood}</span></div>
        <div className="resource">Stone: <span id="stone-count">{resources.stone}</span></div>
        <div className="resource">Coins: <span id="coin-count">{resources.coins}</span></div>
      </div>

      <h1 className="title">Resorcerer</h1>

      <div className="backstory">
        <p>The mighty Sorcerer, renowned for bending reality itself, found himself flung into a strange, untamed world. His arcane towers were but a memory, his vast libraries lost to the shifting currents of time. Yet, a spark of ambition ignited within him. He would not merely survive, but thrive – forging a kingdom from the very essence of this wild new realm.</p> 
      </div>
      <div className="workstations-grid">
        
      <div><button onClick={() => setActiveStation('Trade')}>Trade</button></div>
     {Object.keys(stationLevels).map((station) => (
       <React.Fragment key={station}>
         <button onClick={() => handleResourceClick(station)}>{station}</button>
         <div className="progress-bar-container">
           <div
             className="progress-bar"
             style={{ width: `${Math.floor(harvestProgress[station]/stationLevels[station].harvestTime*100)}%` }}
           ></div>
         </div>
       </React.Fragment>
     ))}
   </div>
      {activeStation === 'Trade' && <Trade resources={resources} setResources={setResources} />}
      {activeStation === 'Woodcutter' && <Woodcutter resources={resources} setResources={setResources} stationLevels={stationLevels} setStationLevels={setStationLevels} />}
      {activeStation === 'Stonecutter' && <Stonecutter resources={resources} setResources={setResources} stationLevels={stationLevels} setStationLevels={setStationLevels} />}
      <Savedata onDataLoaded={handleDataLoaded} resources={resources} stationLevels={stationLevels} />
    </div>
  );
}

export default Resorcerer;