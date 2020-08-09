class Pig extends BaseClass{
  constructor(x, y, width, height) {
    super(x, y, 60, 60);
    this.image = loadImage("sprites/enemy.png");

    this.smoke1 = loadImage("sprites/smoke1.png");
    this.smoke2 = loadImage("sprites/smoke2.png");
    this.smoke3 = loadImage("sprites/smoke3.png");
    this.smoke4 = loadImage("sprites/smoke4.png");

    this.pts = loadImage("sprites/+100.png");

    this.dead = false;
    this.counter = 0;
    this.locationX = null;
    this.locationY = null;

    this.damageLevel = 0;
  }

  fade(){
    this.counter++;
    if(this.counter === 1){
      this.locationX = this.body.position.x;
      this.locationY = this.body.position.y
      window.score+= 100;
    }

    if(this.counter < 35){
      image(this.pts, this.locationX, this.locationY - (30 + this.counter), 60, 30);
    }

    if(this.counter < 7){
      image(this.smoke1, this.locationX, this.locationY, 40, 40);
    }else if(this.counter < 14){
      image(this.smoke2, this.locationX, this.locationY, 50, 50);
    }else if(this.counter < 21){
      image(this.smoke3, this.locationX, this.locationY, 60, 60);
    }else if(this.counter < 28){
      image(this.smoke4, this.locationX, this.locationY, 70, 70);
    }else if(this.counter < 35){
      Matter.World.remove(world, this.body);
    }
  }

  display(){
    if(this.body.speed > 2 && this.damageLevel === 0){
      this.image = loadImage("sprites/enemyDamaged.png");
      this.damageLevel = 1;
    }else if(this.body.speed > 3 && this.damageLevel === 1){
      this.image = loadImage("sprites/enemyCritical.png");
      this.damageLevel = 2;
    }else if(this.body.speed < 4 && this.dead === false){
      super.display();
    }else{
      this.dead = true;
      this.fade();
    }
  }
};
