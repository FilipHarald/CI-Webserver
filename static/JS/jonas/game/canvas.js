

function CanvasState(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');

    this.width = canvas.width;
    this.height = canvas.height;
    this.balls = [];

    this.player = new Player(40, 40, 20, '#00CCFF', 1);
}



CanvasState.prototype.changeValues = function() {

    var playerMass = parseInt(document.getElementById("mass").value);
    var playerRadius = parseInt(document.getElementById("radius").value);


    this.player.setMass(playerMass);
    this.player.setRadius(playerRadius);

}

CanvasState.prototype.addBall = function(ball) {
    this.balls.push(ball);
}

CanvasState.prototype.clear = function() {
    this.ctx.save();
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.ctx.restore();
}

CanvasState.prototype.draw = function(dt) {
    var ctx = this.ctx;
    var balls = this.balls;
    var player = this.player;
    this.clear();




    _.each(balls, function(ball) {
        ball.draw(ctx);
    });

    state.drawTrail();
    player.draw(ctx);
}

CanvasState.prototype.sortBallsDescendingOrder = function() {
    this.balls.sort(function(a, b) {
        return a.getRadius() - b.getRadius()
    });
}
CanvasState.prototype.drawTrail = function() {
    for (i = 0; i < trail.length; i++) {

        this.ctx.beginPath();
        this.ctx.arc(trail[i].getX(), trail[i].getY(), trail[i].getRadius() * (1 - i / trail.length), 0, 2 * Math.PI);
        this.ctx.fillStyle = getRandomColor();
        this.ctx.stroke();
        this.ctx.fill();
    }
}

CanvasState.prototype.update = function(dt) {

    checkWallCollision(this.player);
    updatePlayerPos(this.player, dt);
    var ts = trail.pop();
    this.clear(ts.getX(), ts.getY(), 10, 10);


    trail.unshift(new TrailShadow(this.player.getX(), this.player.getY(), this.player.getRadius()));
    // console.log();
    for (i = 0; i < this.balls.length; i++) {
        checkWallCollision(this.balls[i]);
        updateBallPos(dt, this.balls[i]);
    }
        this.collisionHandler();
}

CanvasState.prototype.collisionHandler = function(){
    switch(getGravityValue()){
        case 1:
        this.checkAllBallsForGravitationalCollision();
        break;
        // case 2:
        // this.checkAllBallsForInelasticCollision();
        // break;
        default:
        this.checkAllBallsForCollision();
    }
}
CanvasState.prototype.checkAllBallsForCollision = function() {

    for (i = 0; i < this.balls.length; i++) {
        if (checkBallCollision(this.player, this.balls[i])) {
            ballCollisionResponse(this.player, this.balls[i]);

        }
        for (k = i + 1; k < this.balls.length; k++) {
            if (checkBallCollision(this.balls[k], this.balls[i])) {
                ballCollisionResponse(this.balls[k], this.balls[i]);
            }
        }
    }
}
// CanvasState.prototype.checkAllBallsForInelasticCollision = function() {

//     for (i = 0; i < this.balls.length; i++) {
//         if (checkBallCollision(this.player, this.balls[i])) {
//             ballCollisionResponse(this.player, this.balls[i]);

//         }
//         for (k = i + 1; k < this.balls.length; k++) {
//             if (checkBallCollision(this.balls[k], this.balls[i])) {
//                 inelasticGravityCollisionResponse(this.balls[k], this.balls[i]);
//             }
//         }
//     }
// }
CanvasState.prototype.checkAllBallsForGravitationalCollision = function() {

    for (i = 0; i < this.balls.length; i++) {
        if (checkBallCollision(this.player, this.balls[i])) {
            ballCollisionResponse(this.player, this.balls[i]);

        }
        for (k = i + 1; k < this.balls.length; k++) {
            if (checkBallCollision(this.balls[k], this.balls[i])) {
                absorbedGravityBallCollisionResponse(this.balls[k], this.balls[i]);
            }
        }
    }
}