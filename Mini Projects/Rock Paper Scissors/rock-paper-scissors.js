let computer = "";
let result = "";
let score = JSON.parse(localStorage.getItem("score"));
let autoPlaying = false;

if (score === null) {
  score = {
    wins: 0,
    losses: 0,
    ties: 0,
  };
}
updateScoreElement();

function computersMove() {
  var randomNumber = Math.random();
  if (randomNumber <= 1 / 3) {
    computer = "Rock";
  } else if (randomNumber > 1 / 3 && randomNumber <= 2 / 3) {
    computer = "Paper";
  } else computer = "Scissors";
  return computer;
}

function playerGame(playerMove) {
  const computerMove = computersMove();
  if (playerMove === "Rock") {
    if (computer === "Rock") {
      result = "Tie.";
    } else if (computer === "Paper") {
      result = "You lose.";
    } else result = "You win.";
  } else if (playerMove === "Paper") {
    if (computer === "Rock") {
      result = "You win.";
    } else if (computer === "Paper") {
      result = "Tie.";
    } else result = "You lose.";
  } else {
    if (computer === "Rock") {
      result = "You lose.";
    } else if (computer === "Paper") {
      result = "You win.";
    } else result = "Tie.";
  }
  if (result === "You win.") {
    score.wins += 1;
  } else if (result === "You lose.") {
    score.losses += 1;
  } else score.ties += 1;

  localStorage.setItem("score", JSON.stringify(score));

  document.querySelector(".js-result").innerHTML = result;
  document.querySelector(".js-moves").innerHTML = `You
      <img class="move-icon" src="images/${playerMove}-emoji.png" />
      <img class="move-icon" src="images/${computerMove}-emoji.png" />
      Computer`;
  updateScoreElement();
}

function updateScoreElement() {
  document.querySelector(
    ".js-score"
  ).innerHTML = `Wins: ${score.wins}, Losses: ${score.losses} ,Ties: ${score.ties}`;
}
function image() {
  if (move == "Rock") {
  }
}
let value;
function autoplay() {
  if (!autoPlaying) {
    value = setInterval(function () {
      playerGame(computersMove());
    }, 1000);
    autoPlaying = true;
  } else {
    clearInterval(value);
  }
}
