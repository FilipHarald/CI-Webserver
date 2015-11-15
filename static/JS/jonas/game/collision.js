function allowedPlacement(ball) {
    var allowed = true;
    for (var y = 0; y < state.balls.length; y++) {
        // console.log("Checking round " + y );
        if (ball.getX() == state.balls[y].getX() && ball.getY() == state.balls[y].getY()) {
            continue;
        }
        if (checkBallCollision(ball, state.balls[y])) {
            allowed = false;
        }

    }
    // console.log("Returning with " + allowed);
    return allowed;
}
// Tries to generate k randomly placed balls on the canvas with a max 
// attempt of k*10 iterations to ensure it doesn't end in an infinite loop
function generateBalls(k) {

    var placed = 0;
    var placedBalls = [];

    var maxAttempts = k * 10;


    while (placed < k && maxAttempts > 0) {
        var tempBall = generateRandomBall();
        var available = true;

        while (checkBallCollision(tempBall, state.player)) {
            tempBall = generateRandomBall();
        }
        for (i = 0; i < placedBalls.length; i++) {
            if (checkBallCollision(placedBalls[i], tempBall)) {
                available = false;
                break;
            }
        }
        if (available) {


            placedBalls.push(tempBall);
            placed += 1;
        }
        maxAttempts -= 1;
    }

    return placedBalls;
}

function checkBallCollision(player, ball) {
    var xDistance = ball.getX() - player.getX();
    var yDistance = ball.getY() - player.getY();
    var distanceBetween = Math.sqrt((xDistance * xDistance) + (yDistance * yDistance));

    var sumOfRadius = ((player.getRadius()) + (ball.getRadius()));

    if (distanceBetween < sumOfRadius) {

        return true;

    } else {

        return false;
    }
}

function checkWallCollision(ball) {

    if (ball.getX() - ball.getRadius() < 0) {
        ball.reverseX();
        ball.setXPosition(ball.getRadius());
    }
    if (ball.getX() + ball.getRadius() > state.width) {
        ball.reverseX();
        ball.setXPosition(state.width - ball.getRadius());
    }


    if (ball.getY() - ball.getRadius() < 0) {
        ball.reverseY();
        ball.setYPosition(ball.getRadius());

    }


    if (ball.getY() + ball.getRadius() > state.height) {
        ball.reverseY();
        ball.setYPosition(state.height - ball.getRadius());
    }

}

function ballCollisionResponse(player, ball) {

    //Distance between the balls

    var xDistance = ball.getX() - player.getX();
    var yDistance = ball.getY() - player.getY();

    //Normal vectors
    var normalVector = new vector(xDistance, yDistance);
    normalVector = normalVector.normalise();

    //The tangentvector, computed by transforming v(x1,y1) -> u(-y1, x1)
    var tangentVector = new vector((normalVector.getY() * -1), normalVector.getX());

    //Dot product, (x1*x2 + y1*y2) -> the length of the projection of one vector on the other
    // or the force computed in a direction
    var playerscalarNormal = normalVector.dot(player.getVelocity());
    var ballscalarNormal = normalVector.dot(ball.getVelocity());

    //tangentvector dot product with current velocity
    var playerscalarTangential = tangentVector.dot(player.getVelocity());

    var ballscalarTangential = tangentVector.dot(ball.getVelocity());
    // t
    var playerScalarNormalAfter = (playerscalarNormal * (player.getMass() - ball.getMass()) + 2 * ball.getMass() * ballscalarNormal) / (player.getMass() + ball.getMass());
    var ballScalarNormalAfter = (ballscalarNormal * (ball.getMass() - player.getMass()) + 2 * player.getMass() * playerscalarNormal) / (player.getMass() + ball.getMass());

    var playerscalarNormalAfter_vector = normalVector.multiply(0.5 * playerScalarNormalAfter);
    var ballscalarNormalAfter_vector = normalVector.multiply(0.5 * ballScalarNormalAfter);

    var playerScalarNormalVector = (tangentVector.multiply(playerscalarTangential));
    var ballScalarNormalVector = (tangentVector.multiply(ballscalarTangential));

    player.setVelocity(playerScalarNormalVector.add(playerscalarNormalAfter_vector));
    ball.setVelocity(ballScalarNormalVector.add(ballscalarNormalAfter_vector));

    var u = 0;
    var playerLastPos = player.getPreviousPositions();
    var ballLastPos = ball.getPreviousPositions();
    //while ball still collides, go back one position in array of positions.
    while (checkBallCollision(player, ball) && u < player.getPreviousPositions().length && ball.getPreviousPositions().length) {

        player.setPosition(playerLastPos[u].add(player.getVelocity()));
        ball.setPosition(ballLastPos[u].add(ball.getVelocity()));
        u++;
    }
}

function absorbedGravityBallCollisionResponse(ball1, ball) {
    var ballRadius = ball.getRadius();
    var ball1Radius = ball1.getRadius();
    var ballMass = ball.getMass();
    var ball1Mass = ball1.getMass();
    var velocityChange = new vector(0.005,0.005);
    var radiusChange = 1;
    var massChange = 0.1;
    if(ballMass <= 1) ball.setMass(1);
    if(ball1Mass <= 1) ball1.setMass(1);
    if(ball1Mass < 0|| ballMass <0 ){
        // console.log("Something wrong with mass");
        debugger;


    }
    if (ballRadius > ball1Radius) {
        // console.log("Ball radius " + ballRadius + "  Ball1Radius " + ball1Radius);
        ball.setRadius(ballRadius + radiusChange/(2*Math.PI));
        ball1.setRadius(ball1Radius - radiusChange);
        ball.setMass(ballMass + massChange);
        ball1.setMass(ball1Mass - massChange);
        ball.setVelocity(ball.getVelocity().add(velocityChange));
        ball1.setVelocity(ball1.getVelocity().add(velocityChange.multiply(-1)));

    } else {
        ball.setRadius(ballRadius - radiusChange);
        ball1.setRadius(ball1Radius + radiusChange/(2*Math.PI));
        ball.setMass(ballMass - massChange);
        ball1.setMass(ball1Mass + massChange);
        ball.setVelocity(ball.getVelocity().add(velocityChange).multiply(-1));
        ball1.setVelocity(ball1.getVelocity().add(velocityChange));

    }


    if (ballRadius < 4) {
       
        state.balls.splice(state.balls.indexOf(ball), 1);
        


    } if (ball1Radius < 4) {
       
        state.balls.splice(state.balls.indexOf(ball1), 1);
        

    }
    ballCollisionResponse(ball,ball1);
 state.sortBallsDescendingOrder();

}