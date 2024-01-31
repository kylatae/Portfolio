import React, { useState, useEffect } from 'react';

function Trade({ resources, setResources }) {
  const [prices, setPrices] = useState({ wood: 50, stone: 75 }); // Initial prices

  useEffect(() => {
    // Simulate random price changes
    const intervalId = setInterval(() => {
      setPrices((prevPrices) => ({
        wood: Math.floor(Math.random() * (200 - 50 + 1)) + 50,
        stone: Math.floor(Math.random() * (500 - 300 + 1)) + 300,
      }));
    }, 5000); // Update every 5 seconds

    return () => clearInterval(intervalId);
  }, []);

  const handleSell = (resource) => {
    if (resources[resource] >= 100) {
      setResources((prevResources) => ({
        ...prevResources,
        [resource]: prevResources[resource] - 100,
        coins: prevResources.coins + prices[resource],
      }));
    } else {
      console.warn('Not enough resources to sell!');
    }
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Resource</th>
          <th>Current Price</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {['wood', 'stone'].map((resource) => (
          <tr key={resource}>
            <td>{resource}</td>
            <td>{prices[resource]} coins per 100</td>
            <td>
              {resources[resource] >= 100 && (
                <button onClick={() => handleSell(resource)}>Sell 100</button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Trade;