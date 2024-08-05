let text = document.getElementById("input-textarea");
let word = document.getElementById("word-count");
let char = document.getElementById("char-count");
let charCount = 0;
let wordCount = 0;

text.addEventListener("input", () => {
  char.textContent = text.value.length;

  let txt = text.value.trim();

  word.textContent = txt.split(/\s+/).filter((item) => item).length;
});
