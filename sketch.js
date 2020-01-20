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
let pTargetX;
let pTargetY;
let xCoord;
let yCoord;
let player;
let playerSprite;
let direction = "up";
let gate = "closed";
let playerAngle;
let bulletAngle;
let bullets = [];

let yT = 0;
let xT = 0;

let rDifference;
let lDifference;
let uDifference;
let dDifference;

let practiceModeTXT;
let survivalModeTXT;
let pLines;
let sLines;
let levelY;
let levelX;
let blackHoleBackground;
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
let b40;
let b41;
let b42;
let b43;
let b44;

let pHit = false;
let eHitY;
let eHitX;
let enemies = [];
let dEnemySprite;
let spawnPoints = [610,1100];

let gameStatus = "menu";

let reload = false;

let wave = 1;
let waveKills = 5;
let currentKills = 0;
let totalKills = 0;
let highestWave;
let highestKills;
let spawnRate = 3500;
let spawnEnemy = true;
let eTimer = 0;

let enemyInfoGrid;
let eCols = 7;
let eRows = 4;
let eGridSize = 320;

let displayHitBox = false;
let autoAim = false;
let optionsVisual;

let nextScreen = true;



function preload() {
  practiceModeTXT = "assets/Levels/level0.txt";
  survivalModeTXT = "assets/Levels/level1.txt";
  pLines = loadStrings(practiceModeTXT);
  sLines = loadStrings(survivalModeTXT);
  blackHoleBackground = loadImage("assets/BlackholeBackground.jpg_large");
  megaManBackground = loadImage("assets/shmup_stage/MegaManBackground.PNG");
  optionsVisual = loadImage("assets/options_Visual.png");

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
  b40 = loadImage("assets/shmup_stage/block40.PNG");
  b41 = loadImage("assets/shmup_stage/block41.PNG");
  b42 = loadImage("assets/shmup_stage/block42.PNG");
  b43 = loadImage("assets/shmup_stage/block43.PNG");
  b44 = loadImage("assets/shmup_stage/block44.PNG");


  dEnemySprite = loadImage("assets/dashingEnemySprite.png");
  playerSprite = loadImage("assets/spaceship_small_blue.png");
}


function setup() {
  createCanvas(windowWidth,windowHeight);
  levelY = pLines.length;
  levelX = pLines[0].length;
  rectMode(CENTER);
  grid = createEmptyGrid(cols, rows);
  enemyInfoGrid = createEnemyGrid(eCols, eRows);
  player = new Player();

  if(getItem("highestKills") !== null) {
    highestKills = getItem("highestKills");
  }else{
    highestKills = 0;
  }

  if(getItem("highestWave") !== null) {
    highestWave = getItem("highestWave");
  }else{
    highestWave = 0;
  }
}

function draw() {
  if(gameStatus === 'menu') {
    background(0);
    playButton();
    optionsButton();
    
  }else if(gameStatus === 'options') {
    optionsMenu();
    infoBox();
  }
  else if (gameStatus === 'gamemodes') {
    background(0);
    practiceButton();
    survivalButton();
    reset();
  }
  else if(gameStatus === 'practice') {
      practiceMode();
  }
  else if(gameStatus === 'survival') {
    survivalMode();
  }
  else if(gameStatus === 'dead') {
    deathMenu(); 
    retryButton();
  }
  else if(gameStatus === 'buffer') {
    reset();
    gameStatus = 'survival';
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
      if(grid[y][x] === 4) {
        fill(255);
        stroke(255);
      }
      rect(x*cellSize, y*cellSize, cellSize, cellSize);
    }
  }
}

