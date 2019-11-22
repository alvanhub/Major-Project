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
let xCoord;
let yCoord;
let player;




function setup() {
  windowResized();
  rectMode(CENTER);
  grid = createEmptyGrid(cols, rows);
  player = new Player;
}

function draw() {
  background(255);
  displayGrid(grid, rows, cols);
  player.keyControl();
  player.create();
  
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
  
  if (keyIsDown(DOWN_ARROW)) {
    if(yVelocity < 15){
      yVelocity += 1;
    }
    xVelocity = 0;
  }

  if (keyIsDown(RIGHT_ARROW)) {
    yVelocity = 0;
    if(xVelocity < 15){
      xVelocity += 1;
    }
  }
  if (keyIsDown(LEFT_ARROW)) {
    yVelocity = 0;
    if(xVelocity > -15){
      xVelocity -= 1;
    }
  }
  if (keyIsDown(UP_ARROW)) {
    if(yVelocity > -15){
      yVelocity -= 1;
    }
    xVelocity = 0;
  }

  else{
    if(xVelocity < 0) {
      xVelocity += 0.2;
    }else if(xVelocity > 0) {
      xVelocity -= 0.2;
    }

    if(yVelocity < 0) {
      yVelocity += 0.2;
    }else if(yVelocity > 0) {
      yVelocity -= 0.2;
    }
  }

  playerY += yVelocity;
  playerX += xVelocity;
  
  
}

 

 class Player {
   constructor() {
    this.playerX = 100;
    this.playerY = 100;
    this.yVelocity = 0;
    this.xVelocity = 0;
   }

   create() {
    let cellSize = width/cols;
 
     xCoord = floor(playerX / cellSize);
     yCoord = floor(playerY / cellSize);
 
    if (grid[yCoord][xCoord] === 0) {
     grid[yCoord][xCoord] = 1;
   }
   
   fill(255);
   rect(playerX,playerY,50,50);
  }

  keyControl() {
  
    if (keyIsDown(DOWN_ARROW)) {
      if(this.yVelocity < 15){
        this.yVelocity += 1;
      }
      this.xVelocity = 0;
    }
  
    if (keyIsDown(RIGHT_ARROW)) {
      this.yVelocity = 0;
      if(this.xVelocity < 15){
        this.xVelocity += 1;
      }
    }
    if (keyIsDown(LEFT_ARROW)) {
      this.yVelocity = 0;
      if(this.xVelocity > -15){
        this.xVelocity -= 1;
      }
    }
    if (keyIsDown(UP_ARROW)) {
      if(this.yVelocity > -15){
        this.yVelocity -= 1;
      }
      this.xVelocity = 0;
    }
  
    else{
      if(this.xVelocity < 0) {
        this.xVelocity += 0.2;
      }else if(this.xVelocity > 0) {
        this.xVelocity -= 0.2;
      }
  
      if(this.yVelocity < 0) {
        this.yVelocity += 0.2;
      }else if(this.yVelocity > 0) {
        this.yVelocity -= 0.2;
      }
    }
  
    this.playerY += this.yVelocity;
    this.playerX += this.xVelocity;
  }
 }

 