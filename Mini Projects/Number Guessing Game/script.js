const number = Math.floor(Math.random() * 10) + 1;
const guessInput = document.getElementById("guess");
const result = document.getElementById("message3");
const guessedNumbers = document.getElementById("message2");
const countBlock = document.getElementById("message1");
let count = 0;
let guesses = [];

function play() {
  const guess = parseInt(guessInput.value);
  count += 1;
  if (guess) {
    countBlock.textContent = `No. Of Guesses: ${count}`;
    guesses.push(guess);
    guessedNumbers.textContent = `Guessed Numbers are: ${guesses.join(", ")}`; //.join(", ") converts the numbers to a single string seperated by comma eg: '1,2,3,5'
    if (number === guess) {
      result.style.color = "green";
      result.textContent = "You Guessed It Right!!!";
    } else {
      result.style.color = "Red";
      result.textContent = "Wrong Guess.Try again..";
    }
  } else {
    result.style.color = "Red";
    result.textContent = "Enter a guess to Start";
  }
}
