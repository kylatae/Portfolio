import React, { useState, useEffect } from 'react';
import '../css/Poker.css'

function Card(props) {
  const { suit, value, isSelected, onSelect } = props.card;

  return (
    <div
      className={`card ${isSelected ? 'selected' : ''}`}
      onClick={() => onSelect()}
    >
      <div className="card-value">{value}</div>
      <div className={`card-suit ${suit}`}>
        {suit === 'hearts' ? '♥' : suit === 'diamonds' ? '♦' : suit === 'clubs' ? '♣' : '♠'}
      </div>
    </div>
  );
}

function Poker() {
  const [cards, setCards] = useState([]);
  const [heldCards, setHeldCards] = useState([]);
  const [isDealDisabled, setIsDealDisabled] = useState(false);
  const [isRedrawDisabled, setIsRedrawDisabled] = useState(true);
  const [points, setPoints] = useState(() => {
    const savedPoints = localStorage.getItem('points');
    return savedPoints ? parseInt(savedPoints) : 100;
  });

  const dealCards = () => {
    if (points < 10) return;
    const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
    const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    const deck = [];

    for (const suit of suits) {
      for (const value of values) {
        deck.push({ suit, value });
      }
    }

    const shuffled = deck.sort(() => 0.5 - Math.random());
    setCards(shuffled.slice(0, 5));
    setPoints(points - 10);
    setIsDealDisabled(true);  // Disable Deal after dealing
    setIsRedrawDisabled(false); // Enable Redraw
  };

  const calculateWinnings = (hand) => {
    const ranks = hand.map((card) => card.value);
    const suits = hand.map((card) => card.suit);

    // Check for winning combinations (highest to lowest):

    // Royal flush
    if (isRoyalFlush(ranks, suits)) {
      return 800;
    }
    // Straight flush
    if (isStraightFlush(ranks, suits)) {
      return 50;
    }
    // Four of a kind
    if (isFourOfAKind(ranks)) {
      return 25;
    }
    // Full house
    if (isFullHouse(ranks)) {
      return 9;
    }
    // Flush
    if (isFlush(suits)) {
      return 6;
    }
    // Straight
    if (isStraight(ranks)) {
      return 4;
    }
    // Three of a kind
    if (isThreeOfAKind(ranks)) {
      return 3;
    }
    // // Two pair
    if (isTwoPair(ranks)) {
      return 2;
    }
    // Jacks or better
    if (isJacksOrBetter(ranks)) {
      return 1;
    }

    return 0; // No winning combination
  };


  function isRoyalFlush(ranks, suits) {
    const royalRanks = ['A', 'K', 'Q', 'J', '10'];
    return isStraight(ranks) && isFlush(suits) && royalRanks.every((r) => ranks.includes(r));
  }
  
  function isStraightFlush(ranks, suits) {
    return isStraight(ranks) && isFlush(suits);
  }
  
  function isFourOfAKind(ranks) {
    const counts = ranks.reduce((acc, r) => {
      acc[r] = acc[r] + 1 || 1;
      return acc;
    }, {});
    return Object.values(counts).some((c) => c === 4);
  }

  function isFlush(suits) {
    return new Set(suits).size === 1;
  }

  function isFullHouse(ranks) {
    const counts = ranks.reduce((acc, r) => {
      acc[r] = acc[r] + 1 || 1;
      return acc;
    }, {});
    const values = Object.values(counts);
    return values.includes(3) && values.includes(2);
  }

  function isStraight(ranks) {
    const sortedRanks = ranks.slice().sort(); // Avoid modifying the original array
    const expectedRanks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    let start = expectedRanks.indexOf(sortedRanks[0]);
  
    // Check straight starting with Ace (A-2-3-4-5)
    if (start === -1) {
      start = expectedRanks.indexOf('A');
      if (start !== -1 && sortedRanks.slice(1).join('') === '2345') {
        return true;
      }
    } else {
      // Check regular straight
      for (let i = 0; i < 5; i++) {
        if (sortedRanks[i] !== expectedRanks[start + i]) {
          return false;
        }
      }
      return true;
    }
  }

  function isThreeOfAKind(ranks) {
    const counts = ranks.reduce((acc, r) => {
      acc[r] = acc[r] + 1 || 1;
      return acc;
    }, {});
    return Object.values(counts).some((c) => c === 3);
  }

  function isTwoPair(ranks) {
    const counts = ranks.reduce((acc, r) => {
      acc[r] = acc[r] + 1 || 1;
      return acc;
    }, {});
    const pairs = Object.values(counts).filter(c => c === 2);
    return pairs.length === 2;
  }

  function isJacksOrBetter(ranks) {
    const counts = ranks.reduce((acc, r) => {
      acc[r] = acc[r] + 1 || 1;
      return acc;
    }, {});
    return Object.entries(counts).some(([rank, count]) => count === 2 && ['J', 'Q', 'K', 'A'].includes(rank));
  }
  

  const handleCardSelect = (index) => {
    setHeldCards((prevHeld) => {
      if (prevHeld.includes(index)) {
        return prevHeld.filter((i) => i !== index);
      } else {
        return [...prevHeld, index];
      }
    });
  };

  const redrawHand = () => {
    const newCards = cards.map((card, index) => {
      if (heldCards.includes(index)) {
        return card; // Keep held cards
      } else {
        // Replace non-held cards
        return {
          suit: ['hearts', 'diamonds', 'clubs', 'spades'][Math.floor(Math.random() * 4)],
          value: ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'][Math.floor(Math.random() * 13)],
        };
      }
    });
    setCards(newCards);

    const winnings = calculateWinnings(newCards)*10;
    if (winnings > 0) {
      setPoints(points + winnings);
      alert(`You won ${winnings} points!`);
    }

    setHeldCards([]);  // Deselect all cards
    setIsDealDisabled(false); // Enable Deal after redraw
    setIsRedrawDisabled(true); // Disable Redraw
  };


  useEffect(() => {
    dealCards();
  }, []);

  useEffect(() => {
    if (points === 0) {
      alert("You went bankrupt! Here is some more points, have fun!");
      setPoints(100)
    }
    localStorage.setItem('points', points);
  }, [points]);

  return (
    <div>
      <h2>Payouts</h2>
      <table>
        <thead>
          <tr>
            <th>Hand</th>
            <th>Payout</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Royal Flush</td><td>800x</td></tr>
          <tr><td>Straight Flush</td><td>50x</td></tr>
          <tr><td>Four of a Kind</td><td>25x</td></tr>
          <tr><td>Full House</td><td>9x</td></tr>
          <tr><td>Flush</td><td>6x</td></tr>
          <tr><td>Straight</td><td>4x</td></tr>
          <tr><td>Three of a Kind</td><td>3x</td></tr>
          <tr><td>Two Pair</td><td>2x</td></tr>
          <tr><td>Jacks or Better</td><td>1x</td></tr>
        </tbody>
      </table>
      <div><h1>Points: {points}</h1></div>
      <button onClick={dealCards} disabled={isDealDisabled || points < 10}>Deal (10 points)</button>
      <button onClick={redrawHand} disabled={isRedrawDisabled}>Redraw</button>
      <div className="card-container">
        {cards.map((card, index) => (
          <Card
            key={index}
            card={{ ...card, isSelected: heldCards.includes(index), onSelect: () => handleCardSelect(index) }}
          />
        ))}
      </div>
    </div>
  );
}

export default(Poker)

