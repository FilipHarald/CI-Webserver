gravityValue = 0;

function changeGravity() {
    
    if (gravityValue == 0) {
        gravityValue = 1;
        document.getElementById("gravitySwitch").value = "Absorption Gravity";
      
        
    } else if (gravityValue == 1) {

        document.getElementById("gravitySwitch").value = "Inelastic Gravity";
        gravityValue = 2;
    } else{
        document.getElementById("gravitySwitch").value = "No Gravity";
       gravityValue = 0;
       }
}

function getGravityValue() {
    return gravityValue;
}

function gravity() {
    if (gravityValue!=0) {
        for (i = 0; i < state.balls.length; i++) {
            for (j = 0; j < state.balls.length; j++) {
                if (i == j) {
                    continue;
                }



                var thisBall = state.balls[i];
                var otherBall = state.balls[j];
                // debugger;
                var dist = thisBall.getDistance(otherBall);
                var diffX = otherBall.getX() - thisBall.getX();
                var diffY = otherBall.getY() - thisBall.getY();
                var distSquare = diffX * diffX + diffY * diffY;
                var dist = Math.sqrt(distSquare);
                var vx1 = thisBall.getVelocity().getX();
                var vy1 = thisBall.getVelocity().getY();
                var vx2 = otherBall.getVelocity().getX();
                var vy2 = otherBall.getVelocity().getY();
                var m1 = thisBall.getMass();
                var m2 = otherBall.getMass();
                if (m1 < 0 || m2 < 0) {
                    // debugger;
                }
                // console.log("m1 " + m1 + " m2" + m2);
                var gravitationalConstant = 5;
                // console.log(dist);
                if (dist > thisBall.getRadius() + otherBall.getRadius()) {
                    var totalForce = gravitationalConstant * (thisBall.getMass() * otherBall.getMass()) / distSquare;
                    var vx1 = vx1 + totalForce * diffX / dist;
                    var vy1 = vy1 + totalForce * diffY / dist;
                    thisBall.setVelocity(new vector(vx1, vy1));



                } else {

                    var tempX = (m1 * vx1 + m2 * vx2) / (m1 + m2);
                    var tempY = (m1 * vy1 + m2 * vy2) / (m1 + m2);
                    var vxvy = new vector(tempX, tempY);
                    thisBall.setVelocity(vxvy);
                    otherBall.setVelocity(vxvy);

                    // obj1.vy = tempY;
                    // obj2.vy = tempY;
                }


            }
        }



    }

}



// function gravityAbsorb() {
//     if (gravityOn) {
//         for (i = 0; i < state.balls.length; i++) {
//             for (j = i + 1; j < state.balls.length; j++) {


//                 var thisGravityVector = new vector(0, 0);
//                 var otherGravityVector = new vector(0, 0);
//                 var thisBall = state.balls[i];
//                 var otherBall = state.balls[j];
//                 //  while(checkCollision(thisBall,otherBall)){
//                 //     ballCollisionResponse(thisBall,otherBall);
//                 // }
//                 // thisBall.setRadius(thisBall.getRadius()-0.01);
//                 var gravMultiplier = 10;


//                 dist = thisBall.getDistance(otherBall);

//                 // while(thisBall.inC)
//                 var gravitationalConstantThis = gravMultiplier * (otherBall.getMass() / (dist * dist));
//                 var gravitationalConstantOther = gravMultiplier * (thisBall.getMass() / (dist * dist));
//                 //console.log(gravitationalConstant);


//                 //Normalised normal between this ball and other ball
//                 var normVector1 = thisBall.normalVector(otherBall);


//                 // normVector1 = normVector1.multiply(otherBall.getMass()*thisBall.getMass() * 0.00001);
//                 normVector1 = normVector1.multiply(gravMultiplier * gravitationalConstantThis);



//                 var normVector2 = otherBall.normalVector(thisBall);


//                 // normVector2 = normVector2.multiply(thisBall.getMass()*thisBall.getMass() * 0.00001);
//                 normVector2 = normVector2.multiply(gravMultiplier * gravitationalConstantOther);

//                 thisGravityVector = thisGravityVector.add(normVector1);
//                 otherGravityVector = otherGravityVector.add(normVector2);

//                 //TODO implement closer affecting gravity!
//                 var thisVelocity = thisBall.getVelocity().add(thisGravityVector);
//                 var otherVelocity = otherBall.getVelocity().add(otherGravityVector);


//                 thisBall.setVelocity(thisVelocity);
//                 otherBall.setVelocity(otherVelocity);



//             }



//         }
//         // console.log(state.balls.length);
//     }
// }