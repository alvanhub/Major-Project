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
        if (y === yCoord && x === xCoord || y === yCoord+1 && x === xCoord || y === yCoord+2 && x === xCoord 
          || y === yCoord && x === xCoord+1 || y === yCoord && x === xCoord-1 || y === yCoord+2 && x === xCoord+1
          || y === yCoord+1 && x === xCoord+1){
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



 

 class Player {
   constructor() {
    this.playerX = 100;
    this.playerY = 100;
    this.yVelocity = 0;
    this.xVelocity = 0;
   }

   create() {
     let cellSize = width/cols;
 
     xCoord = floor(this.playerX / cellSize);
     yCoord = floor(this.playerY / cellSize);
     
     if (grid[yCoord][xCoord] === 0) {
       grid[yCoord][xCoord] = 1;
     }
     if (grid[yCoord+1][xCoord] === 0) {
      grid[yCoord+1][xCoord] = 1;
    }
    if (grid[yCoord+2][xCoord] === 0) {
      grid[yCoord+2][xCoord] = 1;
    }
    if (grid[yCoord+2][xCoord+1] === 0) {
      grid[yCoord+2][xCoord+1] = 1;
    }
    if (grid[yCoord+1][xCoord+1] === 0) {
      grid[yCoord+1][xCoord+1] = 1;
    }
    if (grid[yCoord][xCoord+1] === 0) {
      grid[yCoord][xCoord+1] = 1;
    }
    if (grid[yCoord][xCoord-1] === 0) {
      grid[yCoord][xCoord-1] = 1;
    }
   
   noFill();
   rect(this.playerX,this.playerY,35,35);
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
      }
      
      if(this.yVelocity < 0) {
        this.yVelocity += 0.2;
      }
      this.yVelocity -= 0.2;
      this.xVelocity -= 0.2;
    }
  
    this.playerY += this.yVelocity;
    this.playerX += this.xVelocity;
  }
 }

 