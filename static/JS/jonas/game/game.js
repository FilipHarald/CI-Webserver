var lastTime = 0;
var state;
var trail = [];


function init() {

    state = new CanvasState(document.getElementById('gameCanvas'));
    state.addBall(new Ball(400, 400, 30, '#CCFF00', 3));
    state.addBall(new Ball(600, 200, 20, '#CCFF00', 2));
    state.addBall(new Ball(500, 200, 10, '#CCFF00', 1));
    state.addBall(new Ball(800, 200, 60, '#CCFF00', 6));
    state.sortBallsDescendingOrder();
    for (i = 0; i < state.player.getRadius(); i++) {
        trail[i] = new TrailShadow(state.player.getX(), state.player.getY(), state.player.getRadius(), getRandomColor());
    }

    // Function is in input.js
    initInput();
    mainLoop();
}


function mainLoop() {
    var now = Date.now();
    var dt = (now - lastTime) / 1000.0;
    gravity();
    state.update(dt);
    state.draw();
    lastTime = now;
    window.requestAnimationFrame(mainLoop);
}
// Called by the 'Submit'-button in index.html 
function submitValues() {
    state.changeValues();
}

function randomizeBalls() {
    var sumBalls = parseInt(document.getElementById("amountOfBalls").value)
    state.balls.length = sumBalls;
    state.balls = generateBalls(state.balls.length);
}
function generateRandomBall() {
    var radius = Math.floor((Math.random() * 50) + 1);
    var mass = Math.floor((Math.random() * 10) + 1);
    var x = Math.random() * (state.width - 100) + 100;
    var y = Math.random() * (state.height - 100) + 100;
    var color = getRandomColor();
    return new Ball(x, y, 10, color, mass);

}

function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
function updatePlayerPos(player, dt) {
    var keys = player.pressedKeys;
    var nextVelocity = player.getVelocity().multiply(player.slideEffect); // TODO: Fix so this is affected by dt aswell.

    // Left
    if (_.contains(keys, 'left')) {
        if (_.contains(keys, 'up')) {
            nextVelocity = nextVelocity.add(new vector(-player.playerSpeed * dt * 0.7, -player.playerSpeed * dt * 0.7));
        } else if (_.contains(keys, 'down')) {
            nextVelocity = nextVelocity.add(new vector(-player.playerSpeed * dt * 0.7, player.playerSpeed * dt * 0.7));
        } else {
            nextVelocity = nextVelocity.add(new vector(-player.playerSpeed * dt, 0));
        }
    }

    // Right
    else if (_.contains(keys, 'right')) {
        if (_.contains(keys, 'up')) {
            nextVelocity = nextVelocity.add(new vector(player.playerSpeed * dt * 0.7, -player.playerSpeed * dt * 0.7));
        } else if (_.contains(keys, 'down')) {
            nextVelocity = nextVelocity.add(new vector(player.playerSpeed * dt * 0.7, player.playerSpeed * dt * 0.7));
        } else {
            nextVelocity = nextVelocity.add(new vector(player.playerSpeed * dt, 0));
        }
    }

    // Up & Down
    else if (_.contains(keys, 'up')) {
        nextVelocity = nextVelocity.add(new vector(0, -player.playerSpeed * dt));
    } else if (_.contains(keys, 'down')) {
        nextVelocity = nextVelocity.add(new vector(0, player.playerSpeed * dt));
    }

    player.setVelocity(nextVelocity);
    player.move();
}

function updateBallPos(dt, ball) {
    ball.setVelocity(ball.getVelocity().multiply(ball.slideEffect)); // TODO: Fix so this is affected by dt aswell.
    ball.move();
}