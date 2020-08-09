class Slingshot{
    constructor(body1, pointB, length, stiffness){
        var slingshot_options = {
            bodyA: body1,
            pointB: pointB,
            length: length,
            stiffness: stiffness
        }

        this.sling1 = loadImage("sprites/sling1.png");
        this.sling2 = loadImage("sprites/sling2.png");
        this.sling3 = loadImage("sprites/sling3.png");
        this.sling = Constraint.create(slingshot_options);
        this.pointB = pointB;
        World.add(world, this.sling);
    }

    display(){
        stroke('#301708');
        strokeWeight(4);

        var pointA = this.sling.bodyA;
        var pointB = this.pointB;

        if(this.sling.bodyA !== null){
            //160 130
            line(pointA.position.x - 10, pointA.position.y, 140, 120);
            line(pointA.position.x + 10, pointA.position.y, 175, 117.5);
            image(this.sling3, pointA.position.x - 20, pointA.position.y, 47.5, 15);
        }

        image(this.sling1, 150, 100, 38 * 0.75, 199 * 0.75);
    }

    fly(){
        this.sling.bodyA = null;
    }
}