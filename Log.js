class Log extends BaseClass{
  constructor(x, y, height, angle) {
    super(x, y, 20, height, angle);
    this.image = loadImage("sprites/wood2.png");
    Matter.Body.setAngle(this.body, angle);

    this.pts = loadImage("sprites/+25.png");

    this.counter = 0;
    this.locationX = null;
    this.locationY = null;
  }

  fade(){
    this.counter++;
    if(this.counter === 1){
      this.locationX = this.body.position.x;
      this.locationY = this.body.position.y
      window.score += 25;
    }
    
    if(this.counter < 35){
      image(this.pts, this.locationX, this.locationY - (30 + this.counter), 45, 30);
    }
  }

  display(){
    if(this.body.speed < 13){
      super.display();
    }else{
      Matter.World.remove(world, this.body);
      this.fade();
    }
  }
};
