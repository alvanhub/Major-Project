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
let playerSprite;
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
let pModeLines;
let levelY;
let levelX;
let BlackholeBackground;
let megaManBackground;
let b1;
let b2;
let b3;
let b4;
let b5;
let b6;
let b7;
let b8;
let b9;
let b10;
let b11;
let b12;
let b13;
let b14;
let b15;
let b16;
let b17;
let b18;
let b19;
let b20;
let b21;
let b22;
let b23;
let b24;
let b25;
let b26;
let b27;
let b28;
let b29;
let b30;
let b31;
let b32;
let b33;
let b34;
let b35;
let b36;
let b37;
let b38;
let b39;

let pHit = false;
let eHitY;
let eHitX;
let enemies = [];
let dEnemySprite;
let spawnPoints = [500,1300];

let gameStatus = "menu";

let reload = false;

let wave = 1;
let waveKills = 5;
let currentKills = 0;
let totalKills = 0;
let spawnRate = 2000;
let spawnEnemy = true;
let eTimer = 0;

let enemyInfoGrid;
let eCols = 7;
let eRows = 4;
let eGridSize = 320;





function preload() {
  PracticeModeTXT = "assets/Levels/level0.txt";
  pModeLines = loadStrings(PracticeModeTXT);
  BlackholeBackground = loadImage("assets/BlackholeBackground.jpg_large");
  megaManBackground = loadImage("assets/shmup_stage/MegaManBackground.PNG");

  b1 = loadImage("assets/shmup_stage/block1.PNG");
  b2 = loadImage("assets/shmup_stage/block2.PNG");
  b3 = loadImage("assets/shmup_stage/block3.PNG");
  b4 = loadImage("assets/shmup_stage/block4.PNG");
  b5 = loadImage("assets/shmup_stage/block5.PNG");
  b6 = loadImage("assets/shmup_stage/block6.PNG");
  b7 = loadImage("assets/shmup_stage/block7.PNG");
  b8 = loadImage("assets/shmup_stage/block8.PNG");
  b9 = loadImage("assets/shmup_stage/block9.PNG");
  b10 = loadImage("assets/shmup_stage/block10.PNG");
  b11 = loadImage("assets/shmup_stage/block11.PNG");
  b12 = loadImage("assets/shmup_stage/block12.PNG");
  b13 = loadImage("assets/shmup_stage/block13.PNG");
  b14 = loadImage("assets/shmup_stage/block14.PNG");
  b15 = loadImage("assets/shmup_stage/block15.PNG");
  b16 = loadImage("assets/shmup_stage/block16.PNG");
  b17 = loadImage("assets/shmup_stage/block17.PNG");
  b18 = loadImage("assets/shmup_stage/block18.PNG");
  b19 = loadImage("assets/shmup_stage/block19.PNG");
  b20 = loadImage("assets/shmup_stage/block20.PNG");
  b21 = loadImage("assets/shmup_stage/block21.PNG");
  b22 = loadImage("assets/shmup_stage/block22.PNG");
  b23 = loadImage("assets/shmup_stage/block23.PNG");
  b24 = loadImage("assets/shmup_stage/block24.PNG");
  b25 = loadImage("assets/shmup_stage/block25.PNG");
  b26 = loadImage("assets/shmup_stage/block26.PNG");
  b27 = loadImage("assets/shmup_stage/block27.PNG");
  b28 = loadImage("assets/shmup_stage/block28.PNG");
  b29 = loadImage("assets/shmup_stage/block29.PNG");
  b30 = loadImage("assets/shmup_stage/block30.PNG");
  b31 = loadImage("assets/shmup_stage/block31.PNG");
  b32 = loadImage("assets/shmup_stage/block32.PNG");
  b33 = loadImage("assets/shmup_stage/block33.PNG");
  b34 = loadImage("assets/shmup_stage/block34.PNG");
  b35 = loadImage("assets/shmup_stage/block35.PNG");
  b36 = loadImage("assets/shmup_stage/block36.PNG");
  b37 = loadImage("assets/shmup_stage/block37.PNG");
  b38 = loadImage("assets/shmup_stage/block38.PNG");
  b39 = loadImage("assets/shmup_stage/block39.PNG");


  dEnemySprite = loadImage("assets/dashingEnemySprite.png");
  playerSprite = loadImage("assets/spaceship_small_blue.png");
}


