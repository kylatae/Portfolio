import React from 'react';

const monsters = [
  {
    name: 'Goblin',
    class: 'Warrior',
    health: 20,
    maxHealth: 20,
    strength: 4,
    dexterity: 3,
    magic: 1,
  },
  {
    name: 'Dire Wolf',
    class: 'Ranger',
    health: 35,
    maxHealth: 35,
    strength: 6,
    dexterity: 5,
    magic: 2,
  },
  // ... Add more monsters here
];

// Ideally, in a larger project, you might fetch monster data from an external source

export default monsters;