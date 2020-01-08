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
let spawnPoints = [500,1300];

let gameStatus = "menu";

let reload = false;

let wave = 1;
let waveKills = 5;
let currentKills = 0;
let spawnrate = 2000;





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
  }else if(gameStatus === 'options') {
    optionsMenu();
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
  else if(gameStatus === 'survival') {
    survivalMode();
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
    this.maxSpeed = 5;
    this.shiftD = 270;
    this.brakes = 1;
    this.health = 800;
    this.barX = windowWidth/2 - 400;
    this.barY = windowHeight - 30;
    this.shiftCoolDown = 700;
    this.bulletCoolDown = 700;
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
      if(this.yVelocity < this.maxSpeed){
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
      if(this.xVelocity < this.maxSpeed){
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
      if(this.xVelocity > -this.maxSpeed){
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
      if(this.yVelocity > -this.maxSpeed){
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
        if((this.yVelocity <= this.maxSpeed && this.yVelocity >= 0) || (this.yVelocity >= -this.maxSpeed && this.yVelocity <= 0) ){
          this.yVelocity += floor(eHitY/2);
        }
        if((this.xVelocity <= this.maxSpeed && this.xVelocity >= 0) || (this.xVelocity >= -this.maxSpeed && this.xVelocity <= 0) ){
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
    fill(255,140,0);
    rect(this.barX,this.barY,this.health,30);
    pop();

    push();
    rectMode(CORNER);
    noFill();
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

    push();
    rectMode(CORNER);
    fill(255,255,0);
    rect(this.barX+40,this.barY-40,this.bulletCoolDown,15);
    pop();

    push();
    rectMode(CORNER);
    noFill();
    stroke(0);
    strokeWeight(5);
    rect(this.barX+40,this.barY-40,700,15);
    pop();

    if(gameStatus === 'practice') {
      if(this.health < 800) {
        this.health += 10;
      }
      if(this.bulletCoolDown <= 0) {
        reload = true;
      }

      if (reload === false) {
        if(this.bulletCoolDown < 700) {
          this.bulletCoolDown++;
        }
        if(mouseIsPressed) {
          this.bulletCoolDown -= 10;
        }
      }else if(reload === true) {
        if (this.bulletCoolDown < 695) {
          this.bulletCoolDown += 5;
        }else {
          reload = false;
        }
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
   if(reload === false) {
    if(gameStatus === 'practice' || gameStatus === 'survival') {
      myB = new playerBullet(pBulletX,pBulletY,false);
      bullets.push(myB);
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
  if(key === 'a'){
    if(gameStatus === 'practice') {
      let enemy1 = new dashingEnemy(random(spawnPoints),random(spawnPoints),5);
      enemies.push(enemy1);
    }
  }
}


class dashingEnemy {
  constructor(x,y,health) {
    this.x = x;
    this.y = y;
    this.health = health;
    this.speed = 10;
    this.bounce = 20;
    this.move = true;
    this.wait = 1000;
    this.first = 0;
    this.isT = true;
    this.charge = false;
    this.targetAngle;
    this.extendedAngle;
    this.xPoint;
    this.yPoint;
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

    let xDifference = abs(xCoord - eX);
    let yDifference = abs(yCoord - eY);

    this.targetAngle = atan2(pBulletY - this.y, pBulletX - this.x);

    this.xV = floor(this.speed*cos(this.targetAngle));
    this.yV = floor(this.speed*sin(this.targetAngle));

    let dX = abs(this.x - this.xPoint);
    let dY = abs(this.y - this.yPoint);
    
    eHitX = this.bX;
    eHitY = this.bY;

    if(this.isT) {
      this.x += this.xV;
      this.y += this.yV;
      if(eX < xCoord-2) {
        this.xPoint = pBulletX + 300;
      }else if(eX > xCoord + 2){
        this.xPoint = pBulletX - 300;
      }else{
        this.xPoint = pBulletX;
      }
  
      if(eY < yCoord-2) {
        this.yPoint = pBulletY + 300;
      }else if(eY > yCoord + 2){
        this.yPoint = pBulletY - 300;
      }else{
        this.yPoint = pBulletY;
      }
      
      if (xDifference < 6 && yDifference < 6) {
          this.charge = true;
          this.isT = false;
        }
    }


    if(this.charge) {
      if(this.wait >= 200) {
        this.wait -= 50;
      }else if(this.wait > 0) {
        if (grid[eY][eX-1] === 3 || grid[eY][eX] === 3 || grid[eY-1][eX] === 3 || grid[eY-1][eX+1] === 3 || grid[eY+1][eX] === 3 || 
          grid[eY+2][eX] === 3 || grid[eY+2][eX+1] === 3 || grid[eY][eX+1] === 3 || grid[eY+1][eX+1] === 3 || grid[eY][eX+2] === 3 ||
          grid[eY+1][eX+2] === 3 || grid[eY+1][eX-1] === 3) {
          this.speed -= 5;
          this.isT = true;
          this.wait = 1000;
          this.charge = false;
        }

        this.extendedAngle = atan2(this.yPoint - this.y, this.xPoint - this.x);

        if(dX > 30 || dY > 30) {
          this.bX = floor(this.bounce*cos(this.extendedAngle));
          this.bY = floor(this.bounce*sin(this.extendedAngle));
        }

        this.x += this.bX;
        this.y += this.bY;
        this.wait -= 5;
      }else{
        this.isT = true;
        this.wait = 1000
        this.charge = false;
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
      this.speed -= 17;
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

function survivalMode() {
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

function optionsMenu() {
  background(180);
  textAlign(LEFT);
  textSize(35);
  fill(0);
  text("Controls",width/2-600,height/2-300);
  textAlign(RIGHT);
  textSize(30);
  fill(0);
  text("Move Up - Up Arrow",width/2-400,height/2-225);
  textAlign(RIGHT);
  textSize(30);
  fill(0);
  text("Move Down - Down Arrow",width/2-325,height/2-150);
  textAlign(RIGHT);
  textSize(30);
  fill(0);
  text("Move Right - Right Arrow",width/2-340,height/2-75);
  textAlign(RIGHT);
  textSize(30);
  fill(0);
  text("Move Left - Left Arrow",width/2-380,height/2);
  textAlign(RIGHT);
  textSize(30);
  fill(0);
  text("Shoot - Left Click",width/2-447,height/2+75);
  textAlign(RIGHT);
  textSize(30);
  fill(0);
  text("Dash - Shift",width/2-520,height/2+150);
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
      }else if(mouseX > width/2 + 100 && mouseX < width/2 + 500 && mouseY > height/2 - 175 && mouseY < height/2 - 25){
        gameStatus = 'options'
      }
    }
    else if (gameStatus === 'gamemodes') {
      if (mouseX > width/2 + 100 && mouseX < width/2 + 500 && mouseY > height/2 - 175 && mouseY < height/2 - 25) {
        gameStatus = 'practice';
       }
       
    }
  }
}