function displayLevelBlocks(grid, rows, cols, lines) {
  let cellSize = gridW / cols;
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (grid[y][x] === 3) {
        if(lines[y][x]==='1') {
          push();
          imageMode(CENTER);
          image(b1,x*cellSize,y*cellSize,cellSize,cellSize);
          pop();
        }
        else if(lines[y][x]==='2') {
          push();
          imageMode(CENTER);
          image(b2,x*cellSize,y*cellSize,cellSize,cellSize);
          pop();
        }
        else if(lines[y][x]==='3') {
          push();
          imageMode(CENTER);
          image(b3,x*cellSize,y*cellSize,cellSize,cellSize);
          pop();
        }
        else if(lines[y][x]==='4') {
          push();
          imageMode(CENTER);
          image(b4,x*cellSize,y*cellSize,cellSize,cellSize);
          pop();
        }
        else if(lines[y][x]==='5') {
          push();
          imageMode(CENTER);
          image(b5,x*cellSize,y*cellSize,cellSize,cellSize);
          pop();
        }
        else if(lines[y][x]==='6') {
          push();
          imageMode(CENTER);
          image(b6,x*cellSize,y*cellSize,cellSize,cellSize);
          pop();
        }
        else if(lines[y][x]==='7') {
          push();
          imageMode(CENTER);
          image(b7,x*cellSize,y*cellSize,cellSize,cellSize);
          pop();
        }
        else if(lines[y][x]==='8') {
          push();
          imageMode(CENTER);
          image(b8,x*cellSize,y*cellSize,cellSize,cellSize);
          pop();
        }
        else if(lines[y][x]==='9') {
          push();
          imageMode(CENTER);
          image(b9,x*cellSize,y*cellSize,cellSize,cellSize);
          pop();
        }
        else if(lines[y][x]==='a') {
          push();
          imageMode(CENTER);
          image(b10,x*cellSize,y*cellSize,cellSize,cellSize);
          pop();
        }
        else if(lines[y][x]==='b') {
          push();
          imageMode(CENTER);
          image(b11,x*cellSize,y*cellSize,cellSize,cellSize);
          pop();
        }
        else if(lines[y][x]==='c') {
          push();
          imageMode(CENTER);
          image(b12,x*cellSize,y*cellSize,cellSize,cellSize);
          pop();
        }
        else if(lines[y][x]==='d') {
          push();
          imageMode(CENTER);
          image(b13,x*cellSize,y*cellSize,cellSize,cellSize);
          pop();
        }
        else if(lines[y][x]==='e') {
          push();
          imageMode(CENTER);
          image(b14,x*cellSize,y*cellSize,cellSize,cellSize);
          pop();
        }
        else if(lines[y][x]==='f') {
          push();
          imageMode(CENTER);
          image(b15,x*cellSize,y*cellSize,cellSize,cellSize);
          pop();
        }
        else if(lines[y][x]==='g') {
          push();
          imageMode(CENTER);
          image(b16,x*cellSize,y*cellSize,cellSize,cellSize);
          pop();
        }
        else if(lines[y][x]==='h') {
          push();
          imageMode(CENTER);
          image(b17,x*cellSize,y*cellSize,cellSize,cellSize);
          pop();
        }
        else if(lines[y][x]==='i') {
          push();
          imageMode(CENTER);
          image(b18,x*cellSize,y*cellSize,cellSize,cellSize);
          pop();
        }
        else if(lines[y][x]==='j') {
          push();
          imageMode(CENTER);
          image(b19,x*cellSize,y*cellSize,cellSize,cellSize);
          pop();
        }
        else if(lines[y][x]==='k') {
          push();
          imageMode(CENTER);
          image(b20,x*cellSize,y*cellSize,cellSize,cellSize);
          pop();
        }
        else if(lines[y][x]==='l') {
          push();
          imageMode(CENTER);
          image(b21,x*cellSize,y*cellSize,cellSize,cellSize);
          pop();
        }
        else if(lines[y][x]==='m') {
          push();
          imageMode(CENTER);
          image(b22,x*cellSize,y*cellSize,cellSize,cellSize);
          pop();
        }
        else if(lines[y][x]==='n') {
          push();
          imageMode(CENTER);
          image(b23,x*cellSize,y*cellSize,cellSize,cellSize);
          pop();
        }
        else if(lines[y][x]==='o') {
          push();
          imageMode(CENTER);
          image(b24,x*cellSize,y*cellSize,cellSize,cellSize);
          pop();
        }
        else if(lines[y][x]==='p') {
          push();
          imageMode(CENTER);
          image(b25,x*cellSize,y*cellSize,cellSize,cellSize);
          pop();
        }
        else if(lines[y][x]==='q') {
          push();
          imageMode(CENTER);
          image(b26,x*cellSize,y*cellSize,cellSize,cellSize);
          pop();
        }
        else if(lines[y][x]==='r') {
          push();
          imageMode(CENTER);
          image(b27,x*cellSize,y*cellSize,cellSize,cellSize);
          pop();
        }
        else if(lines[y][x]==='s') {
          push();
          imageMode(CENTER);
          image(b28,x*cellSize,y*cellSize,cellSize,cellSize);
          pop();
        }
        else if(lines[y][x]==='t') {
          push();
          imageMode(CENTER);
          image(b29,x*cellSize,y*cellSize,cellSize,cellSize);
          pop();
        }
        else if(lines[y][x]==='u') {
          push();
          imageMode(CENTER);
          image(b30,x*cellSize,y*cellSize,cellSize,cellSize);
          pop();
        }
        else if(lines[y][x]==='v') {
          push();
          imageMode(CENTER);
          image(b31,x*cellSize,y*cellSize,cellSize,cellSize);
          pop();
        }
        else if(lines[y][x]==='w') {
          push();
          imageMode(CENTER);
          image(b32,x*cellSize,y*cellSize,cellSize,cellSize);
          pop();
        }
        else if(lines[y][x]==='x') {
          push();
          imageMode(CENTER);
          image(b33,x*cellSize,y*cellSize,cellSize,cellSize);
          pop();
        }
        else if(lines[y][x]==='y') {
          push();
          imageMode(CENTER);
          image(b34,x*cellSize,y*cellSize,cellSize,cellSize);
          pop();
        }
        else if(lines[y][x]==='z') {
          push();
          imageMode(CENTER);
          image(b35,x*cellSize,y*cellSize,cellSize,cellSize);
          pop();
        }
        else if(lines[y][x]==='A') {
          push();
          imageMode(CENTER);
          image(b36,x*cellSize,y*cellSize,cellSize,cellSize);
          pop();
        }
        else if(lines[y][x]==='B') {
          push();
          imageMode(CENTER);
          image(b37,x*cellSize,y*cellSize,cellSize,cellSize);
          pop();
        }
        else if(lines[y][x]==='C') {
          push();
          imageMode(CENTER);
          image(b38,x*cellSize,y*cellSize,cellSize,cellSize);
          pop();
        }
        else if(lines[y][x]==='D') {
          push();
          imageMode(CENTER);
          image(b39,x*cellSize,y*cellSize,cellSize,cellSize);
          pop();
        }
        else if(lines[y][x]==='E') {
          push();
          imageMode(CENTER);
          image(b40,x*cellSize,y*cellSize,cellSize,cellSize);
          pop();
        }
        else if(lines[y][x]==='F') {
          push();
          imageMode(CENTER);
          image(b41,x*cellSize,y*cellSize,cellSize,cellSize);
          pop();
        }
        else if(lines[y][x]==='G') {
          push();
          imageMode(CENTER);
          image(b42,x*cellSize,y*cellSize,cellSize,cellSize);
          pop();
        }
        else if(lines[y][x]==='H') {
          push();
          imageMode(CENTER);
          image(b43,x*cellSize,y*cellSize,cellSize,cellSize);
          pop();
        }
        else if(lines[y][x]==='I') {
          push();
          imageMode(CENTER);
          image(b44,x*cellSize,y*cellSize,cellSize,cellSize);
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
  push();
  translate(width-380, 200);
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
        image(dEnemySprite, x*cellSize, y*cellSize, cellSize, cellSize);
        pop();
      }
      rect(x*cellSize, y*cellSize, cellSize, cellSize);
    }
  }
  pop();
}


