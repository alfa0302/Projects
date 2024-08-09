const degreeInput = document.querySelector(".degree");
const fahrenInput = document.querySelector(".fahren");

function temp() {
  if (!degreeInput.value) {
    fahrenInput.value = "";
  }
  if (!fahrenInput.value) {
    degreeInput.value = "";
  }
}
degreeInput.addEventListener("input", () => {
  fahrenInput.value = parseFloat((degreeInput.value * 9) / 5 + 32).toFixed(2);
  temp();
});

fahrenInput.addEventListener("input", () => {
  degreeInput.value = parseFloat(((fahrenInput.value - 32) * 5) / 9).toFixed(2);
  temp();
});
