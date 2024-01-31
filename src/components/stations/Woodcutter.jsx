import React, { useState } from 'react';

function Woodcutter({ resources, setResources, stationLevels, setStationLevels }) {
  const harvestTime = [5000, 4900, 4800, 4700, 4600, 4500];

  const upgradeCosts = {
    harvestLevel: [0, 10, 50, 100, 200, 500], // Increasing costs for each level
    harvestTimeLevel: [100, 250, 500, 1000, 2000],
    woodcutters: [0, 50, 100, 250, 500, 1000],
  };

  const handleUpgrade = (upgradeType) => {
    const cost = upgradeCosts[upgradeType][stationLevels.Woodcutter[upgradeType]]; // Get cost for current level
    if (resources.coins >= cost) {
      setResources({ ...resources, coins: resources.coins - cost });

      // Increase the level based on upgradeType
      switch (upgradeType) {
        case 'harvestLevel':
          setStationLevels((prevLevels) => ({
            ...prevLevels,        
            Woodcutter: {          
              ...prevLevels.Woodcutter,          
                harvestLevel: stationLevels.Woodcutter.harvestLevel + 1,          
            }, 
          }));
          break;
        case 'harvestTimeLevel':
          setStationLevels((prevLevels) => ({
            ...prevLevels,        
            Woodcutter: {          
              ...prevLevels.Woodcutter,    
                harvestTimeLevel: stationLevels.Woodcutter.harvestTimeLevel + 1,               
                harvestTime: harvestTime[stationLevels.Woodcutter.harvestTimeLevel], // Update harvestTime  
            }, 
          }));
          break;
        case 'woodcutters':
          setStationLevels((prevLevels) => ({
            ...prevLevels,        
            Woodcutter: {          
              ...prevLevels.Woodcutter,          
              woodcutters: stationLevels.Woodcutter.woodcutters + 1,          
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
            {stationLevels.Woodcutter.harvestLevel >= upgradeCosts.harvestLevel.length - 1 // Check if at max level
                ? 'MAX' // If max, display MAX
                : `${upgradeCosts.harvestLevel[stationLevels.Woodcutter.harvestLevel]} coins` }
          </td>
          <td>{stationLevels.Woodcutter.harvestLevel}</td>
          <td>
            {/* Conditionally render button */}
            {stationLevels.Woodcutter.harvestLevel < upgradeCosts.harvestLevel.length - 1 && (
              <button onClick={() => handleUpgrade('harvestLevel')}>Upgrade</button>
            )} 
          </td>
        </tr>
        <tr>
          <td>Decrease Harvest Time</td>
          <td>{/* Update cost display */}
            {stationLevels.Woodcutter.harvestTimeLevel >= upgradeCosts.harvestTimeLevel.length - 1 // Check if at max level
                ? 'MAX' // If max, display MAX
                : `${upgradeCosts.harvestTimeLevel[stationLevels.Woodcutter.harvestTimeLevel]} coins` }
          </td>
          <td>{stationLevels.Woodcutter.harvestTimeLevel}</td>
          <td>
            {/* Conditionally render button */}
            {stationLevels.Woodcutter.harvestTimeLevel < upgradeCosts.harvestTimeLevel.length - 1 && (
              <button onClick={() => handleUpgrade('harvestTimeLevel')}>Upgrade</button>
            )} 
          </td>
        </tr>
        <tr>
          <td>Add Another Woodcutter</td>
          <td>{/* Update cost display */}
            {stationLevels.Woodcutter.woodcutters >= upgradeCosts.woodcutters.length - 1 // Check if at max level
                ? 'MAX' // If max, display MAX
                : `${upgradeCosts.woodcutters[stationLevels.Woodcutter.woodcutters]} coins` }
          </td>
          <td>{stationLevels.Woodcutter.woodcutters}</td>
          <td>
            {/* Conditionally render button */}
            {stationLevels.Woodcutter.woodcutters < upgradeCosts.woodcutters.length - 1 && (
              <button onClick={() => handleUpgrade('woodcutters')}>Upgrade</button>
            )} 
          </td>
        </tr>
        {/* ... similar rows for other options ... */}
      </tbody>
    </table>
  );
}

export default Woodcutter;