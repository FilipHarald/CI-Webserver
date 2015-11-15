function Player(x, y, radius, color, mass) {
    this.ball = new Ball(x, y, radius, color, mass);

    this.playerSpeed = 80;
    this.slideEffect = 0.90; // Between 0 - 1. 0 is no slide

    this.pressedKeys = [];
}

Player.prototype.getPosition = function() {
    return this.ball.getPosition();
}

Player.prototype.setPosition = function(position) {
    return this.ball.setPosition(position);
}

Player.prototype.getX = function() {
    return this.ball.getX();
}
Player.prototype.reverseX = function() {
    this.ball.reverseX();
}
Player.prototype.reverseY = function() {
    this.ball.reverseY();
}
Player.prototype.reverseDirection = function(){
    this.ball.reverseX();
    this.ball.reverseY();

}
Player.prototype.getY = function() {
    return this.ball.getY();
}
Player.prototype.getCopyFromArray = function(number){
    return this.ball.getCopyFromArray(number);
}
Player.prototype.createCopy = function(){
    return this.ball.createCopy();
}
Player.prototype.getLastGoodPosition = function() {
    return this.ball.getLastGoodPosition();
}
Player.prototype.getPreviousPositions = function() {
    return this.ball.getPreviousPositions();
}

Player.prototype.getVelocity = function() {
    return this.ball.getVelocity();
}
Player.prototype.setXPosition = function(x) {
    this.ball.setXPosition(x);
}
Player.prototype.setYPosition = function(y) {
    this.ball.setYPosition(y);
}
Player.prototype.setVelocity = function(nextVelocity) {
    this.ball.setVelocity(nextVelocity);
}

Player.prototype.getRadius = function() {
    return this.ball.getRadius();
}

Player.prototype.getMass = function() {
    return this.ball.getMass();
}

Player.prototype.move = function() {
    this.ball.move();
}
Player.prototype.getDistance = function(ball) {
    return this.ball.getDistance(ball);
}

Player.prototype.draw = function(ctx) {
    this.ball.draw(ctx);
}
Player.prototype.setRadius = function(radius) {
    this.ball.setRadius(radius);
}

Player.prototype.setMass = function(mass) {
    this.ball.setMass(mass);
}
function Ghostball(x,y,radius){
    this.x = x;
    this.y = y;
    this.velocity = new vector(0,0);
    this.radius = radius;
    this.position = new vector(x,y);
}
Ghostball.prototype.getX = function(){
return this.x;
}
Ghostball.prototype.getY = function(){
  return this.y;  
}
Ghostball.prototype.getRadius = function(){
   return this.radius; 
}
Ghostball.prototype.move = function() {
    this.position = this.position.add(this.velocity);
}
Ghostball.prototype.setVelocity = function(nextVelocity) {
    return this.velocity = nextVelocity;
}


function Ball(x, y, radius, color, mass) {
    this.position = new vector(x, y);
    this.previousPositions = [];
    this.lastGoodPosition = new vector(x, y);

    for (i = 0; i < 10; i++) {
        this.previousPositions.push(new vector(x, y));
    }


    this.velocity = new vector(0, 0);
    this.slideEffect = 0.98;

    this.radius = radius || 10; // Radius
    this.fill = color; // Color
    this.mass = mass;
}
Ball.prototype.setMass = function(mass) {
    this.mass = mass;
}
Ball.prototype.setRadius = function(radius) {
    this.radius = radius;
}
Ball.prototype.getPosition = function() {
    return this.position;
}
Ball.prototype.reverseX = function() {
    this.velocity.reverseX();
}
Ball.prototype.reverseY = function() {
    this.velocity.reverseY();
}
Ball.prototype.reverseDirection = function(){
    this.reverseX();
    this.reverseY();

}
Ball.prototype.createCopy = function(){
    // var x1 = this.position.getX();
    // var y1 = this.position.getY();
    // var b = new Ball(this.getX(),this.getY(), this.getRadius() , this.color,  this.getMass() );
    // b.setVelocity(this.getVelocity());
    // return b;
}
Ball.prototype.getCopyFromArray = function(number){
    var pos = this.previousPositions[number];
    var x = pos.getX();
    var y = pos.getY();

    return new Ball(x, y, this.radius , this.color, this.mass);
}
Ball.prototype.setPosition = function(position) {
    this.position = position;
}

Ball.prototype.getX = function() {
    return this.getPosition().getX();
}

Ball.prototype.getY = function() {
    return this.getPosition().getY();
}

Ball.prototype.getLastGoodPosition = function() {
    return this.lastGoodPosition;
}
Ball.prototype.getPreviousPositions = function() {
    return this.previousPositions;
}

Ball.prototype.getVelocity = function() {
    return this.velocity;
}
Ball.prototype.normalVector = function(otherBall) {

    var pos = this.getPosition();
    var otherPos = otherBall.getPosition();
    var normal = pos.normalVector(otherPos);
    // console.log("Pos: ");
    // console.log(pos);
    //  console.log("Otherpos: ");
    // console.log(otherPos);
    var v = this.getPosition().normalVector(otherBall.getPosition()); 
        // debugger;
   //      console.log("otherBall.getPosition()");
   //      console.log(otherBall.getPosition());
   //      console.log(otherPos);
   
   //  console.log("V:" );
   //  console.log(v);
   // var normalV = v.normalise();

 
   // console.log("Normal:" );
   // console.log(normalV);
    return v;
}

Ball.prototype.setVelocity = function(nextVelocity) {
    return this.velocity = nextVelocity;
}
Ball.prototype.setXPosition = function(x) {
    this.position.setX(x);
}
Ball.prototype.setYPosition = function(y) {
    this.position.setY(y);
}
Ball.prototype.getDistance = function(ball) {
    var xDist = ball.getX() - this.getX();
    var yDist = ball.getY() - this.getY();
    var dist = Math.sqrt((xDist * xDist) + (yDist * yDist));
    return dist;
}
Ball.prototype.getRadius = function() {
    return this.radius;
}

Ball.prototype.getMass = function() {
    return this.mass;
}

Ball.prototype.move = function() {
    this.previousPositions.unshift(this.position);
    this.previousPositions.pop();
    this.lastGoodPosition = this.position;
    this.position = this.position.add(this.velocity);
}

Ball.prototype.draw = function(ctx) {
    ctx.beginPath();

    ctx.arc(this.getX(), this.getY(), this.radius, 0, 2 * Math.PI);
    ctx.fillStyle = this.fill;
    ctx.fill();
    ctx.stroke();
}

function TrailShadow(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
}
TrailShadow.prototype.getX = function() {
    return this.x;
}
TrailShadow.prototype.getY = function() {
    return this.y;
}
TrailShadow.prototype.getRadius = function() {
    return this.radius;
}
TrailShadow.prototype.getColor = function() {
    return this.color;
}
TrailShadow.prototype.setX = function(x) {
    this.x = x;
}
TrailShadow.prototype.setY = function(y) {
    this.y = y;
}
TrailShadow.prototype.setRadius = function(radius) {
    this.radius = radius;
}
TrailShadow.prototype.setColor = function(color) {
    this.color = color;
}