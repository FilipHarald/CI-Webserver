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
  <body>
    <section class="page-header">
      <h1 class="project-name">Search for a User</h1>
      <h2 class="project-tagline"></h2>
    </section>
    <section class="main-content">
      <h3>
        <p>Enter a spotify user by the username in order to retrieve their profile picture (assuming they have one)</p>
        Spotify User: <input type="text" id="spotifyUser" value="">
        <button onclick="getSpotifyUser()">Get User</button>
      </h3>
        <img src="" alt="" id="spotifyImage">

    <footer class="site-footer">
      <span class="site-footer-owner"><a href="https://github.com/Kommendant/hardkode">Hardkode</a> is maintained by The Hardkode crew.</span>
    </footer>
    </section>
    <script type="text/javascript" src="/static/JS/jonas/spotifySearch_scripts.js"></script>
  </body>
</html>
