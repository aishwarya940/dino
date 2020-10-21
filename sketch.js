var PLAY = 1;
var END = 0;
var gameState = PLAY;

var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var gameOver,gameOverImage;
var restart,restartImage;
var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score;

function preload(){
    trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
    trex_collided = loadImage("trex_collided.png");
    
    groundImage = loadImage("ground2.png");
    
    cloudImage = loadImage("cloud.png");
    
    obstacle1 = loadImage("obstacle1.png");
    obstacle2 = loadImage("obstacle2.png");
    obstacle3 = loadImage("obstacle3.png");
    obstacle4 = loadImage("obstacle4.png");
    obstacle5 = loadImage("obstacle5.png");
    obstacle6 = loadImage("obstacle6.png");
    gameOverImage = loadImage("gameOver.png");
    restartImage = loadImage("restart.png");
}

function setup() {

    createCanvas(600, 200);

    trex = createSprite(300, 180, 20, 50);
    trex.addAnimation("running", trex_running);
    trex.scale = 0.5;

    restart = createSprite(trex.x-50, trex.y - 80, 10, 10);
    restart.addImage(restartImage);
    restart.visible=false;

    gameOver = createSprite(trex.x-100, trex.y - 130, 10, 10);
    gameOver.addImage(gameOverImage);
    gameOver.visible=false;

    ground = createSprite(300, 180, 600, 20);
    ground.debug=true
    ground.addImage("ground", groundImage);

    invisibleGround = createSprite(200, 190, 600, 10);
   // invisibleGround.visible = false;

    cloudsGroup = new Group();
    obstaclesGroup = new Group();

    score = 0;

}

function draw() {

    background("grey");

    camera.on();
    camera.x = trex.x;

    trex.collide(invisibleGround);

    if(gameState === PLAY) {

      

        score = score + Math.round(getFrameRate()/60);
        text("Score: " + score, trex.x + 200, 50);

        if(keyDown("space") && trex.y>=159) {
            trex.velocityY = -13;
        }

        if(keyDown(RIGHT_ARROW)) {
            trex.x = trex.x + 10;
        }

        if(obstaclesGroup.isTouching(trex)) {
            gameState = END;
        }

        trex.velocityY = trex.velocityY + 0.6;

       if(trex.x > ground.x + 300) {
            ground.x = ground.x + 600;
      }

       if(trex.x > invisibleGround.x + 300) {
           invisibleGround.x = invisibleGround.x + 600;
     }

        spawnClouds();
        spawnObstacles();

    } else if(gameState === END) {
        
        trex.velocityY = 0;
        ground.velocityX=0;
        gameOver.visible = true;
        restart.visible = true;
        obstaclesGroup.setVelocityXEach(0)
        cloudsGroup.setVelocityXEach(0)

        if(mousePressedOver(restart)) {
            reset();
        }

        

    }
    drawSprites();
}

function spawnClouds() {

    if(frameCount%50===0){

        var cloud = createSprite(600, Math.round(random(20,80)), 40, 10);
        cloud.addImage(cloudImage);    
        cloud.scale = 0.5;
        cloud.velocityX=-2
        
        cloud.depth = trex.depth - 1;

        cloudsGroup.add(cloud);
    }
}

function spawnObstacles() {

   if(frameCount%80===0){

        var obstacle = createSprite(600, 165, 10, 40);
        obstacle.velocityX=-2;

        var rand = Math.round(random(1, 6));

        switch(rand) {
            case 1: obstacle.addImage(obstacle1);
                    break;
            case 2: obstacle.addImage(obstacle2);
                    break;
            case 3: obstacle.addImage(obstacle3);
                    break;
            case 4: obstacle.addImage(obstacle4);
                    break;
            case 5: obstacle.addImage(obstacle5);
                    break;
            case 6: obstacle.addImage(obstacle6);
                    break;
            default: break;
        }

        obstacle.scale = 0.5;
        obstaclesGroup.add(obstacle);

    }
}

function reset() {
    gameState = PLAY;
    restart.visible=false;
    gameOver.visible=false;
    obstaclesGroup.destroyEach();
    cloudsGroup.destroyEach();
    score = 0;
    trex.x = 300;
  
   
}