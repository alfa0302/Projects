let optionButtons = document.querySelectorAll(".icons");
let advOptionButtons = document.querySelectorAll(".adv-option-button");
let fontName = document.getElementById("fontName");
let fontSize = document.getElementById("fontSize");
let writingArea = document.querySelector("#text-input");
let linkButton = document.getElementById("createLink");
let alignButtons = document.querySelectorAll(".align");
let spacingButtons = document.querySelectorAll(".spacing");
let formatButtons = document.querySelectorAll(".format");
let scriptButtons = document.querySelectorAll(".script");

let fontList = [
  "Arial",
  "Verdana",
  "Times New Roman",
  "Garamond",
  "Georgia",
  "Courier New",
  "cursive",
];

//highlights/removes the hightlight.
optionButtons.forEach((button) => {
  button.addEventListener("click", () => {
    button.classList.toggle("active");
  });
});

//allows to choose only one of the alignment options at a time and also higlights the chosen button
alignButtons.forEach((button) => {
  button.addEventListener("click", () => {
    alignButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
  });
});
spacingButtons.forEach((button) => {
  button.addEventListener("click", () => {
    spacingButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
  });
});

//generate fonts
function addFont() {
  fontList.forEach((font) => {
    const option = document.createElement("option");
    option.value = font;
    option.textContent = font;
    fontName.appendChild(option);
  });
}

//generate font sizes
function addFontSize() {
  for (let i = 2; i <= 16; i++) {
    const size = document.createElement("option");
    size.value = i;
    size.textContent = i;
    fontSize.appendChild(size);
  }
  fontSize.value = 14;
}

addFont();
addFontSize();
