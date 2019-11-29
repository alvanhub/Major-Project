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
let xCoord;
let yCoord;
let player;
let direction = "up";
let gate = "closed";
let playerPositions = [];
let maxPos = 7;




function setup() {
  windowResized();
  rectMode(CENTER);
  grid = createEmptyGrid(cols, rows);
  player = new Player();
}

function draw() {
  background(255);
  displayGrid(grid, rows, cols);
  // keyPressed();
  player.keyControl();
  player.teleport();
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
          || y === yCoord+1 && x === xCoord+1 || y === yCoord+1 && x === xCoord-1 || y === yCoord && x === xCoord+2
          || y === yCoord+1 && x === xCoord+2 || y === yCoord-1 && x === xCoord+1 || y === yCoord-1 && x === xCoord+2
          || y === yCoord+2 && x === xCoord+2 || y === yCoord-1 && x === xCoord || y === yCoord-1 && x === xCoord-1 
          || y === yCoord+2 && x === xCoord-1){
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
    this.north = playerY-200;
    this.south = playerY+200;
    this.west = playerX-200;
    this.east = playerX+200;
    this.shiftX = 100;
    this.shiftY = 100;
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
    if (grid[yCoord+1][xCoord-1] === 0) {
      grid[yCoord+1][xCoord-1] = 1;
    }
    if (grid[yCoord][xCoord+2] === 0) {
      grid[yCoord][xCoord+2] = 1;
    }
    if (grid[yCoord+1][xCoord+2] === 0) {
      grid[yCoord+1][xCoord+2] = 1;
    }
    if (grid[yCoord+2][xCoord+2] === 0) {
      grid[yCoord+2][xCoord+2] = 1;
    }
    if (grid[yCoord-1][xCoord+1] === 0) {
      grid[yCoord-1][xCoord+1] = 1;
    }
    if (grid[yCoord-1][xCoord+2] === 0) {
      grid[yCoord-1][xCoord+2] = 1;
    }
    if (grid[yCoord-1][xCoord] === 0) {
      grid[yCoord-1][xCoord] = 1;
    }
    if (grid[yCoord-1][xCoord-1] === 0) {
      grid[yCoord-1][xCoord-1] = 1;
    }
    if (grid[yCoord+2][xCoord-1] === 0) {
      grid[yCoord+2][xCoord-1] = 1;
    }
   
   fill(225);
   rect(this.playerX,this.playerY,40,40);

  }

  keyControl() {
  
    if (keyIsDown(DOWN_ARROW)) {
      if(this.yVelocity < 15){
        this.yVelocity += 1;
      }
      fill(225);
      rect(this.playerX,this.south,40,40);
    }
  
    if (keyIsDown(RIGHT_ARROW)) {
      if(this.xVelocity < 15){
        this.xVelocity += 1;
      }
      fill(225);
      rect(this.east,this.playerY,40,40);
    }
    if (keyIsDown(LEFT_ARROW)) {
      if(this.xVelocity > -15){
        this.xVelocity -= 1;
        fill(225);
        rect(this.west,this.playerY,40,40);
      }
    }
    if (keyIsDown(UP_ARROW)) {
      if(this.yVelocity > -15){
        this.yVelocity -= 1;
      }
      fill(225);
      rect(this.playerX,this.north,40,40);
      
    }
  
    else{
      if(this.xVelocity < 0) {
        this.xVelocity += 0.5;
      }if(this.xVelocity > 0) {
        this.xVelocity -= 0.5;
      }
      if(this.yVelocity < 0) {
        this.yVelocity += 0.5;
      }if(this.yVelocity > 0) {
        this.yVelocity -= 0.5;
      }
    }
  
    this.playerY += this.yVelocity;
    this.south += this.yVelocity;
    this.north += this.yVelocity;
    this.playerX += this.xVelocity;
    this.east += this.xVelocity;
    this.west += this.xVelocity;
    this.shiftX += this.xVelocity;
    this.shiftY += this.yVelocity;

    console.log(this.playerY);
  }

  teleport() {
    playerPositions.push({x:this.playerX, y:this.playerY});
    if (gate === "open") {
      for (let i = 0; i < playerPositions.length; i += 1) {
        rect(playerPositions[i].x,playerPositions[i].y,40,40);
      }
      if (direction === "up"){
        this.playerY -= 200;
        this.north -= 200;
        this.south -= 200;
      }
      if (direction === "down"){
        this.playerY += 200;
        this.north += 200;
        this.south += 200;
      }
      if (direction === "left"){
        this.playerX -= 200;
        this.east -= 200;
        this.west -= 200;
      }
      if (direction === "right"){
        this.playerX += 200;
        this.east += 200;
        this.west += 200;
      }
    }
    gate = "closed";

    if (gate === "closed") {
    if (playerPositions.length > maxPos) {
      playerPositions.shift();
    }
    }
  }

 }

 
 function keyPressed() {
   if (keyCode === UP_ARROW) {
     direction = "up";
   }
   if (keyCode === DOWN_ARROW) {
    direction = "down";
  }
  if (keyCode === RIGHT_ARROW) {
    direction = "right";
  }
  if (keyCode === LEFT_ARROW) {
    direction = "left";
  }
   if(keyCode === SHIFT){
    gate = "open"
  }
 }