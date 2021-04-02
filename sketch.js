var playerShip;
var astroid;
var enemyShip;

var backgroundImg;
var playerShipImg;

var astroid;
var astroid1;
var astroid2;
var astroid3;
var astroid4;
var astroid5;

var enemyShipImg1;
var enemyShipImg2;
var enemyShipImg3;

var astroidGroup;
var enemyGroup;

var burst;
var burstSound;

var coin;
var coinSound;

var Bullet;
var BulletImg;




var bullet1;
var bulet2;
var bullet3;
var bullet4;
var bullet5;
var bullet6;
var bullet7;
var bullet8;
var bullet9;
var bullet10;

var health = 3;
var h1;
var h2;
var h3;


var start;
var startImg;

var gameState = "Start";

var score = 0;

var h1Img;
var h2Img;
var h3Img;

var gameOver;
var gameOverImg;

var Visiblity = 255;

enemyGroup.Visiblity = 255;



function preload() {
  backgroundImg = loadImage("spacebg.jpg")
  playerShipImg = loadImage("Player.png");

  astroid1 = loadImage("images_1.png");
  astroid2 = loadImage("images_.png");
  astroid3 = loadImage("astroid_.png");
  astroid4 = loadImage("astroid.png");

  
  enemyShipImg1 = loadImage("Enemy1.png");
  enemyShipImg2 = loadImage("enemy__.png");
  enemyShipImg3 = loadImage("shpi.png");

  burst =  loadImage("burst_.png")
  burstSound = loadSound("burst.mp3");

  BulletImg = loadImage("Bullet.png");

  startImg = loadImage("start.png");

  h1Img = loadImage("health.png");
  h2Img = loadImage("health.png");
  h3Img = loadImage("health.png");

  gameOverImg = loadImage("Gameover.jpg");

  coinSound = loadSound("Coin.mp3");
}

function setup() {
  createCanvas(600, 600);
  
  background = createSprite(0, 0, 600, 600);
  background.addImage(backgroundImg);
  background.scale = 1.5;

  playerShip = createSprite(295, 550, 10, 10);
  playerShip.addImage(playerShipImg);
  playerShip.scale = 0.15;

  h1 = createSprite(10, 550, 10, 10);
  h1.addImage(h1Img);
  h1.scale = 0.15;

  h2 = createSprite(50, 550, 10, 10);
  h2.addImage(h2Img);
  h2.scale = 0.15;


  h3 = createSprite(90, 550, 10, 10);
  h3.addImage(h3Img); 
  h3.scale = 0.15;

  Bullet = createSprite(playerShip.x, playerShip.y - 50, 10, 10);
  Bullet.addImage(BulletImg);
  Bullet.scale = 0.15;
  Bullet.visible = false;

  start = createSprite(300, 300, 30, 30);
  start.addImage(startImg);
  start.scale = 0.4;
  start.visible = true;

  astroidGroup = createGroup();
  enemyGroup = createGroup();
}

function draw() {
  background.velocityY = 2;

  if(background.y > 600){
    background.y = background.height/2;
  }

  if(gameState === "Start"){
    start.display();
    playerShip.visible = false;
    enemyGroup.visible = false;
    if(mousePressedOver(start)){
       gameState = "Play";
       console.log(gameState);
    }
  }

  if(gameState === "Play"){

    start.visible = false;
    playerShip.visible = true;
    
    if(keyDown(LEFT_ARROW)){
      playerShip.x  = playerShip.x - 7;
    }
  
    if(keyDown(RIGHT_ARROW)){
      playerShip.x  = playerShip.x + 7;
    }
    if(astroidGroup.isTouching(playerShip)){
      health = health-1;
      astroid.lifetime = 1;
    }
    if(enemyGroup.isTouching(playerShip)){
      health = health-1;
      enemyShip.velocityY = 0;
      enemyShip.lifetime = 1;

    }
    if(health === 3){
      h1.visible = true;
      h2.visible = true;
      h3.visible = true;
    }
    if(health === 2){
      h1.visible = true;
      h2.visible = true;
      h3.visible = false;
    }
    if(health === 1){
      h1.visible = true;
      h2.visible = false;
      h3.visible = false;
    }
    if(health === 0){
      h1.visible = false;
      h2.visible = false;
      h3.visible = false;
      burstSound.play();
      playerShip.velocity = 0;
      enemyGroup.velocity = 0;
      astroidGroup.velocity = 0;
      background.velocity = 0;
      playerShip.addImage(burst);
    }
    if(keyDown(UP_ARROW) && Bullet.y === 500){
      Bullet.visible = true;
      Bullet.velocityY = -10;
      Bullet.x = playerShip.x;
    }  
    var edges = createEdgeSprites();
  
    if(Bullet.isTouching(edges[2])){
      Bullet.velocityY = 0;
      Bullet.visible = false;
      Bullet.x = playerShip.x;
      Bullet.y = playerShip.y - 50;
      coinSound.play();
    }
    if(Bullet.isTouching(enemyGroup)){
      enemyShip.addImage(burst);
      enemyShip.lifetime = 1;
      Bullet.visible = false;
      enemyShip.velolcityY = 0;
      score = score+1;
      coinSound.play();
    }
    if(Bullet.isTouching(astroidGroup)){
      astroid.addImage(burst);
      astroid.lifetime = 1;
      Bullet.visible = false;
      astroid.velocityY = 0;
      score = score+1;
    }    
    

    


  }

  playerShip.setCollider("rectangle",0,0,playerShip.width - 50, playerShip.height - 50);
  playerShip.debug = true;

  Bullet.setCollider("rectangle",0,0,50, 50);
  Bullet.debug = false;

  background.display();
  start.display();
  playerShip.display();
  Bullet.display();
  spawnAstroids();
  spawnEnemyships();
  drawSprites();

    push();
    textSize(30);
    fill("white");
    stroke("black");
    text("score:-" + score, 450, 50);
    pop();
  


}
function spawnAstroids(){
  if (frameCount % 100 === 0){
     astroid = createSprite(Math.round(random(0, 600)),0,10,40);
    astroid.velocityY = 10;

    
     //generate random obstacles
     var rand = Math.round(random(1,4));
     switch(rand) {
       case 1: astroid.addImage(astroid1);
               break;
       case 2: astroid.addImage(astroid2);
               break;
       case 3: astroid.addImage(astroid3);
               break;
       case 4: astroid.addImage(astroid4);
               break;
                 
       default: break;
     }
    
     //assign scale and lifetime to the obstacle           
     astroid.scale = 0.5;
     astroid.lifetime = 300;
     astroidGroup.add(astroid);

   }
}
function spawnEnemyships(){
  if (frameCount % 50 === 0){
    enemyShip = createSprite(Math.round(random(0, 600)),0,10,40);
    enemyShip.velocityY = 10;
    
     //generate random obstacles
     var rand = Math.round(random(1,3));
     switch(rand) {
       case 1: enemyShip.addImage(enemyShipImg1);
        break;
        case 2: enemyShip.addImage(enemyShipImg2);
        break;
        case 3: enemyShip.addImage(enemyShipImg3);
        break;
       default: break;
     }
    
     //assign scale and lifetime to the obstacle           
     enemyShip.scale = 0.15;
     enemyShip.lifetime = 300;
     enemyGroup.add(enemyShip);
  }
  
}
