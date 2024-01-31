import React, { useState } from 'react';

function Stonecutter({ resources, setResources, stationLevels, setStationLevels }) {
  const harvestTime = [16000, 15000, 14000, 13000, 12000, 11000];

  const upgradeCosts = {
    harvestLevel: [0, 100, 500, 1000, 2000, 5000], // Increasing costs for each level
    harvestTimeLevel: [1000, 2500, 5000, 10000, 20000],
    stonecutters: [0, 500, 1000, 2500, 5000, 10000],
  };

  const handleUpgrade = (upgradeType) => {
    const cost = upgradeCosts[upgradeType][stationLevels.Stonecutter[upgradeType]]; // Get cost for current level
    if (resources.coins >= cost) {
      setResources({ ...resources, coins: resources.coins - cost });

      // Increase the level based on upgradeType
      switch (upgradeType) {
        case 'harvestLevel':
          setStationLevels((prevLevels) => ({
            ...prevLevels,        
            Stonecutter: {          
              ...prevLevels.Stonecutter,          
                harvestLevel: stationLevels.Stonecutter.harvestLevel + 1,          
            }, 
          }));
          break;
        case 'harvestTimeLevel':
          setStationLevels((prevLevels) => ({
            ...prevLevels,        
            Stonecutter: {          
              ...prevLevels.Stonecutter,    
                harvestTimeLevel: stationLevels.Stonecutter.harvestTimeLevel + 1,               
                harvestTime: harvestTime[stationLevels.Stonecutter.harvestTimeLevel], // Update harvestTime  
            }, 
          }));
          break;
        case 'stonecutters':
          setStationLevels((prevLevels) => ({
            ...prevLevels,        
            Stonecutter: {          
              ...prevLevels.Stonecutter,          
              stonecutters: stationLevels.Stonecutter.stonecutters + 1,          
            }, 
          }));
          break;
        default:
          console.warn('Unknown upgrade type:', upgradeType);
      }
    } else {
      console.warn('Not enough coins to upgrade!');
    }
  };

  // ... functions to handle upgrades and harvesting ...

  return (
    <table>
      <thead>
        <tr>
          <th>Option</th>
          <th>Cost</th>
          <th>Current Level</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Increase Harvest Level</td>
          <td>{/* Update cost display */}
            {stationLevels.Stonecutter.harvestLevel >= upgradeCosts.harvestLevel.length - 1 // Check if at max level
                ? 'MAX' // If max, display MAX
                : `${upgradeCosts.harvestLevel[stationLevels.Stonecutter.harvestLevel]} coins` }
          </td>
          <td>{stationLevels.Stonecutter.harvestLevel}</td>
          <td>
            {/* Conditionally render button */}
            {stationLevels.Stonecutter.harvestLevel < upgradeCosts.harvestLevel.length - 1 && (
              <button onClick={() => handleUpgrade('harvestLevel')}>Upgrade</button>
            )} 
          </td>
        </tr>
        <tr>
          <td>Decrease Harvest Time</td>
          <td>{/* Update cost display */}
            {stationLevels.Stonecutter.harvestTimeLevel >= upgradeCosts.harvestTimeLevel.length - 1 // Check if at max level
                ? 'MAX' // If max, display MAX
                : `${upgradeCosts.harvestTimeLevel[stationLevels.Stonecutter.harvestTimeLevel]} coins` }
          </td>
          <td>{stationLevels.Stonecutter.harvestTimeLevel}</td>
          <td>
            {/* Conditionally render button */}
            {stationLevels.Stonecutter.harvestTimeLevel < upgradeCosts.harvestTimeLevel.length - 1 && (
              <button onClick={() => handleUpgrade('harvestTimeLevel')}>Upgrade</button>
            )} 
          </td>
        </tr>
        <tr>
          <td>Add Another Stonecutter</td>
          <td>{/* Update cost display */}
            {stationLevels.Stonecutter.stonecutters >= upgradeCosts.stonecutters.length - 1 // Check if at max level
                ? 'MAX' // If max, display MAX
                : `${upgradeCosts.stonecutters[stationLevels.Stonecutter.stonecutters]} coins` }
          </td>
          <td>{stationLevels.Stonecutter.stonecutters}</td>
          <td>
            {/* Conditionally render button */}
            {stationLevels.Stonecutter.stonecutters < upgradeCosts.stonecutters.length - 1 && (
              <button onClick={() => handleUpgrade('stonecutters')}>Upgrade</button>
            )} 
          </td>
        </tr>
        {/* ... similar rows for other options ... */}
      </tbody>
    </table>
  );
}

export default Stonecutter;