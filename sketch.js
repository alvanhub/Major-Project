// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let grid;
let rows = 50;
let cols = 50;
let playerX = 100;
let playerY = 100;
let yVelocity = 0;
let xVelocity = 0;
let yCoord;
let xCoord;



function setup() {
  windowResized();
  rectMode(CENTER);
  grid = createEmptyGrid(cols, rows);
  
}

function draw() {
  background(255);
  displayGrid(grid, rows, cols);
  create();
  keyReleased();
  
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
        if (y === yCoord && x === xCoord){
          fill(51,171,249);
          stroke(51,171,249);
        }else{
          fill(0);
          stroke(0)
        }
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

function keyReleased() {
  
  if (key === "s") {
    yVelocity = 5;
    xVelocity = 0;
  }

  else if (key === "d") {
    yVelocity = 0;
    xVelocity = 5;
    
  }
  else if (key === "a") {
    yVelocity = 0;
    xVelocity = -5;
  }
  else if (key === "w") {
    yVelocity = -5;
    xVelocity = 0;
  }
  playerY += yVelocity;
  playerX += xVelocity;
  
}

 function create() {
   let cellSize = width/cols;

    xCoord = floor(playerX / cellSize);
    yCoord = floor(playerY / cellSize);

   if (grid[yCoord][xCoord] === 0) {
    grid[yCoord][xCoord] = 1;
  }
  
  fill(255);
  rect(playerX,playerY,50,50);
 }