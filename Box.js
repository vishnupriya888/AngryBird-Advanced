class Box extends BaseClass{
  constructor(x, y, width, height) {
    super(x, y, width, height);
    this.image = loadImage("sprites/wood1.png");
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
    if(this.body.speed < 15){
      super.display();
    }else{
      Matter.World.remove(world, this.body);
      this.fade();
    }
  }
};
