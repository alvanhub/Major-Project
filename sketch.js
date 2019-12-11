// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let grid;
let rows = 95;
let cols = 95;
let gridW = 1750;
let pBulletX = 500;
let pBulletY = 500;
let xCoord;
let yCoord;
let player;
let direction = "up";
let gate = "closed";
let playerPositions = [];
let maxPos = 7;
let playerAngle;
let bulletAngle;
let bullets = [];
let yT = 0;
let xT = 0;
let rDifference;
let lDifference;
let uDifference;
let dDifference;







function setup() {
  createCanvas(windowWidth,windowHeight);
  rectMode(CENTER);
  grid = createEmptyGrid(cols, rows);
  player = new Player();
}

function draw() {
  background(255);
  translate(xT,yT);
  displayGrid(grid, rows, cols);
  // keyPressed();
  player.create();
  player.keyControl();
  player.teleport();
  for (let i =0; i < bullets.length; i++) {
    bullets[i].update();
    bullets[i].create();
    bullets[i].gridUpdate();
    if (bullets[i].x < 0 || bullets[i].x > width ||
      bullets[i].y < 0 || bullets[i].y > height) {
        bullets.splice(i, 1);
    }
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
  let cellSize = gridW / cols;
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (grid[y][x] === 0) {
        fill(0);
        stroke(0);
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
        }
        else{
          grid[y][x] = 0;
        }
      }
      if(grid[y][x] === 2) {
          fill(0,255,0);
          stroke(0,255,0);
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
    this.playerX = 500;
    this.playerY = 500;
    this.yVelocity = 0;
    this.xVelocity = 0;
    this.north = this.playerY-200;
    this.south = this.playerY+200;
    this.west = this.playerX-200;
    this.east = this.playerX+200;
   }

   create() {
     let cellSize = gridW/cols;
 
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
   
    
     playerAngle = atan2(mouseY - this.playerY, mouseX - this.playerX);
    // rotate(playerAngle);
   fill(225);
   rect(this.playerX,this.playerY,40,40);
   
   

  }

  keyControl() {
    rDifference = this.playerX + xT;
    lDifference = xT + this.playerX;
    if (keyIsDown(DOWN_ARROW)) {
      if(this.yVelocity < 15){
        this.yVelocity += 1;
      }
      fill(225);
      rect(this.playerX,this.south,40,40);
    }
    else if(this.yVelocity > 0) {
      this.yVelocity -= 1;
    }
  
    if (keyIsDown(RIGHT_ARROW)) {
      if(this.xVelocity < 15){
        this.xVelocity += 1;
      }
      fill(225);
      rect(this.east,this.playerY,40,40);
    }
    else if(this.xVelocity > 0) {
      this.xVelocity -= 1;
    }
    if (keyIsDown(LEFT_ARROW)) {
      if(this.xVelocity > -15){
        this.xVelocity -= 1;
        fill(225);
        rect(this.west,this.playerY,40,40);
      }
    }
    else if(this.xVelocity < 0) {
      this.xVelocity += 1;
    }
    if (keyIsDown(UP_ARROW)) {
      if(this.yVelocity > -15){
        this.yVelocity -= 1;
      }
      fill(225);
      rect(this.playerX,this.north,40,40);
    }
    else if(this.yVelocity < 0) {
      this.yVelocity += 1;
    }
    
  
    this.playerY += this.yVelocity;
    this.south += this.yVelocity;
    this.north += this.yVelocity;
    this.playerX += this.xVelocity;
    pBulletX += this.xVelocity;
    pBulletY += this.yVelocity;
    xT -= this.xVelocity;
    yT -= this.yVelocity;

    if(rDifference > 500) {
      xT -= 2;
    }
    if(lDifference < 500) {
       xT += 2;
     }
     if(xT%2 !== 0) {
       xT += 1;
     }
     if(this.playerX%2 !== 0) {
       this.playerX += 0.5;
     }
     if( this.east%2 !== 0) {
       this.east += 0.5;
     }
     if(mouseIsPressed){
      console.log(xT);
      console.log(this.playerX);
      console.log(lDifference);
    }
    
  }

  teleport() {
    playerPositions.push({x:this.playerX, y:this.playerY});
    if (gate === "open") {
      for (let i = 0; i < playerPositions.length; i += 1) {
        rect(playerPositions[i].x,playerPositions[i].y,40,40);
      }
      if (direction === "up"){
        this.playerY -= 200;
        pBulletY -= 200;
        this.north -= 200;
        this.south -= 200;
      }
      if (direction === "down"){
        this.playerY += 200;
        pBulletY += 200;
        this.north += 200;
        this.south += 200;
      }
      if (direction === "left"){
        this.playerX -= 200;
        pBulletX -= 200;
        this.east -= 200;
        this.west -= 200;
      }
      if (direction === "right"){
        this.playerX += 200;
        pBulletX += 200;
        this.east += 200;
        this.west += 200;
      }
      this.playerY += this.yVelocity;
    this.south += this.yVelocity;
    this.north += this.yVelocity;
    this.playerX += this.xVelocity;
    this.east += this.xVelocity;
    this.west += this.xVelocity;
    pBulletX += this.xVelocity;
    pBulletY += this.yVelocity;
    }
    gate = "closed";

    if (gate === "closed") {
      if (playerPositions.length > maxPos) {
        playerPositions.shift();
      }
    }
  }


 }



 class playerBullet {
   constructor(x,y) {
     this.x = x;
     this.y = y;
     this.speed = 25;
     this.oldX = this.x;
     this.oldY = this.y;

   }

   update() {
     this.x += this.speed*cos(playerAngle);
     this.y += this.speed*sin(playerAngle);
    }
   create() {
     bulletAngle = atan2(mouseY - this.y, mouseX - this.x);
      circle(this.x, this.y,15);
    }

    gridUpdate() {
      let cell = gridW/cols;
      let xPos = floor(this.x/cell);
      let yPos = floor(this.y/cell);
      let oXPos = floor(this.oldX/cell);
      let oYPos = floor(this.oldY/cell);

      if (grid[yPos][xPos]===0){
        grid[yPos][xPos] = 2;
      }
      if(grid[oYPos][oXPos]=== 2) {
        grid[oYPos][oXPos] = 0;
      }

      this.oldX = this.x;
      this.oldY = this.y;
    }

  }

  function changePosition() {

  }

 

 function mousePressed() {
  myB = new playerBullet(pBulletX,pBulletY);
  bullets.push(myB);
  
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
  if (key === 'a') {
    xT += 1;
  }
 }

