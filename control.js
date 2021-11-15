//Variables and start
const GAME = (function () {
  let time = 50;
  let movement = 20;
  let movementRod = 20;
  let width = document.documentElement.clientWidth - movement;
  let height = document.documentElement.clientHeight - movement;
  let controlGame;
  let player1;
  let player2;

  //Start game
  function start() {
    init();
    controlGame = setInterval(play, time);
  }

  function init() {
    ball.style.left = 0;
    ball.state = 1;
    ball.direction = 1; // moving to right 1 and left 2
    player1 = new Object();
    player2 = new Object();
    player1.keyPress = false;
    player1.keyCode = null;
    player2.keyPress = false;
    player2.keyCode = null;
  }

  //When stop the game
  function stop() {
    clearInterval(controlGame);
    document.body.style.background = "#0080ff";
  }

  function play() {
    moveBall();
    moveRod();
    checkIfLost();
  }

  function checkIfLost() {
    if (ball.offsetLeft >= width) {
      stop();
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Player 1 gana, F5 para reinicar",
        showConfirmButton: true,
        timer: 5500,
      });
    }
    if (ball.offsetLeft <= 0) {
      stop();
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Player 2 gana, F5 para reiniciar",
        showConfirmButton: true,
        timer: 5500,
      });
    }
  }
  //Logica when ball is going to move
  function moveBall() {
    checkStateBall();
    switch (ball.state) {
      case 1: // right, down
        ball.style.left = ball.offsetLeft + movement + "px";
        ball.style.top = ball.offsetTop + movement + "px";
        break;
      case 2: // right, up
        ball.style.left = ball.offsetLeft + movement + "px";
        ball.style.top = ball.offsetTop - movement + "px";
        break;
      case 3: // left, down
        ball.style.left = ball.offsetLeft - movement + "px";
        ball.style.top = ball.offsetTop + movement + "px";
        break;
      case 4: // left, up
        ball.style.left = ball.offsetLeft - movement + "px";
        ball.style.top = ball.offsetTop - movement + "px";
        break;
    }
  }

  function checkStateBall() {
    if (collidePlayer2()) {
      ball.direction = 2;
      if (ball.state == 1) ball.state = 3;
      if (ball.state == 2) ball.state = 4;
    } else if (collidePlayer1()) {
      ball.direction = 1;
      if (ball.state == 3) ball.state = 1;
      if (ball.state == 4) ball.state = 2;
    }

    if (ball.direction === 1) {
      if (ball.offsetTop >= height) ball.state = 2;
      else if (ball.offsetTop <= 0) ball.state = 1;
    } else {
      if (ball.offsetTop >= height) ball.state = 4;
      else if (ball.offsetTop <= 0) ball.state = 3;
    }
  }

  //Rod and ball
  function collidePlayer1() {
    if (
      ball.offsetLeft <= rod1.clientWidth &&
      ball.offsetTop >= rod1.offsetTop &&
      ball.offsetTop <= rod1.offsetTop + rod1.clientHeight
    ) {
      return true;
    }

    return false;
  }

  function collidePlayer2() {
    if (
      ball.offsetLeft >= width - rod2.clientWidth &&
      ball.offsetTop >= rod2.offsetTop &&
      ball.offsetTop <= rod2.offsetTop + rod2.clientHeight
    ) {
      return true;
    }
    return false;
  }

  //Moving rod
  function moveRod() {
    if (player1.keyPress) {
      if (player1.keyCode == 81 && rod1.offsetTop >= 0)
        rod1.style.top = rod1.offsetTop - movementRod + "px";
      if (player1.keyCode == 65 && rod1.offsetTop + rod1.clientHeight <= height)
        rod1.style.top = rod1.offsetTop + movementRod + "px";
    }
    if (player2.keyPress) {
      if (player2.keyCode == 79 && rod2.offsetTop >= 0)
        rod2.style.top = rod2.offsetTop - movementRod + "px";
      if (player2.keyCode == 76 && rod2.offsetTop + rod2.clientHeight <= height)
        rod2.style.top = rod2.offsetTop + movementRod + "px";
    }
  }

  //Action with the keyboard
  document.onkeydown = function (e) {
    e = e || window.event;
    switch (e.keyCode) {
      case 81: // Q
      case 65: // A    for player 1
        player1.keyCode = e.keyCode;
        player1.keyPress = true;
        break;
      case 79: // O
      case 76: // L  for player 2
        player2.keyCode = e.keyCode;
        player2.keyPress = true;
        break;
    }
  };

  document.onkeyup = function (e) {
    if (e.keyCode == 81 || e.keyCode == 65) player1.keyPress = false;
    if (e.keyCode == 79 || e.keyCode == 76) player2.keyPress = false;
  };

  start();
})();
