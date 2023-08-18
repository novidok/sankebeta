const board = document.getElementById("board");
const numRows = 31;
const numCols = 31;
const cellSize = 20;
let snake = [{row: 15, col: 15}];
let food = {row: Math.floor(Math.random() * numRows), col: Math.floor(Math.random() * numCols)};
let direction = "right";
let gameOver = false;

function createBoard() {
  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      if (row === food.row && col === food.col) {
        cell.classList.add("food");
      }
      board.appendChild(cell);
    }
  }
}

function updateBoard() {
  const cells = document.querySelectorAll(".cell");
  cells.forEach(cell => cell.classList.remove("food", "snake-head"));
  
  if (!gameOver) {
    const head = snake[0];
    let newHead = {...head};
    
    if (direction === "up") newHead.row -= 1;
    else if (direction === "down") newHead.row += 1;
    else if (direction === "left") newHead.col -= 1;
    else if (direction === "right") newHead.col += 1;
    
    snake.unshift(newHead);
    
    if (newHead.row === food.row && newHead.col === food.col) {
      food = {row: Math.floor(Math.random() * numRows), col: Math.floor(Math.random() * numCols)};
    } else {
      snake.pop();
    }
    
    if (newHead.row < 0 || newHead.row >= numRows || newHead.col < 0 || newHead.col >= numCols) {
      gameOver = true;
    }
    
    for (let i = 1; i < snake.length; i++) {
      if (snake[i].row === newHead.row && snake[i].col === newHead.col) {
        gameOver = true;
        break;
      }
    }
  }
  
  snake.forEach((segment, index) => {
    const cellIndex = segment.row * numCols + segment.col;
    const cell = cells[cellIndex];
    if (index === 0) {
      cell.classList.add("snake-head");
    }
  });
  
  const foodCellIndex = food.row * numCols + food.col;
  const foodCell = cells[foodCellIndex];
  foodCell.classList.add("food");
  
  if (gameOver) {
    clearInterval(gameLoop);
    alert("Game Over!");
  }
}

createBoard();
const gameLoop = setInterval(updateBoard, 100);

document.addEventListener("keydown", (event) => {
  if (event.key === "w" && direction !== "down") direction = "up";
  else if (event.key === "s" && direction !== "up") direction = "down";
  else if (event.key === "a" && direction !== "right") direction = "left";
  else if (event.key === "d" && direction !== "left") direction = "right";
  else if (event.key === "r") window.location.reload();
});