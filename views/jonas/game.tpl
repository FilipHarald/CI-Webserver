<!DOCTYPE html>
<html lang="en-us">
    <head>
        <meta charset="UTF-8">
        <title>Hardkode</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        
    <link rel="stylesheet" type="text/css" href="/static/Css/jonas/normalize.css" media="screen">
    <link href='https://fonts.googleapis.com/css?family=Open+Sans:400,700' rel='stylesheet' type='text/css'>
    <link rel="stylesheet" type="text/css" href="/static/Css/jonas/stylesheet.css" media="screen">
    <link rel="stylesheet" type="text/css" href="/static/Css/jonas/github-light.css" media="screen">
    <link rel="stylesheet" type="text/css" href="/static/Css/jonas/basics.css">
        </head>
        <body onload="init();">
            <section class="page-header">
                <h1 class="project-name">The Game</h1>
                <h2 >Legitimately stolen from Brolof</h2>
            </section>
            <section class="main-content">
                <h2>
                The Game
                </h2>
                <p>
                The balls react on contact and the math is based on vectors.
                </p>
                <p>
                Controls for the player (blue ball) are the arrow keys.
                </p>
                Mass and radius for the player can be changed by changing the value in the corresponding boxes and submitting them.
                Any number of balls can be randomly generated however if there is not enough room on the canvas all balls won't see
                the light of day.
                <p>
                The experimental gravity mode currently does not have support for interaction with the player, strange bugs can happen.
                Weird things happen when mass is set to a negative value.
                Negative value of the radius will result in a failure to execute, same goes for amount of balls
                (Will be fixed later).
                <p>
                <b>Math for trail</b>:
                </p>
                trail[i].getRadius()* (1-i/trail.length) <=> trail[i].getRadius() -i*trail[i].getRadius()/trail.length;
                <p>
                <b>Explained</b>:
                </p>
                Each update iteration the current position and radius of the player is stored first in a trail array.
                When drawn, each trail is drawn with the position it was stored and with the radius: <br><i>PlayerStartRadius - (numberInArray*(PlayerStartRadius))/amountOfTrails) </i>
                <br>
                <p>
                Y = trailSize; &nbsp X = PlayerRadius; &nbsp i = iteration; &nbsp k = trails;
                <br>
                Formula: Y = X(1-i/k);
                </p>
               
                Ex:
                <br>
                Player radius = 20;
                <br>
                Number of trails = 30;
                <br>
                For the 10th trail the radius will be: 20-(10*20)/30 =20-20/3 ~ 6.67
                
                <h3>
                Player
                </h3>
                Radius: <input type="number" id="radius" value="20">
                Mass: <input type="number" id="mass" value="1">
                <button onclick="submitValues()">Submit Values</button>
                <h3>
                Generic
                </h3>
                Ballz: <input type="number" id="amountOfBalls" value="4">
                <button onclick="randomizeBalls()">Randomize Balls</button>
                <input type="button" value="No Gravity" id="gravitySwitch" onclick="changeGravity()">
                <h3>
                <canvas id="gameCanvas" width="1200" height="1200"></canvas>
                <footer class="site-footer">
                    <span class="site-footer-owner"><a href="https://github.com/Kommendant/hardkode">Hardkode</a> is maintained by The Hardkode crew.</span>
                </footer>
            </section>
            <script type="text/javascript" src="/static/JS/jonas/game/gravity.js"></script>
            <script type="text/javascript" src="/static/JS/jonas/game/entities.js"></script>
            <script type="text/javascript" src="/static/JS/jonas/game/input.js"></script>
            <script type="text/javascript" src="/static/JS/jonas/game/collision.js"></script>
            <script type="text/javascript" src="/static/JS/jonas/game/canvas.js"></script>
            <script type="text/javascript" src="/static/JS/jonas/game/vector.js"></script>
            <script type="text/javascript" src="/static/JS/jonas/util.js"></script>
            <script type="text/javascript" src="/static/JS/jonas/game/game.js"></script>
            <!-- Lib -->
            <script type="text/javascript" src="/static/JS/jonas/lib/jquery-2.1.4.js"></script>
            <script type="text/javascript" src="/static/JS/jonas/lib/underscore-1.8.3.js"></script>
        </body>
    </html>