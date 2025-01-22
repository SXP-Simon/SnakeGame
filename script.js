const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const startButton = document.getElementById('start-button');
const scoreDisplay = document.getElementById('score');

const box = 20;
let snake = [{x: 9 * box, y: 9 * box}];
let food = generateFood();
let direction = 'RIGHT';
let score = 0;
let gameInterval;

function generateFood() {
  return {
    x: Math.floor(Math.random() * 19) * box,
    y: Math.floor(Math.random() * 19) * box,
  };
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // Draw food
  ctx.fillStyle = 'red';
  ctx.fillRect(food.x, food.y, box, box);

  // Draw snake
  snake.forEach((segment, index) => {
    ctx.fillStyle = index === 0 ? 'green' : 'white';
    ctx.fillRect(segment.x, segment.y, box, box);
  });

  // Move snake
  const head = {x: snake[0].x, y: snake[0].y};

  if (direction === 'LEFT') head.x -= box;
  if (direction === 'RIGHT') head.x += box;
  if (direction === 'UP') head.y -= box;
  if (direction === 'DOWN') head.y += box;

  snake.unshift(head);

  // Check if snake eats food
  if (head.x === food.x && head.y === food.y) {
    score += 10;
    food = generateFood();
    scoreDisplay.textContent = `Score: ${score}`;
  } else {
    snake.pop();
  }

  // Game over conditions
  if (
    head.x < 0 || head.x >= canvas.width ||
    head.y < 0 || head.y >= canvas.height ||
    collision(head, snake)
  ) {
    clearInterval(gameInterval);
    alert('Game Over!');
  }

  // Draw snake and food
  ctx.fillStyle = 'green';
  ctx.fillRect(snake[0].x, snake[0].y, box, box);
}

function collision(head, snake) {
  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      return true;
    }
  }
  return false;
}

function changeDirection(event) {
  if (event.keyCode === 37 && direction !== 'RIGHT') direction = 'LEFT';
  if (event.keyCode === 38 && direction !== 'DOWN') direction = 'UP';
  if (event.keyCode === 39 && direction !== 'LEFT') direction = 'RIGHT';
  if (event.keyCode === 40 && direction !== 'UP') direction = 'DOWN';
}

function startGame() {
  snake = [{x: 9 * box, y: 9 * box}];
  food = generateFood();
  direction = 'RIGHT';
  score = 0;
  scoreDisplay.textContent = `Score: ${score}`;
  gameInterval = setInterval(draw, 100);
}

startButton.addEventListener('click', startGame);
document.addEventListener('keydown', changeDirection);
