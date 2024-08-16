const searchBox = document.querySelector(".header input");
const textBox = document.querySelector(".text");

function search() {
  if (searchBox.value && textBox.innerText) {
    textBox.innerHTML = textBox.innerHTML.replace(/<\/?mark>/g, "");
    let search = searchBox.value;
    search = search.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
    let pattern = new RegExp(`${search}`, "gi");
    textBox.innerHTML = textBox.innerHTML.replace(
      pattern,
      (match) => `<mark>${match}</mark>`
    );
  }
}
