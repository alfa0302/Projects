let computerMove;
let computerChoice;
let playerChoice;
const playerMove = document.querySelector(".container");
let playerHasMoved = false;
let gameOver = false;

let playerGame = [];
let computerGame = [];
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let result;

let child = Array.from(playerMove.children);

const welcomeBlock = document.querySelector(".popup-content");

welcomeBlock.addEventListener("click", (e) => {
  if (e.target.tagName === "IMG") {
    playerChoice = e.target.getAttribute("data-name");
    document.querySelector(".main-container").style.display = "block";
    document.querySelector(".popup-content").style.display = "none";
  }
});

playerMove.addEventListener("click", playersMove);

function playersMove(e) {
  let cell = e.target.getAttribute("data-number");
  let rank = child.indexOf(e.target);

  if (cell) {
    let img = document.createElement("img");
    img.src = `images/${playerChoice}.png`;

    if (
      !document.querySelector(`.cell[data-number="${cell}"]`).hasChildNodes()
    ) {
      document.querySelector(`.cell[data-number="${cell}"]`).appendChild(img);

      playerHasMoved = true;

      playerGame.push(rank);

      playerMove.removeEventListener("click", playersMove);

      document.querySelector(".main-container h4").innerHTML =
        "Computer's Turn";

      setTimeout(computersMove, 500);
    }
  }
  result = checkWin(playerGame);

  if (result) {
    gameOver = true;
    setTimeout(() => {
      alert("You won");
      location.reload();
    }, 100); // Slight delay to ensure the DOM updates before alert
    return;
  }

  if (!gameOver) {
    checkDraw();
  }
}

function computersMove() {
  if (gameOver) return;
  let rank;
  if (playerHasMoved) {
    computerChoice = playerChoice === "x" ? "o" : "x";

    do {
      computerMove = Math.floor(Math.random() * 9) + 1;
      rank = computerMove - 1;
      chooseComputerMove();
    } while (
      document
        .querySelector(`.cell[data-number="${computerMove}"]`)
        .hasChildNodes()
    );

    computerGame.push(rank);

    let img = document.createElement("img");
    img.src = `images/${computerChoice}.png`;

    let cell = document.querySelector(`.cell[data-number="${computerMove}"]`);
    if (cell && !cell.hasChildNodes()) {
      cell.appendChild(img);

      playerHasMoved = false;
      playerMove.addEventListener("click", playersMove);
      document.querySelector(".main-container h4").innerHTML = "Your Turn";
    }
  }
  result = checkWin(computerGame);

  if (result) {
    setTimeout(() => {
      alert("Computer won");
      location.reload();
    }, 100); // Slight delay to ensure the DOM updates before alert
    return;
  }
  if (!gameOver) {
    checkDraw();
  }
}

function chooseComputerMove() {
  switch (computerMove) {
    case 1:
      computerMove = "one";
      break;
    case 2:
      computerMove = "two";
      break;
    case 3:
      computerMove = "three";
      break;
    case 4:
      computerMove = "four";
      break;
    case 5:
      computerMove = "five";
      break;
    case 6:
      computerMove = "six";
      break;
    case 7:
      computerMove = "seven";
      break;
    case 8:
      computerMove = "eight";
      break;
    case 9:
      computerMove = "nine";
      break;
  }
}

function checkWin(moves) {
  for (let combination of winningCombinations) {
    if (combination.every((index) => moves.includes(index))) {
      return true;
    }
  }
  return false;
}

function checkDraw() {
  const allCells = Array.from(document.querySelectorAll(".cell"));
  const allFilled = allCells.every((cell) => cell.hasChildNodes());
  if (allFilled && !gameOver) {
    document.querySelector(".main-container h4").innerHTML = "";
    gameOver = true;
    setTimeout(() => {
      alert("It's a draw!");
      location.reload();
    }, 100);
  }
}
