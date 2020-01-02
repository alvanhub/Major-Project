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

let levelToL;
let lines;
let levelY;
let levelX;
let levelBackground;

let enemy1;
let enemy11;
let pHit = false;
let eHitY;
let eHitX;
let enemies = [];





function preload() {
  levelToL = "assets/Levels/level.txt";
  lines = loadStrings(levelToL);
  levelBackground = loadImage("assets/BlackholeBackground.jpg_large")
}


function setup() {
  createCanvas(windowWidth,windowHeight);
  levelY = lines.length;
  levelX = lines[0].length;
  rectMode(CENTER);
  grid = createEmptyGrid(cols, rows);
  player = new Player();
  enemy1 = new dashingEnemy(500,900);
  enemy11 = new dashingEnemy(500,1000);
}

function draw() {
  background(levelBackground);
  translate(xT,yT)
  displayGrid(grid, rows, cols);
  inputGrid();

  
  player.create();
  player.gridCheck();
  player.movementControl();
  player.teleport();
  
  for (let i =0; i < bullets.length; i++) {
    bullets[i].create();
    bullets[i].update();
    bullets[i].gridUpdate();
    if (bullets[i].x < 0 || bullets[i].x > 1750 ||
      bullets[i].y < 55 || bullets[i].y > 1695) {
        bullets.splice(i, 1);
    }
    else if (bullets[i].hit === true) {
      bullets.splice(i, 1);
    }
  }
  enemy1.create();
  enemy1.directionalInput();
  enemy1.gridCheck();
  enemy11.create();
  enemy11.directionalInput();
  enemy11.gridCheck();
  
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
        noFill();
        stroke(255);
      }
      if(grid[y][x] === 1) {
          fill(51,171,249);
          stroke(51,171,249);
        }
      if(grid[y][x] === 2) {
          fill(0,255,0);
          stroke(0,255,0);
      }
      if(grid[y][x] === 3) {
        fill(255);
        stroke(255);
      }
      if(grid[y][x] === 4) {
        fill(255);
        stroke(255);
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

function inputGrid() {
  for (let y = 0; y < levelY; y++) {
    for (let x = 0; x < levelX; x++) {
      if (lines[y][x] === '#') {
        grid[y][x] = 0;
      }
      else if(lines[y][x] === 'w') {
        grid[y][x] = 3;
      }
    }
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
    this.shiftD = 200;
    this.brakes = 1;
   }

   create() {
     push();
     translate(this.playerX,this.playerY);
     playerAngle = atan2((mouseY - yT) - this.playerY , (mouseX - xT) - this.playerX);
     rotate(playerAngle);
     fill(225);
     rect(0,0,40,40);
     pop();
    }
    
   gridCheck() {
     let cellSize = gridW/cols;
     let crashX = false;
     let crashY = false;
 
     xCoord = floor(this.playerX/ cellSize);
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
    if (grid[yCoord][xCoord+2]=== 3) {
      this.xVelocity *= -1;
      crashX = true;
    }
    if (grid[yCoord][xCoord-1]=== 3) {
      this.xVelocity *= -1;
      crashX = true;
    }
    if (grid[yCoord-1][xCoord+1]=== 3) {
      this.yVelocity *= -1;
      crashY = true;
    }
    if (grid[yCoord+2][xCoord]=== 3) {
      this.yVelocity *= -1;
      crashY = true;
    }

    if (crashX === true){
      if (this.xVelocity > 0) {
        this.xVelocity += 5;
      }else{
        this.xVelocity -= 5;
      }
    }

    if (crashY === true) {
      if (this.yVelocity > 0) {
        this.yVelocity += 5;
      }else{
        this.yVelocity -= 5;
      }
    }
  }

  movementControl() {

    rDifference = this.playerX + xT;
    lDifference = xT + this.playerX;
    uDifference = this.playerY + yT;
    dDifference = yT + this.playerY;

    if (keyIsDown(DOWN_ARROW)) {
      if(this.yVelocity < 15){
        this.yVelocity += 1;
      }
      push();
      fill(225);
      rect(this.playerX,this.south,40,40);
      pop();
    }
    else if(this.yVelocity > 0) {
      this.yVelocity -= this.brakes;
    }
  
    if (keyIsDown(RIGHT_ARROW)) {
      if(this.xVelocity < 15){
        this.xVelocity += 1;
      }
      push();
      fill(225);
      rect(this.east,this.playerY,40,40);
      pop();
    }
    else if(this.xVelocity > 0) {
      this.xVelocity -= this.brakes;
    }
    if (keyIsDown(LEFT_ARROW)) {
      if(this.xVelocity > -15){
        this.xVelocity -= 1;
      }
      push();
      fill(225);
      rect(this.west,this.playerY,40,40);
      pop();
    }
    else if(this.xVelocity < 0) {
      this.xVelocity += this.brakes;
    }
    if (keyIsDown(UP_ARROW)) {
      if(this.yVelocity > -15){
        this.yVelocity -= 1;
      }
      push();
      fill(225);
      rect(this.playerX,this.north,40,40);
      pop();
    }
    else if(this.yVelocity < 0) {
      this.yVelocity += this.brakes;
    }

    if (pHit === true) {
      this.yVelocity += floor(eHitY/9);
      this.xVelocity += floor(eHitX/9);
      pHit = false;
    }

  
    this.playerY += this.yVelocity;
    this.south += this.yVelocity;
    this.north += this.yVelocity;
    this.playerX += this.xVelocity;
    this.east += this.xVelocity;
    this.west += this.xVelocity
    pBulletX += this.xVelocity;
    pBulletY += this.yVelocity;
    xT -= this.xVelocity;
    yT -= this.yVelocity;
    
     if(rDifference > 520) {
       xT -= 25;
     }
     if(lDifference < 480) {
       xT += 25;
     }
     if(uDifference > 520) {
       yT -= 25;
     }
     if(dDifference < 480) {
       yT += 25;
     }
     
  }

  teleport() {
    let cSize = gridW/cols;
    let dCoord = floor(this.south/cSize);
    let uCoord = floor(this.north/cSize);
    let rCoord = floor(this.east/cSize);
    let lCoord = floor(this.west/cSize);
    
    playerPositions.push({x:this.playerX, y:this.playerY});

    if (gate === "open") {
      for (let i = 0; i < playerPositions.length; i += 1) {
        rect(playerPositions[i].x,playerPositions[i].y,40,40);
      }

      if (direction === "up"){
        if(grid[uCoord][xCoord]===0) {
          if(grid[uCoord+1][xCoord]===0 && grid[uCoord+2][xCoord]===0) {
            if(grid[uCoord-1][xCoord]===0) {
              this.playerY -= this.shiftD;
              pBulletY -= this.shiftD;
              this.north -= this.shiftD;
              this.south -= this.shiftD;
            }else{
              this.playerY -= (this.shiftD-40);
              pBulletY -= (this.shiftD-40);
              this.north -= (this.shiftD-40);
              this.south -= (this.shiftD-40);
            }
          }else{
            this.playerY -= (this.shiftD+60);
            pBulletY -= (this.shiftD+60);
            this.north -= (this.shiftD+60);
            this.south -= (this.shiftD+60);
          }
        }else if(grid[uCoord+1][xCoord]===0) {
          this.playerY -= (this.shiftD-60);
          pBulletY -= (this.shiftD-60);
          this.north -= (this.shiftD-60);
          this.south -= (this.shiftD-60);
        }
      }
      
      
      if (direction === "down"){
        if(grid[dCoord+1][xCoord]===0) {
          if(grid[dCoord][xCoord]===0 && grid[dCoord-1][xCoord]===0) {
            if(grid[dCoord+2][xCoord]===0) {
              this.playerY += this.shiftD;
              pBulletY += this.shiftD;
              this.north += this.shiftD;
              this.south += this.shiftD;
            }else {
              this.playerY += (this.shiftD - 60);
              pBulletY += (this.shiftD - 60);
              this.north += (this.shiftD - 60);
              this.south += (this.shiftD - 60);
            }
          }else {
            this.playerY += (this.shiftD + 60);
            pBulletY += (this.shiftD + 60);
            this.north += (this.shiftD + 60);
            this.south += (this.shiftD + 60);
          }
        }
        else if (grid[dCoord][xCoord]===0) {
          this.playerY += (this.shiftD - 60);
          pBulletY += (this.shiftD - 60);
          this.north += (this.shiftD - 60);
          this.south += (this.shiftD - 60);
        }
      }


      if (direction === "left"){
        if(grid[yCoord][lCoord]===0) {
          if(grid[yCoord][lCoord+1]===0 && grid[yCoord][lCoord+2]===0) {
            if(grid[yCoord][lCoord-1]===0) {
              this.playerX -= this.shiftD;
              pBulletX -= this.shiftD;
              this.east -= this.shiftD;
              this.west -= this.shiftD;
            }else {
              this.playerX -= (this.shiftD - 40);
              pBulletX -= (this.shiftD - 40);
              this.east -= (this.shiftD - 40);
              this.west -= (this.shiftD - 40);
            }
          }else {
            this.playerX -= (this.shiftD + 60);
            pBulletX -= (this.shiftD + 60);
            this.east -= (this.shiftD + 60);
            this.west -= (this.shiftD + 60);
          }
        }
        else if(grid[yCoord][lCoord+1]===0) {
          this.playerX -= (this.shiftD - 60);
          pBulletX -= (this.shiftD - 60);
          this.east -= (this.shiftD - 60);
          this.west -= (this.shiftD - 60);
        }
      }


      if (direction === "right"){
        if(grid[yCoord][rCoord+1]===0){
          if(grid[yCoord][rCoord]===0 && grid[yCoord][rCoord-1]===0) {
            if(grid[yCoord][rCoord+2]===0) {
              this.playerX += this.shiftD;
              pBulletX += this.shiftD;
              this.east += this.shiftD;
              this.west += this.shiftD;
            }else {
              this.playerX += (this.shiftD - 40);
              pBulletX += (this.shiftD - 40);
              this.east += (this.shiftD - 40);
              this.west += (this.shiftD - 40);
            }
          }else{
            this.playerX += (this.shiftD + 60);
            pBulletX += (this.shiftD + 60);
            this.east += (this.shiftD + 60);
            this.west += (this.shiftD + 60);
          }
        }else if (grid[yCoord][rCoord]===0) {
          this.playerX += (this.shiftD - 60);
          pBulletX += (this.shiftD - 60);
          this.east += (this.shiftD - 60);
          this.west += (this.shiftD - 60);
        }
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
   constructor(x,y,hit) {
     this.x = x;
     this.y = y;
     this.hit = hit;
     this.speed = 55;
     this.oldX = this.x;
     this.oldY = this.y;
     this.bulletAngle = atan2((mouseY - yT)- this.y, (mouseX - xT) - this.x);
   }

   update() {
     this.x += this.speed*cos(this.bulletAngle);
     this.y += this.speed*sin(this.bulletAngle);
    }
   create() {
     fill(255);
      circle(this.x, this.y,15);
    }

  gridUpdate() {
      let cell = gridW/cols;
      let xPos = floor(this.x/cell);
      let yPos = floor(this.y/cell);
      // let oXPos = floor(this.oldX/cell);
      // let oYPos = floor(this.oldY/cell);


      if(grid[yPos][xPos]===3){
        this.hit = true;
        grid[yPos][xPos] = 2;
      }
      if(grid[yPos][xPos]===4){
        this.hit = true;
        grid[yPos][xPos] = 2;
      }
      else if (this.y < 55 || this.y > 1695 || this.x < 0 || this.x > 1750) {
        grid[yPos][xPos] = 0;
      }
      else if (grid[yPos][xPos]===0){
        grid[yPos][xPos] = 2;
      }

      
      // if(grid[oYPos][oXPos]=== 2) {
      //   grid[oYPos][oXPos] = 0;
      // }

      // this.oldX = this.x;
      // this.oldY = this.y;
    }

  }
 

 function mousePressed() {
  myB = new playerBullet(pBulletX,pBulletY,false);
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
}


class dashingEnemy {
  constructor(x,y,eHit) {
    this.x = x;
    this.y = y;
    this.speed = 5;
    this.bounce = 20;
    this.move = true;
    this.wait = 700;
    this.first = 0;
    this.isT = true;
    this.eHit = eHit;
    this.targetAngle;
    this.xV;
    this.yV;
    this.bX;
    this.bY;
  }

  create() {
    fill(220);
    stroke(0);
    rect(this.x, this.y, 25, 25);
  }

  directionalInput() {
    this.move = true;
    let celSize = gridW/cols;
    let eY = floor(this.y/celSize);
    let eX = floor(this.x/celSize);

    let xDifferenceF = xCoord - eX;
    let yDifferenceF = yCoord - eY;
    let xDifferenceB = eX - xCoord;
    let yDifferenceB = eY - yCoord;
    
    let dY = abs(pBulletY - this.y);
    let dX = abs(pBulletX - this.x);

    this.targetAngle = atan2(pBulletY - this.y, pBulletX - this.x);

    this.xV = floor(this.speed*cos(this.targetAngle));
    this.yV = floor(this.speed*sin(this.targetAngle));
    this.bX = floor(this.bounce*cos(this.targetAngle));
    this.bY = floor(this.bounce*sin(this.targetAngle));


    eHitX = this.bX;
    eHitY = this.bY;


    if ((xDifferenceF <= 5 && xDifferenceF >= 0) || (xDifferenceB <= 5 && xDifferenceB >= 0)) {
      if((yDifferenceF <= 5 && yDifferenceF >= 0) || (yDifferenceB <= 5 && yDifferenceB >= 0)) {
        this.move = false;
      }
    }

    if (this.move === true) {
      this.isT = true;
      this.x += this.xV;
      this.y += this.yV;
    }else{
      if (this.isT) {
        if (dX < 30 && dY < 30) {
          this.x += 0;
          this.y += 0;
        }else{
          this.x += this.bX;
          this.y += this.bY;
        }
      }else {
        this.x += 0;
        this.y += 0;
      }

      if(millis() > this.first + this.wait) {
        this.isT = !this.isT;
        this.first = millis();
      }
    }
    

    if (grid[eY-1][eX] === 3) {
      if(yCoord > eY) {
        this.speed += 7;
      }else{
        this.speed -= 7;
      }
    }
    if (grid[eY+2][eX] === 3) {
      if (yCoord < eY) {
        this.speed += 7;
      }else{
        this.speed -= 7;
      }
    }
    if (grid[eY][eX] === 3) {
      if (grid[eY-1][eX]===3 || grid[eY+2][eX]===3) {
        this.speed += 7;
      }else {
        this.speed -= 7;
      }
    }
    if (grid[eY][eX+2] === 3) {
      if(xCoord < eX) {
        this.speed += 7;
      }else{
        this.speed -= 7;
      }
    }

    if (grid[eY][eX-1] === 3) {
      if(xCoord > eX) {
        this.speed += 7;
      }else{
        this.speed -= 7;
      }
    }
    
    if (grid[eY][eX-1] === 2 || grid[eY][eX] === 2 || grid[eY-1][eX] === 2 || grid[eY-1][eX+1] === 2 || grid[eY+1][eX] === 2 || 
      grid[eY+2][eX] === 2 || grid[eY+2][eX+1] === 2 || grid[eY][eX+1] === 2 || grid[eY+1][eX+1] === 2 || grid[eY][eX+2] === 2 ||
      grid[eY+1][eX+2] === 2 || grid[eY+1][eX-1] === 2) {
      this.speed -= 13;
    }


    if (this.speed < 5) {
      this.speed += 2;
    }else {
      this.speed -= 2;
    }

  }
  
  gridCheck() {
    let celSize = gridW/cols;
    let eY = floor(this.y/celSize);
    let eX = floor(this.x/celSize);

    if (grid[eY][eX] === 0) {
      grid[eY][eX] = 4;
    }
    if (grid[eY-1][eX] === 0) {
      grid[eY-1][eX] = 4;
    }
    if (grid[eY-1][eX+1] === 0) {
      grid[eY-1][eX+1] = 4;
    }
    if (grid[eY+1][eX] === 0) {
      grid[eY+1][eX] = 4;
    }
    if (grid[eY+2][eX] === 0) {
      grid[eY+2][eX] = 4;
    }
    if (grid[eY+2][eX+1] === 0) {
      grid[eY+2][eX+1] = 4;
    }
    if (grid[eY][eX+1] === 0) {
      grid[eY][eX+1] = 4;
    }
    if (grid[eY+1][eX+1] === 0) {
      grid[eY+1][eX+1] = 4;
    }
    if (grid[eY][eX+2] === 0) {
      grid[eY][eX+2] = 4;
    }
    if (grid[eY+1][eX+2] === 0) {
      grid[eY+1][eX+2] = 4;
    }
    if (grid[eY][eX-1] === 0) {
      grid[eY][eX-1] = 4;
    }
    if (grid[eY+1][eX-1] === 0) {
      grid[eY+1][eX-1] = 4;
    }
    if (grid[eY][eX] === 1) {
      pHit = true;
    }
    if (grid[eY][eX+2] === 0) {
      pHit = true;
    }
    if (grid[eY+1][eX+2] === 0) {
      pHit = true;
    }
    if (grid[eY][eX-1] === 0) {
      pHit = true;
    }
    if (grid[eY+1][eX-1] === 0) {
      pHit = true;
    }
    if (grid[eY-1][eX] === 0) {
      pHit = true;
    }
    if (grid[eY-1][eX+1] === 0) {
      pHit = true;
    }
    if (grid[eY+2][eX] === 0) {
      pHit = true;
    }
    if (grid[eY+2][eX+1] === 0) {
      pHit = true;
    }
    
  }

  
}

