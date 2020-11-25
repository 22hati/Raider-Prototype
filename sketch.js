var starImg,
    headerImg,
    heading,
    onlineImg,
    online,
    instructionsImg,
    instructions,
    infiniteImg,
    infinite,
    achievmentsImg,
    achievments,
    player,
    i1g,
    i2g,
    i3g,
    i4g,
    i5g,
    i6g,
    i7g,
    i8g,
    ins,
    slide=1,
    back,
    rg,og,yg,lyg,lg,gg,cg,bg,vg,pg;
    

gameState = "menu";

function preload() {
  starImg = loadImage("images/star.png");
  headerImg = loadImage("images/heading.png");

  i1g = loadImage("images/i1.png");
  i2g = loadImage("images/i2.png");
  i3g = loadImage("images/i3.png");
  i4g = loadImage("images/i4.png");
  i5g = loadImage("images/i5.png");
  i6g = loadImage("images/i6.png");
  i7g = loadImage("images/i7.png");
  i8g = loadImage("images/i8.png");

  rg = loadImage("images/player_images/red.png");
  og = loadImage("images/player_images/orange.png");
  yg = loadImage("images/player_images/yellow.png");
  lyg = loadImage("images/player_images/light_yellow.png");
  lg = loadImage("images/player_images/lime.png");
  gg = loadImage("images/player_images/green.png");
  cg = loadImage("images/player_images/cyan.png");
  bg = loadImage("images/player_images/blue.png");
  vg = loadImage("images/player_images/violet.png");
  pg = loadImage("images/player_images/pink.png");
}

function setup() {
  createCanvas(displayWidth,displayHeight);

  heading = createSprite(displayWidth/2,100);
  heading.addImage(headerImg);
  heading.depth = heading.depth+1;

  online=createButton("ONLINE");
  online.position(displayWidth/4*3-200,450);
  online.style('width','400px');
  online.style('height','100px');
  online.style('background','red');

  back=createButton("back");
  back.position(40,40);
  back.style('background','red');

  instructions=createButton("INSTRUCTIONS");
  instructions.position(displayWidth/4*3-200,700);
  instructions.style('width','400px');
  instructions.style('height','100px');
  instructions.style('background','red');

  infinite_mode=createButton("INFINITE MODE");
  infinite_mode.position(displayWidth/4-200,450);
  infinite_mode.style('width','400px');
  infinite_mode.style('height','100px');
  infinite_mode.style('background','red');

  achievments=createButton("ACHIEVMENTS");
  achievments.position(displayWidth/4-200,700);
  achievments.style('width','400px');
  achievments.style('height','100px');
  achievments.style('background','red');
  
  player=createSprite(displayWidth/2,600);
  player.visible=false;

  ins=createSprite(displayWidth/2,displayHeight/2);
  ins.scale=1.2;

  StarGroup = createGroup();

  for(var i=0; i<160; i++) {
    var star = createSprite(random(0,displayWidth),random(0,displayHeight));
    star.addImage(starImg);
    star.velocityX = random(1.1,2.1);
    star.scale = 0.6;
    star.lifetime = 1200;
    StarGroup.add(star);
  }
}

function draw() {
  background("black");

  if(gameState==="menu" || gameState==="instructions") {
    if(frameCount%10 === 0) {
      var star = createSprite(0,random(0,displayHeight));
      star.addImage(starImg);
      star.velocityX = random(1.1,2.1);
      star.scale = 0.6;
      star.lifetime = 1200;
      StarGroup.add(star);
    }
  }else if(gameState==="infinite" || gameState==="online") {
    if(StarGroup.velocityYEach>0 || StarGroup.velocityYEach<0) {
      StarGroup.destroyEach();
    }

    if(frameCount%10 === 0) {
      var star = createSprite(random(0,displayWidth),0);
      star.addImage(starImg);
      star.velocityY = random(1.1,2.1);
      star.scale = 0.6;
      star.lifetime = 1200;
      StarGroup.add(star);
    }
  }

  heading.depth = heading.depth+1;
  ins.depth = ins.depth+1;

  achievments.mousePressed(() => {
    gameState="achievments";
  });

  infinite_mode.mousePressed(() => {
    gameState="infinite";
  });

  instructions.mousePressed(() => {
    slide=1;
    gameState="instructions";
  });

  online.mousePressed(() => {
    gameState="online";
  });

  back.mousePressed(() => {
    gameState="menu";
  });

  if(gameState==="menu") {
    heading.visible = true;
    achievments.show();
    online.show();
    instructions.show();
    infinite_mode.show();
    back.hide();
  }else if(gameState==="achievments" || gameState==="instructions" || gameState==="online" || gameState==="infinite") {
    heading.visible = false;
    achievments.hide();
    online.hide();
    instructions.hide();
    infinite_mode.hide();
    back.show();
  }

  if(gameState==="infinite") {
    player.visible=true;
    player.addImage(rg);
  }else {
    player.visible=false;
  }

  if(slide===1) {
    ins.addImage(i1g);
  }else if(slide===2) {
    ins.addImage(i2g);
  }else if(slide===3) {
    ins.addImage(i3g);
  }else if(slide===4) {
    ins.addImage(i4g);
  }else if(slide===5) {
    ins.addImage(i5g);
  }else if(slide===6) {
    ins.addImage(i6g);
  }else if(slide===7) {
    ins.addImage(i7g);
  }else if(slide===8) {
    ins.addImage(i8g);
  }

  if(gameState==="instructions") {
    ins.visible=true;
  }else {
    ins.visible=false;
  }

  drawSprites();

  if(gameState==="instructions" && slide===1) {
    textAlign(CENTER);
    fill("red");
    text("arrow keys to advance",displayWidth/2,800);
  }
}

function keyReleased() {
  if(gameState==="instructions") {
    if(keyCode===RIGHT_ARROW) {
      slide = slide+1;
    }else if(keyCode===LEFT_ARROW) {
      slide = slide-1;
    }
  }
}