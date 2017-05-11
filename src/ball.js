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
