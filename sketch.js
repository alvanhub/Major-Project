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

let pBulletX = 650;
let pBulletY = 400;
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

let PracticeModeTXT;
let PModeLines;
let levelY;
let levelX;
let levelBackground;

let pHit = false;
let eHitY;
let eHitX;
let enemies = [];

let gameStatus = "menu";





function preload() {
  PracticeModeTXT = "assets/Levels/level.txt";
  PModeLines = loadStrings(PracticeModeTXT);
  levelBackground = loadImage("assets/BlackholeBackground.jpg_large")
}


function setup() {
  createCanvas(windowWidth,windowHeight);
  levelY = PModeLines.length;
  levelX = PModeLines[0].length;
  rectMode(CENTER);
  grid = createEmptyGrid(cols, rows);
  player = new Player();

}

function draw() {
  if(gameStatus === 'menu') {
    background(0);
    playButton();
    optionsButton();
    mouseCheck();
  }
  else if (gameStatus === 'gamemodes') {
    background(0);
    practiceButton();
    survivalButton();
    mouseCheck();
  }
  else if(gameStatus === 'practice') {
    practiceMode();
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
      if (PModeLines[y][x] === '#') {
        grid[y][x] = 0;
      }
      else if(PModeLines[y][x] === 'w') {
        grid[y][x] = 3;
      }
    }
  }
}

 

 class Player {
   constructor() {
    this.playerX = 650;
    this.playerY = 400;
    this.yVelocity = 0;
    this.xVelocity = 0;
    this.north = this.playerY-270;
    this.south = this.playerY+270;
    this.west = this.playerX-270;
    this.east = this.playerX+270;
    this.shiftD = 270;
    this.brakes = 1;
    this.health = 800;
    this.barX = windowWidth/2 - 400;
    this.barY = windowHeight - 30;
    this.shiftCoolDown = 700;
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
      if(this.yVelocity < 10){
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
      if(this.xVelocity < 10){
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
      if(this.xVelocity > -10){
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
      if(this.yVelocity > -10){
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
      if(gate === 'closed') {
        if((this.yVelocity <= 10 && this.yVelocity >= 0) || (this.yVelocity >= -10 && this.yVelocity <= 0) ){
          this.yVelocity += floor(eHitY/2);
        }
        if((this.xVelocity <= 10 && this.xVelocity >= 0) || (this.xVelocity >= -10 && this.xVelocity <= 0) ){
          this.xVelocity += floor(eHitX/2);
        }
      }
      this.health -= 10;
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
    this.barX += this.xVelocity;
    this.barY += this.yVelocity;
    
     if(rDifference > 670) {
       xT -= 35;
       this.barX += 35;
     }
     if(lDifference < 630) {
       xT += 35;
       this.barX -= 35;
     }
     if(uDifference > 420) {
       yT -= 35;
       this.barY += 35;
     }
     if(dDifference < 380) {
       yT += 35;
       this.barY -= 35;
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

      if(this.shiftCoolDown >= 100) {
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
      }

    this.playerY += this.yVelocity;
    this.south += this.yVelocity;
    this.north += this.yVelocity;
    this.playerX += this.xVelocity;
    this.east += this.xVelocity;
    this.west += this.xVelocity;
    pBulletX += this.xVelocity;
    pBulletY += this.yVelocity;

      if(this.shiftCoolDown >= 100) { 
        this.shiftCoolDown -= 100;
      }
    }

    gate = "closed";
    
    if(this.shiftCoolDown < 700) {
      this.shiftCoolDown += 1;
    }
    console.log(this.shiftCoolDown);


    if (gate === "closed") {
      if (playerPositions.length > maxPos) {
        playerPositions.shift();
      }
    }
  }

  playerStats() {
    push();
    rectMode(CORNER);
    fill(255,0,0);
    rect(this.barX,this.barY,800,30);
    pop();

    push();
    rectMode(CORNER);
    fill(255,255,0);
    rect(this.barX,this.barY,this.health,30);
    pop();

    push();
    rectMode(CORNER);
    fill(0,0,0,255);
    stroke(0);
    strokeWeight(5);
    rect(this.barX,this.barY,800,30);
    pop();

    push();
    rectMode(CORNER);
    fill(0,255,255);
    rect(this.barX+40,this.barY-20,this.shiftCoolDown,15);
    pop();

    push();
    rectMode(CORNER);
    noFill();
    stroke(0);
    strokeWeight(5);
    rect(this.barX+40,this.barY-20,100,15);
    pop();

    push();
    rectMode(CORNER);
    noFill();
    stroke(0);
    strokeWeight(5);
    rect(this.barX+140,this.barY-20,100,15);
    pop();

    push();
    rectMode(CORNER);
    noFill();
    stroke(0);
    strokeWeight(5);
    rect(this.barX+240,this.barY-20,100,15);
    pop();

    push();
    rectMode(CORNER);
    noFill();
    stroke(0);
    strokeWeight(5);
    rect(this.barX+340,this.barY-20,100,15);
    pop();

    push();
    rectMode(CORNER);
    noFill();
    stroke(0);
    strokeWeight(5);
    rect(this.barX+440,this.barY-20,100,15);
    pop();

    push();
    rectMode(CORNER);
    noFill();
    stroke(0);
    strokeWeight(5);
    rect(this.barX+540,this.barY-20,100,15);
    pop();

    push();
    rectMode(CORNER);
    noFill();
    stroke(0);
    strokeWeight(5);
    rect(this.barX+640,this.barY-20,100,15);
    pop();

    if(gameStatus === 'practice') {
      if(this.health < 800) {
        this.health += 10;
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
   if(gameStatus === 'practice') {
    myB = new playerBullet(pBulletX,pBulletY,false);
    bullets.push(myB);
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
  if(key === 'a'){
    let enemy1 = new dashingEnemy(500,900,5);
    enemies.push(enemy1);
  }
}


class dashingEnemy {
  constructor(x,y,health) {
    this.x = x;
    this.y = y;
    this.health = health;
    this.speed = 5;
    this.bounce = 20;
    this.move = true;
    this.wait = 600;
    this.first = 0;
    this.isT = true;
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


    if ((xDifferenceF <= 6 && xDifferenceF >= 0) || (xDifferenceB <= 6 && xDifferenceB >= 0)) {
      if((yDifferenceF <= 6 && yDifferenceF >= 0) || (yDifferenceB <= 6 && yDifferenceB >= 0)) {
        this.move = false;
      }
    }

    if (this.move === true) {
      this.isT = true;
      this.x += this.xV;
      this.y += this.yV;
    }else{
      if (this.isT) {
        if (dX < 27 && dY < 27) {
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
      this.health--;
    }

   

    if (this.speed < 5) {
      this.speed += 2;
    }else {
      this.speed -= 2;
    }

    if(this.speed <= -20) {
      this.speed = 0;
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
    if (grid[eY][eX+2] === 1) {
      pHit = true;
    }
    if (grid[eY+1][eX+2] === 1) {
      pHit = true;
    }
    if (grid[eY][eX-1] === 1) {
      pHit = true;
    }
    if (grid[eY+1][eX-1] === 1) {
      pHit = true;
    }
    if (grid[eY-1][eX] === 1) {
      pHit = true;
    }
    if (grid[eY-1][eX+1] === 1) {
      pHit = true;
    }
    if (grid[eY+2][eX] === 1) {
      pHit = true;
    }
    if (grid[eY+2][eX+1] === 1) {
      pHit = true;
    }

    
  }
}

function practiceMode() {
  background(levelBackground);
  translate(xT,yT);
  displayGrid(grid, rows, cols);
  inputGrid();

  
  player.create();
  player.playerStats();
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
  
  for (let j = 0; j < enemies.length; j++) {
    enemies[j].create();
    enemies[j].directionalInput();
    enemies[j].gridCheck();
    if(enemies[j].health <= 0) {
      enemies.splice(j,1);
    }
  }
}

function playButton() {
  rectMode(CENTER);
  fill(255);
  rect(width/2 - 300, height/2 - 100, 400, 150);
  textAlign(CENTER,CENTER);
  textSize(50);
  fill(0);
  text("Play",width/2-300,height/2-100);
}

function optionsButton() {
  rectMode(CENTER);
  fill(255);
  rect(width/2 + 300, height/2 - 100, 400, 150);
  textAlign(CENTER,CENTER);
  textSize(50);
  fill(0);
  text("Options",width/2+300,height/2-100);
}

function practiceButton() {
  rectMode(CENTER);
  fill(255);
  rect(width/2 + 300, height/2 - 100, 400, 150);
  textAlign(CENTER,CENTER);
  textSize(50);
  fill(0);
  text("practice",width/2+300,height/2-100);
}

function survivalButton() {
  rectMode(CENTER);
  fill(255);
  rect(width/2 - 300, height/2 - 100, 400, 150);
  textAlign(CENTER,CENTER);
  textSize(50);
  fill(0);
  text("Survival",width/2-300,height/2-100);
}

function mouseCheck() {
  if (mouseIsPressed) {
    if (gameStatus === 'menu') {
      if (mouseX > width/2 - 500 && mouseX < width/2 - 100 && mouseY > height/2 - 175 && mouseY < height/2 - 25) {
        gameStatus = 'gamemodes';
      }
    }
    else if (gameStatus === 'gamemodes') {
      if (mouseX > width/2 + 100 && mouseX < width/2 + 500 && mouseY > height/2 - 175 && mouseY < height/2 - 25) {
        gameStatus = 'practice';
      }
    }
  }
}
