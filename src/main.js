var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var player = require('./paddle.js');
canvas.width = window.innerWidth * 0.9;
canvas.height = window.innerHeight * 0.9;
var ball = require('./ball.js');
// game = setTimeout(gameLoop, 1000 / 30);


// function collision() {
//
// }

function checkPlayerBounds() {
    // Check bounds
    var py2 = player.y + 100;
    if (player.y >= canvas.height - 100) {
        player.y = canvas.height - 100;
    }
    if (player.y <= 0) {
        player.y = 0;
    }
}

// function keyDown(e) {
//     if (e.keyCode == 32) pauseGame();
// }

function pauseGame() {
    var gamePaused = false;
  if (!gamePaused) {
    game = clearTimeout(game);
    gamePaused = true;
  } else if (gamePaused) {
    game = setTimeout(gameLoop, 1000 / 30);
    gamePaused = false;
  }
}

// console.log(e.keyCode);
gameLoop();

function gameLoop() {
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    player.update();
    player.render(ctx);
    ball.update(player);
    ball.render(ctx);
    checkPlayerBounds();
    // pauseGame();
    window.requestAnimationFrame(gameLoop);
}
