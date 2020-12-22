const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var box1, pig1;
var slingshot;
var backdrop;
var hill;
var testBox;

var xCheck, yCheck;
var slingshotBit;
var fired, createStreak;

var glass1, glass2, glass3, glass4;

var smoke, smokes;
var overlay;
var gamestate, endCounter;
var overlaySize;
var scoreY, scoreDirection;
var star1, star2, star3;
var star1Y, start2Y, start3Y;
var textCounter;

var hour;

var bg = "sprites/halloween.png";
window.score;

function preload() {
  backdrop = loadImage("sprites/bg.png");
  slingshotBit = loadImage("sprites/sling2.png");
  smoke = loadImage("sprites/smoke.png");
  overlay = loadImage("sprites/overlay.png");
  star1 = loadImage("sprites/star1.png");
  star2 = loadImage("sprites/star2.png");
  star3 = loadImage("sprites/star3.png");

  //load in our background
  getBackdropImg();
}

function setup() {
  var canvas = createCanvas(1200, 400);
  engine = Engine.create();
  world = engine.world;

  ground = new Ground(600, height, 120000, 20);
  hill = new Ground(100, height, 200, 300);

  box1 = new Box(700, 320, 70, 70);
  box2 = new Box(920, 320, 70, 70);
  pig1 = new Pig(810, 350);
  log1 = new Log(810, 260, 300, PI / 2);

  glass1 = new Glass(700, 240, 50, 50);
  glass2 = new Glass(920, 240, 50, 50);
  glass3 = new Glass(700, 240, 50, 50);
  glass4 = new Glass(920, 240, 50, 50);
  pig3 = new Pig(810, 220);

  log3 = new Log(810, 180, 230, PI / 2);

  box5 = new Box(810, 160, 70, 70);
  log4 = new Log(760, 120, 150, PI / 7);
  log5 = new Log(870, 120, 150, -PI / 7);

  bird = new Bird(140, 150);
  fired = false;

  slingshot = new Slingshot(bird.body, { x: 160, y: 120 }, 1, 0.015);

  smokes = [];
  window.score = 0;
  endCounter = 0;
  gamestate = "playing";

  scoreY = 30;
  scoreDirection = "up";

  overlaySize = 1;

  star1Y = 1000;
  star2Y = 1000;
  star3Y = 1000;

  textCounter = 0;
}

function draw() {
  if (backdrop) {
    background(backdrop);
  }

  if (gamestate === "playing") {
    Engine.update(engine);
  }

  box1.display();
  box2.display();
  ground.display();
  hill.display();
  pig1.display();
  log1.display();

  glass1.display();
  glass2.display();
  glass3.display();
  glass4.display();
  pig3.display();
  log3.display();

  box5.display();
  log4.display();
  log5.display();

  slingshot.display();

  bird.display();

  image(slingshotBit, 131, 95, 38 * 0.75, 123 * 0.75);

  if (mouseIsPressed) {
    if (mouseX >= 0 && mouseX < 200 && fired === false) {
      Matter.Body.setPosition(bird.body, { x: mouseX, y: mouseY });
    }
  }

  //create smoke trail
  if (
    fired === true &&
    bird.body.velocity.x > 13 &&
    bird.body.position.x > 160 &&
    frameCount % 3 === 0
  ) {
    smokes.push([bird.body.position.x, bird.body.position.y]);
  }

  //display smoke trail
  for (var x = 0; x < smokes.length; x++) {
    image(smoke, smokes[x][0], smokes[x][1], 20, 20);
  }

  //cap speed
  if (bird.body.velocity.x > 30) {
    //Matter.Body.setVelocity(bird.body, {x: 30, y: bird.body.velocity.y})
    Matter.Body.applyForce(bird.body, bird.body.position, {
      x: bird.body.velocity.x * -1,
      y: 0,
    });
  }

  if (bird.body.velocity.y > 15) {
    Matter.Body.applyForce(bird.body, bird.body.position, {
      x: 0,
      y: bird.body.velocity.x * -1,
    });
  }

  if (bird.body.velocity.y < -15) {
    Matter.Body.applyForce(bird.body, bird.body.position, {
      x: 0,
      y: bird.body.velocity.x,
    });
  }

  //draw the overlay
  if (gamestate === "over") {
    if (overlaySize < 100) {
      overlaySize++;
    }
    image(
      overlay,
      600 - overlaySize * 6,
      200 - overlaySize * 2,
      overlaySize * 12,
      overlaySize * 4
    );
  }

  //display score
  textAlign(CENTER);
  console.log(hour);
  if (scoreDirection === "up") {
    if (hour >= 08 && hour <= 17) {
      fill("black");
    } else {
      fill("white");
    }
  } else {
    stroke("white");
    fill("white");
  }
  textSize(35);
  text("SCORE: " + window.score, 600, scoreY);
  stroke("black");
  if (gamestate === "over" && scoreY > -50 && scoreDirection === "up") {
    scoreY--;
    if (scoreY === -50) {
      scoreDirection = "down";
    }
  } else if (scoreDirection === "down" && scoreY < 100) {
    scoreY += 2;
  }

  //end the game
  if (bird.body.speed < 0.4 && fired === true) {
    endCounter++;
    if (endCounter === 200) {
      gamestate = "over";
    }
  }

  //draw the stars
  imageMode(CENTER);
  image(star1, 475, star1Y, 100, 100);
  image(star2, 600, star2Y, 120, 120);
  image(star3, 725, star3Y, 100, 100);
  imageMode(CORNER);
  if (gamestate === "over") {
    if (window.score >= 0 && star1Y > 200) {
      star1Y -= 6;
    }

    if (window.score >= 200 && star2Y > 180) {
      star2Y -= 5;
    }

    if (window.score >= 100 && star3Y > 200) {
      star3Y -= 5.5;
    }
  }

  //draw blinking text
  textCounter++;
  if (star1Y <= 200 && textCounter > 30) {
    noStroke();
    text("Press Space To Reset", 600, 300);
    stroke("black");
  }

  if (textCounter > 60) {
    textCounter = 0;
  }
}

function mouseReleased() {
  if (fired === false) {
    slingshot.fly();
    fired = true;
  }
}

function keyPressed() {
  if (keyCode === 32 && star1Y <= 200) {
    window.location.reload();
  }
}

async function getBackdropImg() {
  var response = await fetch(
    "http://worldtimeapi.org/api/timezone/Asia/Kolkata"
  );
  var responseJson = await response.json();
  var datetime = responseJson.datetime;
  hour = datetime.slice(11, 13);

  if (hour >= 08 && hour <= 17) {
    bg = "sprites/bg.png";
  } else {
    bg = "sprites/halloween.png";
  }

  backdrop = loadImage(bg);
}
