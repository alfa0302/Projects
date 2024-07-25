const password = document.getElementById("password");
const img = document.querySelector(".container img");

function togglePassword() {
  if (password.type === "password") {
    password.type = "text";
    img.src = "images/eye-open.png";
  } else {
    password.type = "password";
    img.src = "images/eye-close.png";
  }
}
