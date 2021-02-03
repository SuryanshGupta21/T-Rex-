
 var trex ,trex_running ,trex_collided ,edges ,groundI , obstacle1 ,cloudI ,obstacle2 ,obstacle3 ,obstacle4 ,obstacle5 ,obstacle6  ,obstaclegroup ;

var score=0;
var gamestate=0;
var gameover ,gameoverimg ;
var x=0;
var restartImg;

function preload(){
  
  trex_running=loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided=loadAnimation("trex_collided.png");
  obstacle1=loadImage("obstacle1.png");
  obstacle2=loadImage("obstacle2.png");
  obstacle3=loadImage("obstacle3.png");
  obstacle4=loadImage("obstacle4.png");
  obstacle5=loadImage("obstacle5.png");
  obstacle6=loadImage("obstacle6.png");
  cloudI=loadImage("cloud.png");
  groundI=loadImage("ground2.png");
  gameoverimg=loadImage("gameOver.png");
  restartImg=loadImage("restartImg.jpeg");
}

function setup(){
  createCanvas(600,200)
  
  obstaclegroup=new Group();
  trex=createSprite(50,160,10,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided",trex_collided);
  trex.scale=0.55;
  
  edges= createEdgeSprites();
  
  ground=createSprite(200,180,999,5);
  groundy=createSprite(300,185,600,0.1);
 
  clouds=createSprite(250,10,30,5); 
  clouds.addImage(cloudI);
  ground.addImage(groundI);
  
 ground.velocityX = - (4+score/100);
  

    
  gameover = createSprite(300,50);
  gameover.addImage(gameoverimg);
  gameover.visible=false;
    
  
  restart = createSprite(300,100);
  restart.addImage(restartImg);
  restart.scale=0.7;
  restart.visible=false;
 }
 
function draw(){
  background("white");
  
  
  
  if(keyDown("space")){
    trex.velocityY= -7;
  }else{
    trex.velocityY= 4;                             
  }
  
  if(ground.x<0){
    ground.x=600;
  }
   
  clouds.velocityX=-1.5;
    
    if(x==0){
        score=score+1
    }
    
  
  trex.collide(groundy);
    
    if(trex.isTouching(obstaclegroup))
   { 
      gameover.visible=true;
     ground.velocityX=0;
     obstaclegroup.setVelocityXEach(0);
      trex.changeAnimation("collided",trex_collided);
     x=1;
    restart.visible=true;
   }
  
    if(mousePressedOver(restart)){
      restart.visible=false;
      score=0;
      gameover.visible=false;
      x=0;
      trex.changeAnimation("running", trex_running);
     obstaclegroup.destroyEach();
    }
    
    
    
    
   createobstacle()
  
  text(score,500,50);

    //score=score+Math.round(getFrameRates()/50);
    drawSprites();
  
 }



 function createobstacle(){
  if(World.frameCount%80==0){
     
     
  var obstacle=createSprite(600,163);
  obstacle.velocityX = - (4+score/100);
   obstacle.scale=0.6;
    
  var R=Math.round(random(1,6));
  switch(R){
    case 1:obstacle.addImage(obstacle1);
      break; 
    case 2:obstacle.addImage(obstacle2);
      break;
    case 3:obstacle.addImage(obstacle3);
      break;
    case 4:obstacle.addImage(obstacle4);
      break;
    case 5:obstacle.addImage(obstacle5);
      break;
    case 6:obstacle.addImage(obstacle6);  
      break;
   default:break;  
  }
    obstaclegroup.add(obstacle);
}
 }