import React, { useState, useEffect, useRef } from 'react';
import '../css/MathGame.css'; // Import your CSS file

function MathGame() {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [answer, setAnswer] = useState('');
  const [score, setScore] = useState({ correct: 0, incorrect: 0 });
  const inputRef = useRef(null);
  const [timeRemaining, setTimeRemaining] = useState(60); // Full timer in seconds
  const [timerRunning, setTimerRunning] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const timerIntervalRef = useRef(null);

  // useEffect(() => {
  //   generateNewQuestion();
  //   inputRef.current.focus(); // Focus on the input field
  // }, []);

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
      setGameStarted(false); // Game ends when timer hits 0
      alert('Time is up!');
    }
  }, [timeRemaining]);

  const handleStartGame = () => {
    setGameStarted(true);
    startTimer();
    generateNewQuestion();
    inputRef.current.focus();
  };

  return (
    <div className="math-practice">
      {!gameStarted && (
        <button className="start-button" onClick={handleStartGame}>
          Start Game
        </button>
      )}

      {gameStarted && (
        <div>
          <div className="score">
            Correct: {score.correct} - Incorrect: {score.incorrect}
          </div>
          <div className="timer">Time Remaining: {timeRemaining}</div>

          <div className="question">
            {num1} + {num2} =
            <form onSubmit={handleSubmit}>
              <input
                type="number"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                ref={inputRef}
                disabled={!timerRunning}
              />
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default MathGame;