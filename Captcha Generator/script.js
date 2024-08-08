let submitButton = document.getElementById("submit-button");
let userInput = document.getElementById("user-input");
let canvas = document.getElementById("canvas");
let reloadButton = document.getElementById("reload-button");
let text;

function generateText() {
  let text = "";
  for (let i = 0; i < 3; i++) {
    text += String.fromCharCode(generateRandomNumber(65, 90));
    text += String.fromCharCode(generateRandomNumber(97, 122));
    text += String.fromCharCode(generateRandomNumber(48, 57));
  }
  return text;
}

const triggerFunction = () => {
  userInput.value = "";
  text = generateText();
  text = [...text].sort(() => Math.random() - 0.5).join("");
  return text;
};

function generateRandomNumber(max, min) {
  let randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomNumber;
}

function drawStringOnCanvas(string) {
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

  // Draw background color or pattern if needed
  ctx.fillStyle = "#f0f0f0"; // white background
  ctx.fillRect(0, 0, canvas.width, canvas.height); // Fill the entire canvas with the color

  // Draw the text on the canvas
  ctx.font = "25px Roboto Mono";
  ctx.fillStyle = "black"; // Text color
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(string, canvas.width / 2, canvas.height / 2);
}

reloadButton.addEventListener("click", () => {
  drawStringOnCanvas(triggerFunction());
});

submitButton.addEventListener("click", () => {
  if (userInput.value !== text) {
    alert("Invalid Captcha");
    userInput.value = "";
  } else {
    alert("Success");
  }
});

window.onload = () => {
  drawStringOnCanvas(triggerFunction());
};
