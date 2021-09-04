const Engine = Matter.Engine;
const World = Matter.World;
const body = Matter.Body;
const Bodies = Matter.Bodies;

var engine, world;

var particles = [];
var plinkos = [];
var divisions = [];

var particle;
var score = 0;
var count = 0;
var gameState = "start";


var divisionHeight = 300;
var score = 0;
function setup() {
  createCanvas(800, 800);

  engine = Engine.create();
  world = engine.world;

  ground = new Ground(width / 2, height, width, 20);


  for (var k = 0; k <= width; k = k + 80) {
    divisions.push(new Divisions(k, height - divisionHeight / 2, 10, divisionHeight));
  }


  for (var j = 75; j <= width; j = j + 50) {

    plinkos.push(new Plinko(j, 75));
  }

  for (var j = 50; j <= width - 10; j = j + 50) {

    plinkos.push(new Plinko(j, 175));
  }

  for (var j = 75; j <= width; j = j + 50) {

    plinkos.push(new Plinko(j, 275));
  }

  for (var j = 50; j <= width - 10; j = j + 50) {

    plinkos.push(new Plinko(j, 375));
  }




}



function draw() {
  background("black");

  Engine.update(engine);

  textSize(30)
  fill("blue");
  noStroke();
  textFont("Oswald");
  text("Score : " + score, 20, 30);
  fill("white");
  text("500", 10, 550);
  text("500", 90, 550);
  text("500", 170, 550);
  text("500", 250, 550);
  text("100", 330, 550);
  text("100", 410, 550);
  text("100", 490, 550);
  text("200", 570, 550);
  text("200", 650, 550);
  text("200", 730, 550);

  //text(mouseX + " : " + mouseY, 100, 80);



  for (var i = 0; i < plinkos.length; i++) {

    plinkos[i].display();
  }

  for (var k = 0; k < divisions.length; k++) {

    divisions[k].display();
  }
  ground.display();

  /* if (frameCount % 60 === 0) {
     particles.push(new Particle(random(width / 2 - 30, width / 2 + 30), 10, 10));
     score++;
   }*/

  for (var j = 0; j < particles.length; j++) {

    particles[j].display();
  }


  if (particle != null) {
    particle.display();

    if (particle.body.position.y > 760) {

      if (particle.body.position.x < 330) {
        score = score + 500;
        particle = null;
        if (count >= 5) gameState = "end";
      }

      else if (particle.body.position.x > 330 && particle.body.position.x < 560) {
        score = score + 100;
        particle = null;
        if (count >= 5) gameState = "end";
      }

      else if (particle.body.position.x > 562 && particle.body.position.x < 885) {
        score = score + 200;
        particle = null;
        if (count >= 5) gameState = "end";
      }
    }
  }



  if (gameState == "end") {
    fill(255, 0, 255);
    textSize(110);
    text("GAME OVER", 200, 500);
  }

}


function mousePressed() {
  if (gameState !== "end") {
    count++
    particle = new Particle(mouseX, 10, 10, 10);
  }
}