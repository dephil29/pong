(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var ball = {
  x: 366,
  y: 67,
  w: 15,
  h: 15,
  velX: -12,
  velY: 9,

  update: function(player) {
    ball.x += ball.velX;
    ball.y += ball.velY;
    if (ball.y + ball.h >= canvas.height) {
        ball.velY = ball.velY * -1;
    }
    if (ball.x + ball.w >= canvas.width) {
        ball.velX = ball.velX * -1;
    }
    if (ball.y <= 0) {
        ball.velY = ball.velY * -1;
    }
    var collision = ball.detectCollisions(player);
    if(collision === "bottom"){
        // ball.x = player.y + player.h;
        ball.velX *= -1;
        ball.velY *= -1;
    }
    if(collision === "left"){
        // ball = player.y + player.h;
        ball.velX *= -1;
        // ball.velY *= -1;
    }
    if(collision === "top"){
        // ball.y = player.y + player.h;
        ball.velX *= -1;
        ball.velY *= -1;
    }
    if(collision === "top-left") {
        ball.velX *= -1;
        ball.velY *= -1;
    }
    // if(topRightCollision) return "top -right";
    // if(btmLeftCollision) return "btm-left";
    if(collision === "btm-left") {
        ball.velX *= -1;
        ball.velY *= -1;
    }
    // if(btmRightCollision) return "btm-right"
  },
  render: function (ctx) {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(ball.x, ball.y, ball.w, ball.h);
  },

  detectCollisions: function (player) {
    var px = player.x;
    var px2 = player.x + player.w;
    var py = player.y;
    var py2 = player.y + player.h;
    var bx = ball.x;
    var bx2 = ball.x + ball.w;
    var by = ball.y;
    var by2 = ball.y + ball.h;
    var btmLeftCollision = bx >= px && bx <= px2 && by2 >= py && by2 <= py2;
    var btmRightCollision = bx2 >= px && bx2 <= px2 && by2 >= py && by2 <= py2;
    var topLeftCollision = bx >= px && bx <= px2 && by >= py && by <= py2;
    var topRightCollision = bx2 >= px && bx2 <= px2 && by >= py && by <= py2;

    if(btmRightCollision && btmLeftCollision) return "bottom";
    if(topLeftCollision && btmLeftCollision) return "left";
    if(topLeftCollision && topRightCollision) return "top";
    if(topLeftCollision) return "top-left";
    if(topRightCollision) return "top -right";
    if(btmLeftCollision) return "btm-left";
    if(btmRightCollision) return "btm-right"
    }
  }


module.exports = ball;

},{}],2:[function(require,module,exports){
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

},{"./ball.js":1,"./paddle.js":3}],3:[function(require,module,exports){
var paddle = {
  x: 50,
  y: 225,
  w: 30,
  h: 100,
  speed: 10,

  update: function() {
    if (this.direction === "up"){
      this.y = this.y - this.speed;
    } else if (this.direction === "down"){
      this.y += this.speed;
    }
  },
  render: function (ctx) {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(this.x, this.y, this.w, this.h);
  }
}

document.addEventListener('keydown', function(e) {
  // console.log(e.keyCode);
  if(e.keyCode === 38) paddle.direction = "up";
  else if (e.keyCode === 40) paddle.direction = "down";
});

document.addEventListener("keyup", function(e) {
  if(e.keyCode === 38 || e.keyCode === 40) paddle.direction = null;
})

module.exports = paddle;

},{}]},{},[2]);
