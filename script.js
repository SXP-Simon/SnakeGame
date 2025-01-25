const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const startButton = document.getElementById('start-button');
const pauseButton = document.getElementById('pause-button');
const scoreDisplay = document.getElementById('score');
const gameOverModal = document.getElementById('game-over-modal');
const restartButton = document.getElementById('restart-button');
const clearHighScoreButton = document.getElementById('clear-high-score-button');

// Constants
const GRID_SIZE = 20;
const BOX = 20;
const LEFT_KEY = 37;
const UP_KEY = 38;
const RIGHT_KEY = 39;
const DOWN_KEY = 40;
const SPACE_KEY = 32;

// Game variables
let snake = [{ x: 9 * BOX, y: 9 * BOX }];
let food = generateFood();
let direction = 'RIGHT';
let score = 0;
let highScore = localStorage.getItem('highScore') || 0;
let isPaused = false;
let gameInterval;

// Generate food at random position
function generateFood() {
  return {
    x: Math.floor(Math.random() * GRID_SIZE) * BOX,
    y: Math.floor(Math.random() * GRID_SIZE) * BOX,
  };
}

// Draw game elements
function draw() {
  if (isPaused) return; // 如果游戏暂停，不执行任何操作

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw food
  ctx.fillStyle = 'red';
  ctx.fillRect(food.x, food.y, BOX, BOX);

  // Draw snake
  snake.forEach((segment, index) => {
    ctx.fillStyle = index === 0 ? 'green' : 'white';
    ctx.fillRect(segment.x, segment.y, BOX, BOX);
  });

  // Move snake
  const head = { x: snake[0].x, y: snake[0].y };

  if (direction === 'LEFT') head.x -= BOX;
  if (direction === 'RIGHT') head.x += BOX;
  if (direction === 'UP') head.y -= BOX;
  if (direction === 'DOWN') head.y += BOX;

  snake.unshift(head);

  // Check if snake eats food
  if (head.x === food.x && head.y === food.y) {
    score += 10;
    updateHighScore();
    food = generateFood();
    scoreDisplay.textContent = `Score: ${score} | High Score: ${highScore}`;
  } else {
    snake.pop();
  }

  // Game over conditions
  if (checkCollision(head)) {
    clearInterval(gameInterval);
    gameOverModal.style.display = 'block';
  }
}

// Check for collision
function checkCollision(head) {
  return (
    head.x < 0 || head.x >= canvas.width ||
    head.y < 0 || head.y >= canvas.height ||
    snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)
  );
}

// Update high score
function updateHighScore() {
  if (score > highScore) {
    highScore = score;
    localStorage.setItem('highScore', highScore);
  }
}

// Clear high score
function clearHighScore() {
  localStorage.removeItem('highScore'); // 移除 localStorage 中的最高分
  highScore = 0; // 将最高分重置为 0
  scoreDisplay.textContent = `Score: ${score} | High Score: ${highScore}`; // 更新页面显示
}

// Change direction
function changeDirection(event) {
  const keyPressed = event.keyCode;
  const goingUp = direction === 'UP';
  const goingDown = direction === 'DOWN';
  const goingLeft = direction === 'LEFT';
  const goingRight = direction === 'RIGHT';

  if (keyPressed === LEFT_KEY && !goingRight) direction = 'LEFT';
  if (keyPressed === UP_KEY && !goingDown) direction = 'UP';
  if (keyPressed === RIGHT_KEY && !goingLeft) direction = 'RIGHT';
  if (keyPressed === DOWN_KEY && !goingUp) direction = 'DOWN';
}

// Toggle pause
function togglePause() {
  isPaused = !isPaused;
  if (isPaused) {
    clearInterval(gameInterval);
    pauseButton.textContent = 'Resume';
  } else {
    gameInterval = setInterval(draw, 100);
    pauseButton.textContent = 'Pause';
  }
}

// Start game
function startGame() {
  snake = [{ x: 9 * BOX, y: 9 * BOX }];
  food = generateFood();
  direction = 'RIGHT';
  score = 0;
  scoreDisplay.textContent = `Score: ${score} | High Score: ${highScore}`;
  clearInterval(gameInterval);
  gameInterval = setInterval(draw, 100);
  gameOverModal.style.display = 'none';
  isPaused = false; // 重置暂停状态
  pauseButton.textContent = 'Pause'; // 重置按钮文本
}

// Event listeners
startButton.addEventListener('click', startGame);
pauseButton.addEventListener('click', togglePause);
restartButton.addEventListener('click', startGame);
clearHighScoreButton.addEventListener('click', clearHighScore);
document.addEventListener('keydown', changeDirection);
document.addEventListener('keydown', (event) => {
  if (event.keyCode === SPACE_KEY) togglePause();
});