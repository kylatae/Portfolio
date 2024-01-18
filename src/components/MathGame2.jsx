import React, { useState, useEffect, useRef } from 'react';
import '../css/MathGame2.css'; // Import your CSS file

function MathGame2() {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [answer, setAnswer] = useState('');
  const [score, setScore] = useState({ correct: 0, incorrect: 0 });
  const inputRef = useRef(null);
  const [timeRemaining, setTimeRemaining] = useState(0); // Time in seconds
  const [timerRunning, setTimerRunning] = useState(false);
  const timerIntervalRef = useRef(null);
  const [gameStarted, setGameStarted] = useState(false); // Game not started

  useEffect(() => {
    if (!gameStarted) {
      // Hide question when game is not started
      const questionDiv = document.querySelector('.question');
      questionDiv.style.display = 'none';
    }
  }, [gameStarted]);

  const generateNewQuestion = () => {
    setNum1(Math.floor(Math.random() * 100) + 1);
    setNum2(Math.floor(Math.random() * 100) + 1);
    setAnswer(''); // Clear answer input
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (answer.trim() === '') return; // Don't submit if answer is blank
    const correctAnswer = num1 + num2;
    
    if (parseInt(answer) === correctAnswer) {
      setScore((prevScore) => ({ ...prevScore, correct: prevScore.correct + 1 }));
    } else {
      setScore((prevScore) => ({ ...prevScore, incorrect: prevScore.incorrect + 1 }));
    }
    if (!timerRunning) {
      startTimer();
    }
    generateNewQuestion();
  };

  const startTimer = () => {
    setTimerRunning(true);
    timerIntervalRef.current = setInterval(() => {
      setTimeRemaining((prevTime) => prevTime - 1);
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(timerIntervalRef.current);
    setTimerRunning(false);
  };

  useEffect(() => {
    if (timeRemaining === 0) {
      stopTimer();
      alert('Time is up!');
    }
  }, [timeRemaining]);

  const handleStartGame = () => {
    setGameStarted(true);
    setTimeRemaining(60); // Set timer to 1 minute (60 seconds)
    startTimer();
    generateNewQuestion();

    // Show the question now that the game has started
    const questionDiv = document.querySelector('.question');
    questionDiv.style.display = 'block';
  };

  return (
    <div className="math-practice">
      <div className="score">
        Correct: {score.correct} - Incorrect: {score.incorrect}
      </div>
      <div className="timer">Time Remaining: {timeRemaining}</div>
      {!gameStarted && (
        <button onClick={handleStartGame}>Start Game</button>
      )}
      <div className="question">{/* Display question only when gameStarted is true */}
        {num1} + {num2} =
        <form onSubmit={handleSubmit}>
          <input
            type="number"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            ref={inputRef}
            disabled={!timerRunning} // Disable input when timer runs out
          />
        </form>
      </div>
    </div>
  );
}

export default MathGame2;