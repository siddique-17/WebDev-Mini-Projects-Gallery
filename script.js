let randomNumber;
let attempts = 0;
let maxAttempts = 10;
let points = 100;
let bestScore = 0;
let gamesPlayed = 0;
let currentSession = 0;

const guessInput = document.getElementById('guessInput');
const message = document.getElementById('message');
const attemptsDisplay = document.getElementById('attempts');
const pointsDisplay = document.getElementById('points');
const bestScoreDisplay = document.getElementById('bestScore');
const gamesPlayedDisplay = document.getElementById('gamesPlayed');
const currentSessionDisplay = document.getElementById('currentSession');

function initGame() {
  randomNumber = Math.floor(Math.random() * 100) + 1;
  attempts = 0;
  points = 100;
  currentSession++;
  updateStats();
  message.textContent = "Start guessing!";
  guessInput.disabled = false;
}

function checkGuess() {
  const userGuess = parseInt(guessInput.value);
  if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
    message.textContent = "⛔ Enter a number between 1 and 100.";
    return;
  }

  attempts++;
  points -= 10;

  if (userGuess === randomNumber) {
    message.textContent = `🎉 Correct! The number was ${randomNumber}`;
    guessInput.disabled = true;
    updateBestScore();
  } else if (attempts >= maxAttempts) {
    message.textContent = `❌ Game Over! The number was ${randomNumber}`;
    guessInput.disabled = true;
  } else if (userGuess < randomNumber) {
    message.textContent = "🔼 Too low!";
  } else {
    message.textContent = "🔽 Too high!";
  }

  updateStats();
}

function updateStats() {
  attemptsDisplay.textContent = `Attempts: ${attempts}/${maxAttempts}`;
  pointsDisplay.textContent = `Points: ${points}`;
  bestScoreDisplay.textContent = bestScore;
  gamesPlayedDisplay.textContent = gamesPlayed;
  currentSessionDisplay.textContent = currentSession;
}

function updateBestScore() {
  if (points > bestScore) {
    bestScore = points;
  }
}

function resetGame() {
  gamesPlayed++;
  guessInput.value = '';
  initGame();
}

initGame();