function inputGrid(text) {
  for (let y = 0; y < levelY; y++) {
    for (let x = 0; x < levelX; x++) {
      if (text[y][x] === '#') {
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
    this.targetX;
    this.targetY;
   }

   create() {
     push();
     translate(this.playerX,this.playerY);
     angleMode(RADIANS);
     
     if(autoAim) {
       if(enemies.length > 0) {
         for (let i = 0; i < enemies.length; i++) {
           if (enemies.length === 1) {
             this.targetX = enemies[i].x;
             this.targetY = enemies[i].y;
             pTargetX = enemies[i].x;
             pTargetY = enemies[i].y;
           }else{
             let xDifference = abs(this.playerX - enemies[i].x);
             let yDifference = abs(this.playerY - enemies[i].y);
             let targetDifferenceY = abs(this.playerY - this.targetY);
             let targetDifferenceX = abs(this.playerX - this.targetX);

             if(xDifference + yDifference < targetDifferenceX + targetDifferenceY) {
               this.targetX = enemies[i].x;
               this.targetY = enemies[i].y;
               pTargetX = enemies[i].x;
               pTargetY = enemies[i].y;
             }
           }
         }
       }else{
        this.targetX = (mouseX - xT);
        this.targetY = (mouseY - yT);
        pTargetX = (mouseX - xT);
        pTargetY = (mouseY - yT);
       }
     }else{
      this.targetX = (mouseX - xT);
      this.targetY = (mouseY - yT);
      pTargetX = (mouseX - xT);
      pTargetY = (mouseY - yT);
     }

     playerAngle = atan2(this.targetY - this.playerY , this.targetX - this.playerX);
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

     if(gameStatus === 'survival') {
       if( (yCoord <= 64 && yCoord >= 54 && xCoord <= 38 && xCoord >= 27) || (yCoord >= 54 && yCoord <= 64 && xCoord <= 64 && xCoord >= 54) || (yCoord >= 27 && yCoord <= 38 && xCoord >= 54 && xCoord <= 64) || (yCoord <= 38 && yCoord >= 27 && xCoord >= 27 && xCoord <= 38) ) {
         spawnEnemy = false;
        }
      }else if(gameStatus === 'practice') {
        if( (yCoord <= 43 && yCoord >= 33 && xCoord <= 43 && xCoord >= 33) ) {
          spawnEnemy = false;
        }else{
          spawnEnemy = true;
        }
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
        if(this.xVelocity < 10) {
          this.xVelocity += 5;
        }
      }else{
        if(this.xVelocity > -10) {
          this.xVelocity -= 5;
        }
      }
    }

    if (crashY === true) {
      if (this.yVelocity > 0) {
        if(this.yVelocity < 10) {
          this.yVelocity += 5;
        }
      }else{
        if(this.yVelocity > -10) {
          this.yVelocity -= 5;
        }
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

    if (gate === "open") {
      push();
      beginShape();
      strokeWeight(15);
      stroke(127,0,255);
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

    if(gameStatus === 'survival') {
      push();
      textSize(50);
      fill(225);
      text(wave, this.barX+400, this.barY - 700);
      pop();
    }

    if(gameStatus === 'practice') {
      push();
      textSize(40);
      fill(225);
      text("Press R to spawn enemy", this.barX+900, this.barY - 100);
      textSize(25);
      fill(225);
      text("Press 'b' to exit",this.barX+1000,this.barY - 750);
      pop();
    }

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
        if(!autoAim) {
          if(mouseIsPressed) {
            this.bulletCoolDown -= 20;
          }
        }else{
          if(keyIsDown(32)) {
            this.bulletCoolDown -= 20;
          }
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
        if(!autoAim) {
          if(mouseIsPressed) {
            this.bulletCoolDown -= 20;
          }
        }else{
          if(keyIsDown(32)) {
            this.bulletCoolDown -= 20;
          }
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
   constructor(x,y,hit,tX,tY) {
     this.x = x;
     this.y = y;
     this.hit = hit;
     this.speed = 55;
     this.targetX = tX;
     this.targetY = tY;
     this.bulletAngle = atan2(this.targetY - this.y, this.targetX - this.x);
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
    }
  }
 

 function mousePressed() {
   if(!autoAim) {
    if(reload === false) {
      if(gameStatus === 'practice' || gameStatus === 'survival') {
        myB = new playerBullet(pBulletX,pBulletY,false,pTargetX,pTargetY);
        bullets.push(myB);
      }
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

  if(keyCode === 32) {
    if(autoAim) {
      if(reload === false) {
        if(gameStatus === 'practice' || gameStatus === 'survival') {
          myB = new playerBullet(pBulletX,pBulletY,false,pTargetX,pTargetY);
          bullets.push(myB);
        }
      }
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
    if(gameStatus === 'gamemodes') {
      gameStatus = 'menu';
    }
    else if(gameStatus === 'options'){
      gameStatus = 'menu';
    }
    else if(gameStatus === 'practice'){
      gameStatus = 'gamemodes';
    }
    else if(gameStatus === 'dead'){
      gameStatus = 'menu';
    }
  }
}


class dashingEnemy {
  constructor(x,y,health) {
    this.x = x;
    this.y = y;
    this.health = health;
    this.speed = 9;
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
    push();
    fill(220);
    stroke(0);
    imageMode(CENTER);
    image(dEnemySprite, this.x, this.y, 65,65);
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
    }else{
      if(gameStatus === 'practice') {
        spawnEnemy = true;
      }
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

    if(this.speed <= -10) {
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
  if(displayHitBox){
    displayGrid(grid, rows, cols);
  }
  displayLevelBlocks(grid, rows, cols,pLines);
  inputGrid(pLines);

  spawnPoints = [700,700];
  
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
  background(megaManBackground);
  translate(xT,yT);
  // displayGrid(grid, rows, cols);
  displayLevelBlocks(grid, rows, cols, sLines);
  inputGrid(sLines);
  
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
    if(spawnRate > 1000) {
      spawnRate -= 500;
    }
    currentKills = 0;
  }

  if(totalKills > highestKills) {
    highestKills = totalKills;
    storeItem("highestKills", highestKills);
  }

  if(wave > highestWave) {
    highestWave = wave;
    storeItem("highestWave", highestWave);
  }
}

function optionsMenu() {
  background(180);
  push();
  textAlign(LEFT);
  textSize(35);
  fill(0);
  text("Controls",width/2-630,height/2-300);
  textSize(35);
  fill(0);
  text("Enemy Info",width-400,height/2-300);
  textSize(30);
  fill(0);
  text("Move Up - w",width/2-680,height/2-225);
  textSize(30);
  fill(0);
  text("Move Down - s",width/2-680,height/2-150);
  textSize(30);
  fill(0);
  text("Move Right - d",width/2-680,height/2-75);
  textSize(30);
  fill(0);
  text("Move Left - a",width/2-680,height/2);
  textSize(30);
  fill(0);
  if(!autoAim) {
    text("Shoot - Left Click",width/2-680,height/2+75);
  }else{
    text("Shoot - Spacebar",width/2-680,height/2+75);
  }
  textSize(30);
  fill(0);
  text("Dash - shift",width/2-680,height/2+150);
  textSize(25);
  fill(0);
  text("Display Hitbox's",width/2-610,height/2+225);
  textSize(25);
  fill(0);
  text("Enable AutoAim",width/2-610,height/2+285);
  textSize(25);
  fill(0);
  text("Press 'b' to exit",width-200,height-height + 20);
  pop();

  push();
  fill(0);
  noStroke();
  rect(width/2-655,height/2+225,50,50);
  if(displayHitBox) {
    fill(0,255,0);
  }else{
    fill(255,0,0);
  }
  noStroke();
  rectMode(CENTER);
  rect(width/2-655,height/2+225,40,40);

  fill(0);
  noStroke();
  rect(width/2-655,height/2+285,50,50);
  if(autoAim) {
    fill(0,255,0);
  }else{
    fill(255,0,0);
  }
  noStroke();
  rect(width/2-655,height/2+285,40,40);
  pop();

  push();
  imageMode(CENTER);
  image(optionsVisual,width/2 - 50,height/2 + 25,600,600);
  rectMode(CENTER);
  noFill();
  stroke(0);
  strokeWeight(10);
  rect(width/2 - 50,height/2 + 25,600,600);
  strokeWeight(1);
  fill(255);
  stroke(0);
  rect(width/2-330, height/2+240,100,15);
  rect(width/2-350, height/2+275,100,15);
  rect(width/2-340, height/2+310,100,15);

  beginShape();
  strokeWeight(3);
  stroke(255);
  vertex(width/2-330+50,height/2+240);
  vertex(width/2-330+50+80,height/2+240 + 7 + 10);
  endShape();

  beginShape();
  strokeWeight(3);
  stroke(255);
  vertex(width/2-350+50,height/2+275);
  vertex(width/2-350+50+80,height/2+275 + 7);
  endShape();

  beginShape();
  strokeWeight(3);
  stroke(255);
  vertex(width/2-340+50,height/2+310);
  vertex(width/2-340+50+80,height/2+310);
  endShape();

  textAlign(CENTER);
  textSize(12);
  fill(0);
  text("Ammo Bar",width/2-330, height/2+240);
  text("Dash Meter",width/2-350, height/2+275);
  text("Health Bar",width/2-340, height/2+310);
  pop();

  enemyInfoGrid[0][0]=1;
  displayInfoGrid(enemyInfoGrid, eRows, eCols);
}

function infoBox() {
  if(gameStatus === 'options') {
    if(mouseX > 1010 && mouseX < 1100 && mouseY > 160 && mouseY < 240) {
      push();
      rectMode(CORNER);
      fill(255);
      stroke(0);
      rect(mouseX,mouseY,400,200);
      imageMode(CORNER);
      image(dEnemySprite,mouseX+20,mouseY,100,100);
      textAlign(LEFT);
      textSize(20);
      fill(0);
      text("Dashing enemy",mouseX + 170,mouseY + 20);
      textSize(20);
      fill(0);
      text("Health: 5",mouseX + 170,mouseY + 50);
      textSize(20);
      fill(0);
      text("Damage: 10",mouseX + 170,mouseY + 80);
      textSize(20);
      fill(0);
      text("Description",mouseX + 20,mouseY + 120);
      textSize(15);
      fill(0);
      text("This enemy will follow the player around and once it gets",mouseX + 20,mouseY + 140);
      text("close enough it will dash towards the player, damging ",mouseX + 20,mouseY + 160);
      text("them and knocking them back",mouseX + 20,mouseY + 180);
      pop();
    }
  }
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
  textSize(50);
  fill(0);
  text('Highest Wave: ' + highestWave, windowWidth/2-170, windowHeight - windowHeight + 400);
  textSize(50);
  fill(0);
  text('Highest Kills: ' + highestKills, windowWidth/2-170, windowHeight - windowHeight + 500);
  textSize(25);
  fill(0);
  text("Press 'b' to return to menu",width-330,height-height + 20);
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
  textSize(25);
  fill(225);
  text("Press 'b' to go back",width-120,height-height + 20);
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

function retryButton() {
  rectMode(CENTER);
  fill(255);
  rect(width/2, height/2 + 200, 400, 150);
  textAlign(CENTER,CENTER);
  textSize(50);
  fill(0);
  text("Retry",width/2,height/2+200);
}

function mouseClicked() {
  nextScreen = true;
  if (gameStatus === 'menu') {
    if(nextScreen) {
      if (mouseX > width/2 - 500 && mouseX < width/2 - 100 && mouseY > height/2 - 175 && mouseY < height/2 - 25) {
        gameStatus = 'gamemodes';
        nextScreen = false;
      }else if(mouseX > width/2 + 100 && mouseX < width/2 + 500 && mouseY > height/2 - 175 && mouseY < height/2 - 25){
        gameStatus = 'options'
        nextScreen = false;
      }
    }
  }
  if (gameStatus === 'gamemodes') {
    if(nextScreen) {
      if (mouseX > width/2 + 100 && mouseX < width/2 + 500 && mouseY > height/2 - 175 && mouseY < height/2 - 25) {
        gameStatus = 'practice';
        nextScreen = false;
      }else if (mouseX > width/2 - 500 && mouseX < width/2 - 100 && mouseY > height/2 - 175 && mouseY < height/2 - 25) {
        gameStatus = 'survival';
        nextScreen = false;
      }
    }
  }

  if (gameStatus === 'dead') {
    if(nextScreen) {
      if (mouseX > width/2 - 200 && mouseX < width/2 + 200 && mouseY > height/2 + 200 - 75 && mouseY < height/2 + 200 + 75) {
        gameStatus = 'buffer';
        nextScreen = false;
      }
    }
  }

  if(gameStatus === 'options') {
    if (mouseX > width/2 - 655-20 && mouseX < width/2 - 655+20 && mouseY > height/2 + 225-20 && mouseY < height/2 + 225+20) {
      displayHitBox = !displayHitBox;
    }
    if (mouseX > width/2 - 655-20 && mouseX < width/2 - 655+20 && mouseY > height/2 + 285-20 && mouseY < height/2 + 285+20) {
      autoAim = !autoAim;
    }
  } 
}

function reset() {
  pBulletX = 650;
  pBulletY = 400;
  xT = 0;
  yT = 0;
  pHit = false;
  wave = 1;
  waveKills = 5;
  currentKills = 0;
  totalKills = 0;
  spawnRate = 3500;
  spawnEnemy = true;
  switchSpawn = false;
  eTimer = 0;
  player = new Player();
  enemies = [];
  gate = "closed";
}
