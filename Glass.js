class Glass extends BaseClass{
  constructor(x, y, width, height) {
    super(x, y, width, height);
    this.image = loadImage("sprites/glass.png");
    this.pts = loadImage("sprites/+15.png");

    this.counter = 0;
    this.locationX = null;
    this.locationY = null;
  }

  fade(){
    this.counter++;
    if(this.counter === 1){
      this.locationX = this.body.position.x;
      this.locationY = this.body.position.y
      window.score += 15;
    }

    if(this.counter < 35){
      image(this.pts, this.locationX, this.locationY - (30 + this.counter), 45, 30);
    }
  }

  display(){
    if(this.body.speed < 5){
      super.display();
    }else{
      Matter.World.remove(world, this.body);
      this.fade();
    }
  }
};
