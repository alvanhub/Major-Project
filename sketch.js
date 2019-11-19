// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let grid;
let rows = 30;
let cols = 30;
let playerX = 15;
let playerY = 15;
let yVelocity = 0;
let xVelocity = 0;


function setup() {
  windowResized();
  grid = createEmptyGrid(cols, rows);
  grid[playerY][playerX] = 1;
  
}

function draw() {
  background(255);
  displayGrid(grid, rows, cols);
  if (frameCount%10 === 0) {
    keyPressed();
  }
}

function createEmptyGrid() {
  let emptyGrid = [];
  for (let x = 0; x < cols; x++) {
    emptyGrid.push([]);
    for (let y = 0; y < rows; y++) {
      emptyGrid[x].push(0);
    }
  }
  return emptyGrid;
}

function displayGrid(grid, rows, cols) {
  let cellSize = width / cols;
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (grid[y][x] === 0) {
        fill(0);
        stroke(0)
      }
      else if(grid[y][x] === 1) {
        fill(51,171,249);
        stroke(51,171,249);
      }
      rect(x*cellSize, y*cellSize, cellSize, cellSize);
    }
  }
}

function windowResized() {
  if (windowWidth > windowHeight) {
    createCanvas(windowHeight, windowHeight);
  }
  else {
    createCanvas(windowWidth, windowWidth);
  }
}

function keyPressed() {
  grid[playerY][playerX] = 0;
  
  if (key === "s") {
    
      yVelocity = 1;
      xVelocity = 0;
    
   
  }
  if (key === "d") {
    
      yVelocity = 0;
      xVelocity = 1;
    
  }
  if (key === "a") {
      yVelocity = 0;
      xVelocity = -1;
  }
  if (key === "w") {
      yVelocity = -1;
      xVelocity = 0;
  
  }

  playerY += yVelocity;
  playerX += xVelocity;

  grid[playerY][playerX] = 1;

}

