import React, { useState, useEffect } from 'react';

function Savedata(props) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Load data on component mount
    const storedData = localStorage.getItem('resorcererData');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      // Update Resourcerer.jsx state using props (explained later)
      props.onDataLoaded(parsedData);
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    // Save data on changes
    if (loaded) {
      const dataToSave = {
        resources: props.resources,
        stationLevels: props.stationLevels,
      };
      localStorage.setItem('resorcererData', JSON.stringify(dataToSave));
    }
  }, [loaded, props.resources, props.stationLevels]);

  return null; // This component doesn't render anything directly
}

export default Savedata;