function setup() {
  createCanvas(windowWidth,windowHeight);
  levelY = pModeLines.length;
  levelX = pModeLines[0].length;
  rectMode(CENTER);
  grid = createEmptyGrid(cols, rows);
  enemyInfoGrid = createEnemyGrid(eCols, eRows);
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
  else if(gameStatus = 'dead') {
    deathMenu(); 
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

function createEnemyGrid() {
  let emptyGrid = [];
  for (let x = 0; x < eCols; x++) {
    emptyGrid.push([]);
    for (let y = 0; y < eRows; y++) {
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

function displayLevelBlocks(grid, rows, cols) {
  let cellSize = gridW / cols;
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (grid[y][x] === 3) {
        if(pModeLines[y][x]==='1') {
          push();
          imageMode(CENTER);
          image(b1,x*cellSize,y*cellSize,cellSize,cellSize);
          pop();
        }
        else if(pModeLines[y][x]==='q') {
          push();
          imageMode(CENTER);
          image(b26,x*cellSize,y*cellSize,cellSize,cellSize);
          pop();
        }
        else if(pModeLines[y][x]==='r') {
          push();
          imageMode(CENTER);
          image(b27,x*cellSize,y*cellSize,cellSize,cellSize);
          pop();
        }
        else if(pModeLines[y][x]==='e') {
          push();
          imageMode(CENTER);
          image(b14,x*cellSize,y*cellSize,cellSize,cellSize);
          pop();
        }
        else if(pModeLines[y][x]==='j') {
          push();
          imageMode(CENTER);
          image(b19,x*cellSize,y*cellSize,cellSize,cellSize);
          pop();
        }
        else if(pModeLines[y][x]==='3') {
          push();
          imageMode(CENTER);
          image(b3,x*cellSize,y*cellSize,cellSize,cellSize);
          pop();
        }
        else if(pModeLines[y][x]==='6') {
          push();
          imageMode(CENTER);
          image(b6,x*cellSize,y*cellSize,cellSize,cellSize);
          pop();
        }
        else if(pModeLines[y][x]==='f') {
          push();
          imageMode(CENTER);
          image(b15,x*cellSize,y*cellSize,cellSize,cellSize);
          pop();
        }
        else if(pModeLines[y][x]==='l') {
          push();
          imageMode(CENTER);
          image(b21,x*cellSize,y*cellSize,cellSize,cellSize);
          pop();
        }
        else if(pModeLines[y][x]==='B') {
          push();
          imageMode(CENTER);
          image(b37,x*cellSize,y*cellSize,cellSize,cellSize);
          pop();
        }
        else if(pModeLines[y][x]==='C') {
          push();
          imageMode(CENTER);
          image(b38,x*cellSize,y*cellSize,cellSize,cellSize);
          pop();
        }
        else if(pModeLines[y][x]==='D') {
          push();
          imageMode(CENTER);
          image(b39,x*cellSize,y*cellSize,cellSize,cellSize);
          pop();
        }
        else{
          push();
          fill(255);
          noStroke();
          rect(x*cellSize, y*cellSize, cellSize, cellSize);
          pop();
        }
      }
    }
  }
}

function displayInfoGrid(grid, rows, cols) {
  let cellSize = eGridSize / rows;
  for (let y = 0; y < cols; y++) {
    for (let x = 0; x < rows; x++) {
      if (grid[y][x] === 0) {
        noFill();
        stroke(0);
      }
      if(grid[y][x]===1) {
        noFill();
        stroke(0);
        push();
        imageMode(CENTER);
        image(dEnemySprite, x*cellSize+width-380, y*cellSize+200, cellSize, cellSize);
        pop();
      }
      rect(x*cellSize+width-380, y*cellSize+200, cellSize, cellSize);
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
      if (pModeLines[y][x] === '#') {
        grid[y][x] = 0;
      }
      else{
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
     angleMode(RADIANS);
     playerAngle = atan2((mouseY - yT) - this.playerY , (mouseX - xT) - this.playerX);
     rotate(playerAngle);
     angleMode(DEGREES);
     rotate(90);
     fill(225);
     imageMode(CENTER);
     image(playerSprite,0,0,60,60);
     pop();
    }
    
   gridCheck() {
     let cellSize = gridW/cols;
     let crashX = false;
     let crashY = false;
 
     xCoord = floor(this.playerX/ cellSize);
     yCoord = floor(this.playerY / cellSize);

     if( (yCoord <= 32 && yCoord >= 22 && xCoord <= 32 && xCoord >= 22) || (yCoord >= 65 && yCoord <= 75 && xCoord <= 32 && xCoord >= 22) 
          || (yCoord >= 65 && yCoord <= 75 && xCoord >= 65 && xCoord <= 75) || (yCoord <= 32 && yCoord >= 22 && xCoord >= 65 && xCoord <= 75) ) {
            spawnEnemy = false;
     }

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

    if (keyIsDown(83)) {
      if(this.yVelocity < this.maxSpeed){
        this.yVelocity += 1;
      }
      push();
      fill(225);
      if(keyIsDown(68)) {
        rect(this.east,this.south,40,40);
      }
      else if(keyIsDown(65)) {
        rect(this.west,this.south,40,40);
      }else{
        rect(this.playerX,this.south,40,40);
      }
      pop();
    }
    else if(this.yVelocity > 0) {
      this.yVelocity -= this.brakes;
    }
  
    if (keyIsDown(68)) {
      if(this.xVelocity < this.maxSpeed){
        this.xVelocity += 1;
      }
      push();
      fill(225);
      if(keyIsDown(83)) {
        rect(this.east,this.south,40,40);
      }
      else if(keyIsDown(87)) {
        rect(this.east,this.north,40,40);
      }else{
        rect(this.east,this.playerY,40,40);
      }
      pop();
    }
    else if(this.xVelocity > 0) {
      this.xVelocity -= this.brakes;
    }

    if (keyIsDown(65)) {
      if(this.xVelocity > -this.maxSpeed){
        this.xVelocity -= 1;
      }
      push();
      fill(225);
      if(keyIsDown(83)) {
        rect(this.west,this.south,40,40);
      }
      else if(keyIsDown(87)) {
        rect(this.west,this.north,40,40);
      }else{
        rect(this.west,this.playerY,40,40);
      }
      pop();
    }
    else if(this.xVelocity < 0) {
      this.xVelocity += this.brakes;
    }

    if (keyIsDown(87)) {
      if(this.yVelocity > -this.maxSpeed){
        this.yVelocity -= 1;
      }
      push();
      fill(225);
      if(keyIsDown(68)) {
        rect(this.east,this.north,40,40);
      }
      else if(keyIsDown(65)) {
        rect(this.west,this.north,40,40);
      }else{
        rect(this.playerX,this.north,40,40);
      }
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
    let shiftDid = true;

    
    playerPositions.push({x:this.playerX, y:this.playerY});

    if (gate === "open") {
      // for (let i = 0; i < playerPositions.length; i += 1) {
      //   rect(playerPositions[i].x,playerPositions[i].y,40,40);
      // }
      push();
      beginShape();
      strokeWeight(10);
      stroke(255);
      vertex(this.playerX,this.playerY);

      if(this.shiftCoolDown >= 100) {
        if (direction === "up"){
          if(yCoord <= 14) {
            gate = 'closed';
            shiftDid = false;
          }
          else if(grid[uCoord][xCoord]===0) {
            if(grid[uCoord+1][xCoord]===0 && grid[uCoord+2][xCoord]===0) {
              if(grid[uCoord-1][xCoord]===0) {
                this.playerY -= this.shiftD;
                pBulletY -= this.shiftD;
                this.north -= this.shiftD;
                this.south -= this.shiftD;
              }else{
                this.playerY -= (this.shiftD-60);
                pBulletY -= (this.shiftD-60);
                this.north -= (this.shiftD-60);
                this.south -= (this.shiftD-60);
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
          }else{
            shiftDid = false;
          }
        }
        
        
        if (direction === "down"){
          if(yCoord >= 79) {
            gate = 'closed';
            shiftDid = false;
          }
          else if(grid[dCoord+1][xCoord]===0) {
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
          }else{
            shiftDid = false;
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
                this.playerX -= (this.shiftD - 60);
                pBulletX -= (this.shiftD - 60);
                this.east -= (this.shiftD - 60);
                this.west -= (this.shiftD - 60);
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
          }else{
            shiftDid = false;
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
                this.playerX += (this.shiftD - 60);
                pBulletX += (this.shiftD - 60);
                this.east += (this.shiftD - 60);
                this.west += (this.shiftD - 60);
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
          }else{
            shiftDid = false;
          }
        }

        if(direction === 'up-right') {
          if(yCoord <= 14) {
            gate = 'closed';
            shiftDid = false;
          }
          else if(grid[uCoord][rCoord+1]===0) {
            if(grid[uCoord+1][rCoord]===0 && grid[uCoord+2][rCoord-1]===0) {
              if(grid[uCoord-1][rCoord+2]===0) {
                this.playerY -= this.shiftD;
                pBulletY -= this.shiftD;
                this.north -= this.shiftD;
                this.south -= this.shiftD;
                this.playerX += this.shiftD;
                pBulletX += this.shiftD;
                this.east += this.shiftD;
                this.west += this.shiftD;
              }else{
                this.playerY -= (this.shiftD - 60);
                pBulletY -= (this.shiftD - 60);
                this.north -= (this.shiftD - 60);
                this.south -= (this.shiftD - 60);
                this.playerX += (this.shiftD - 60);
                pBulletX += (this.shiftD - 60);
                this.east += (this.shiftD - 60);
                this.west += (this.shiftD - 60);
              }
            }else{
              this.playerY -= (this.shiftD + 60);
              pBulletY -= (this.shiftD + 60);
              this.north -= (this.shiftD + 60);
              this.south -= (this.shiftD + 60);
              this.playerX += (this.shiftD + 60);
              pBulletX += (this.shiftD + 60);
              this.east += (this.shiftD + 60);
              this.west += (this.shiftD + 60);
            }
          }else if(grid[uCoord+1][rCoord]===0) {
            this.playerY -= (this.shiftD - 60);
            pBulletY -= (this.shiftD - 60);
            this.north -= (this.shiftD - 60);
            this.south -= (this.shiftD - 60);
            this.playerX += (this.shiftD - 60);
            pBulletX += (this.shiftD - 60);
            this.east += (this.shiftD - 60);
            this.west += (this.shiftD - 60);
          }
        }

        if(direction === 'up-left') {
          if(yCoord <= 14) {
            gate = 'closed';
            shiftDid = false;
          }
          else if(grid[uCoord][lCoord]===0) {
            if(grid[uCoord+1][lCoord+1]===0 && grid[uCoord+2][lCoord+2]===0) {
              if(grid[uCoord-1][lCoord-1]===0) {
                this.playerY -= this.shiftD;
                pBulletY -= this.shiftD;
                this.north -= this.shiftD;
                this.south -= this.shiftD;
                this.playerX -= this.shiftD;
                pBulletX -= this.shiftD;
                this.east -= this.shiftD;
                this.west -= this.shiftD;
              }else{
                this.playerY -= (this.shiftD - 60);
                pBulletY -= (this.shiftD - 60);
                this.north -= (this.shiftD - 60);
                this.south -= (this.shiftD - 60);
                this.playerX -= (this.shiftD - 60);
                pBulletX -= (this.shiftD - 60);
                this.east -= (this.shiftD - 60);
                this.west -= (this.shiftD - 60);
              }
            }else{
              this.playerY -= (this.shiftD + 60);
              pBulletY -= (this.shiftD + 60);
              this.north -= (this.shiftD + 60);
              this.south -= (this.shiftD + 60);
              this.playerX -= (this.shiftD + 60);
              pBulletX -= (this.shiftD + 60);
              this.east -= (this.shiftD + 60);
              this.west -= (this.shiftD + 60);
            }
          }else if(grid[uCoord+1][lCoord+1]===0) {
            this.playerY -= (this.shiftD - 60);
            pBulletY -= (this.shiftD - 60);
            this.north -= (this.shiftD - 60);
            this.south -= (this.shiftD - 60);
            this.playerX -= (this.shiftD - 60);
            pBulletX -= (this.shiftD - 60);
            this.east -= (this.shiftD - 60);
            this.west -= (this.shiftD - 60);
          }
        }

        if(direction === 'down-left') {
          if(yCoord >= 79) {
            gate = 'closed';
            shiftDid = false;
          }
          else if(grid[dCoord+1][lCoord]===0) {
            if(grid[dCoord][lCoord+1]===0 && grid[dCoord-1][lCoord+2]===0) {
              if(grid[dCoord+2][lCoord-1]===0) {
                this.playerY += this.shiftD;
                pBulletY += this.shiftD;
                this.north += this.shiftD;
                this.south += this.shiftD;
                this.playerX -= this.shiftD;
                pBulletX -= this.shiftD;
                this.east -= this.shiftD;
                this.west -= this.shiftD;
              }else{
                this.playerY += (this.shiftD - 60);
                pBulletY += (this.shiftD - 60);
                this.north += (this.shiftD - 60);
                this.south += (this.shiftD - 60);
                this.playerX -= (this.shiftD - 60);
                pBulletX -= (this.shiftD - 60);
                this.east -= (this.shiftD - 60);
                this.west -= (this.shiftD - 60);
              }
            }else{
              this.playerY += (this.shiftD + 60);
              pBulletY += (this.shiftD + 60);
              this.north += (this.shiftD + 60);
              this.south += (this.shiftD + 60);
              this.playerX -= (this.shiftD + 60);
              pBulletX -= (this.shiftD + 60);
              this.east -= (this.shiftD + 60);
              this.west -= (this.shiftD + 60);
            }
          }else if(grid[dCoord][lCoord+1]===0) {
            this.playerY += (this.shiftD - 60);
            pBulletY += (this.shiftD - 60);
            this.north += (this.shiftD - 60);
            this.south += (this.shiftD - 60);
            this.playerX -= (this.shiftD - 60);
            pBulletX -= (this.shiftD - 60);
            this.east -= (this.shiftD - 60);
            this.west -= (this.shiftD - 60);
          }
        }

        if(direction === 'down-right') {
          if(yCoord >= 79) {
            gate = 'closed';
            shiftDid = false;
          }
          else if(grid[dCoord+1][rCoord+1]===0) {
            if(grid[dCoord][rCoord]===0 && grid[dCoord-1][rCoord-1]===0) {
              if(grid[dCoord+2][rCoord+2]===0) {
                this.playerY += this.shiftD;
                pBulletY += this.shiftD;
                this.north += this.shiftD;
                this.south += this.shiftD;
                this.playerX += this.shiftD;
                pBulletX += this.shiftD;
                this.east += this.shiftD;
                this.west += this.shiftD;
              }else{
                this.playerY += (this.shiftD - 60);
                pBulletY += (this.shiftD - 60);
                this.north += (this.shiftD - 60);
                this.south += (this.shiftD - 60);
                this.playerX += (this.shiftD - 60);
                pBulletX += (this.shiftD - 60);
                this.east += (this.shiftD - 60);
                this.west += (this.shiftD - 60);
              }
            }else{
              this.playerY += (this.shiftD + 60);
              pBulletY += (this.shiftD + 60);
              this.north += (this.shiftD + 60);
              this.south += (this.shiftD + 60);
              this.playerX += (this.shiftD + 60);
              pBulletX += (this.shiftD + 60);
              this.east += (this.shiftD + 60);
              this.west += (this.shiftD + 60);
            }
          }else if(grid[dCoord][rCoord]===0) {
            this.playerY += (this.shiftD - 60);
            pBulletY += (this.shiftD - 60);
            this.north += (this.shiftD - 60);
            this.south += (this.shiftD - 60);
            this.playerX += (this.shiftD - 60);
            pBulletX += (this.shiftD - 60);
            this.east += (this.shiftD - 60);
            this.west += (this.shiftD - 60);
          }
        }
      }

      vertex(this.playerX, this.playerY);
      endShape();
      pop();

    this.playerY += this.yVelocity;
    this.south += this.yVelocity;
    this.north += this.yVelocity;
    this.playerX += this.xVelocity;
    this.east += this.xVelocity;
    this.west += this.xVelocity;
    pBulletX += this.xVelocity;
    pBulletY += this.yVelocity;

      if(this.shiftCoolDown >= 100) { 
        if(shiftDid) {
          this.shiftCoolDown -= 100;
        }
      }
    }

    gate = "closed";
    
    if(this.shiftCoolDown < 700) {
      this.shiftCoolDown += 1;
    }

    // if (gate === "closed") {
    //   if (playerPositions.length > maxPos) {
    //     playerPositions.shift();
    //   }
    // }
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

    push();
    textSize(50)
    text(wave, this.barX+400, this.barY - 700);
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
    else if(gameStatus === 'survival') {
      if(this.bulletCoolDown <= 0) {
        reload = true;
      }

      if (reload === false) {
        if(this.bulletCoolDown < 700) {
          this.bulletCoolDown += 2;
        }
        if(mouseIsPressed) {
          this.bulletCoolDown -= 20;
        }
      }else if(reload === true) {
        if (this.bulletCoolDown < 695) {
          this.bulletCoolDown += 5;
        }else {
          reload = false;
        }
      }

      if(this.health <= 0) {
        gameStatus = 'dead';
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
   if (keyIsDown(87)) {
     if(keyIsDown(68)) {
       direction = 'up-right'
     }else if(keyIsDown(65)){
       direction = 'up-left'
     }else{
       direction = 'up';
     }
   }
   
   if (keyIsDown(83)) {
    if(keyIsDown(68)) {
      direction = 'down-right'
    }else if(keyIsDown(65)){
      direction = 'down-left'
    }else{
      direction = "down";
    }
  }
  
  if (keyIsDown(68)) {
    if(keyIsDown(87)) {
      direction = 'up-right'
    }else if(keyIsDown(83)) {
      direction = 'down-right'
    }else{
      direction = "right";
    }
  }

  if (keyIsDown(65)) {
    if(keyIsDown(87)) {
      direction = 'up-left'
    }else if(keyIsDown(83)) {
      direction = 'down-left'
    }else{
      direction = "left";
    }
  }

   if(keyCode === SHIFT){
    gate = "open"
  }
  if(key === 'r'){
    if(gameStatus === 'practice') {
      if(spawnEnemy) {
        let enemy1 = new dashingEnemy(random(spawnPoints),random(spawnPoints),5);
        enemies.push(enemy1);
      }
    }
  }
  if (keyCode === 66) {
    if(gameStatus = 'gameModes') {
      gameStatus = 'menu';
    }
    if(gameStatus = 'options'){
      gameStatus = 'menu';
    }
    // if(gameStatus = 'practice'){
    //   gameStatus = 'gamemodes';
    // }
  }
}


class dashingEnemy {
  constructor(x,y,health) {
    this.x = x;
    this.y = y;
    this.health = health;
    this.speed = 9;
    this.bounce = 25;
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
    push();
    fill(220);
    stroke(0);
    imageMode(CENTER);
    image(dEnemySprite, this.x, this.y, 50,50);
    pop();
  }

  directionalInput() {
    this.move = true;
    let cellSize = gridW/cols;
    let eY = floor(this.y/cellSize);
    let eX = floor(this.x/cellSize);

    let xDifference = abs(xCoord - eX);
    let yDifference = abs(yCoord - eY);

    this.targetAngle = atan2(pBulletY - this.y, pBulletX - this.x);

    this.xV = floor(this.speed*cos(this.targetAngle));
    this.yV = floor(this.speed*sin(this.targetAngle));

    let dX = abs(this.x - this.xPoint);
    let dY = abs(this.y - this.yPoint);
    
    eHitX = this.bX;
    eHitY = this.bY;

    if (xDifference < 10 && yDifference < 10) {
      spawnEnemy = false;
    }


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

    this.extendedAngle = atan2(this.yPoint - this.y, this.xPoint - this.x);

    if(dX > 30 || dY > 30) {
      this.bX = floor(this.bounce*cos(this.extendedAngle));
      this.bY = floor(this.bounce*sin(this.extendedAngle));
    }


    if(this.charge) {
      if(this.wait >= 200) {
        this.wait -= 50;
      }else if(this.wait > 0) {
        if (grid[eY][eX-1] === 3 || grid[eY][eX] === 3 || grid[eY-1][eX] === 3 || grid[eY-1][eX+1] === 3 || grid[eY+1][eX] === 3 || 
          grid[eY+2][eX] === 3 || grid[eY+2][eX+1] === 3 || grid[eY][eX+1] === 3 || grid[eY+1][eX+1] === 3 || grid[eY][eX+2] === 3 ||
          grid[eY+1][eX+2] === 3 || grid[eY+1][eX-1] === 3) {
            this.x -= this.bX;
            this.y -= this.bY;
            this.isT = true;
            this.wait = 1000
            this.charge = false;
        }else{
          this.x += this.bX;
          this.y += this.bY;
          this.wait -= 5;
        }
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

    if (this.speed < 8) {
      this.speed += 2;
    }else {
      this.speed -= 2;
    }

    if(this.speed <= -20) {
      this.speed = 0;
    }

  }
  
  gridCheck() {
    let cellSize = gridW/cols;
    let eY = floor(this.y/cellSize);
    let eX = floor(this.x/cellSize);

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
  background(megaManBackground);
  translate(xT,yT);
  // displayGrid(grid, rows, cols);
  displayLevelBlocks(grid, rows, cols);
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
  background(BlackholeBackground);
  translate(xT,yT);
  displayGrid(grid, rows, cols);
  inputGrid();
  
  if(spawnEnemy) {
    let enemy1 = new dashingEnemy(random(spawnPoints),random(spawnPoints),5);
    enemies.push(enemy1);
    spawnEnemy = false;
  }
  
  
  if(millis() > eTimer + spawnRate) {
    spawnEnemy = !spawnEnemy;
    eTimer = millis();
  }

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
      currentKills++;
      totalKills++;
    }
  }

  if(currentKills >= waveKills) {
    wave++;
    waveKills += 2;
    currentKills = 0;
  }
}

function optionsMenu() {
  background(180);
  push();
  textAlign(LEFT);
  textSize(35);
  fill(0);
  text("Controls",width/2-600,height/2-300);
  textAlign(LEFT);
  textSize(30);
  fill(0);
  text("Move Up - w",width/2-650,height/2-225);
  textSize(30);
  fill(0);
  text("Move Down - s",width/2-650,height/2-150);
  textSize(30);
  fill(0);
  text("Move Right - d",width/2-650,height/2-75);
  textSize(30);
  fill(0);
  text("Move Left - a",width/2-650,height/2);
  textSize(30);
  fill(0);
  text("Shoot - Left Click",width/2-650,height/2+75);
  textSize(30);
  fill(0);
  text("Dash - shift",width/2-650,height/2+150);
  pop();

  enemyInfoGrid[0][0]=1;
  displayInfoGrid(enemyInfoGrid, eRows, eCols);
}

function deathMenu() {
  background(220);
  textAlign(LEFT);
  textSize(100);
  fill(0);
  text('Game Over', width/2-250, height/2 - height/2 + 100);
  textSize(50);
  fill(0);
  text('Waves Cleared: ' + wave, windowWidth/2-170, windowHeight - windowHeight + 200);
  textSize(50);
  fill(0);
  text('Total Kills: ' + totalKills, windowWidth/2-170, windowHeight - windowHeight + 300);
}

function playButton() {
  rectMode(CENTER);
  fill(255);
  rect(width/2 - 300, height/2 - 100, 400, 150);
  textAlign(CENTER,CENTER);
  textSize(50);
  fill(0);
  text("Play",width/2-300,height/2-100);
  textSize(30);
  fill(220);
  text("click",width/2-300,height/2-50);
}

function optionsButton() {
  rectMode(CENTER);
  fill(255);
  rect(width/2 + 300, height/2 - 100, 400, 150);
  textAlign(CENTER,CENTER);
  textSize(50);
  fill(0);
  text("Options",width/2+300,height/2-100);
  textSize(30);
  fill(220);
  text("click",width/2+300,height/2-50);
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
  rect(width/2 - 300, height/2 + 100, 400, 150);
  textAlign(CENTER,CENTER);
  textSize(50);
  fill(0);
  text("Survival",width/2-300,height/2+100);
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
       }else if (mouseX > width/2 - 500 && mouseX < width/2 - 100 && mouseY > height/2 + 25 && mouseY < height/2 + 175) {
        gameStatus = 'survival';
      }
       
    }
  }
}
