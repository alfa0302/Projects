let number = document.querySelectorAll(".number");
let interval = 5000;

number.forEach((i) => {
  let startValue = 0;
  let endValue = parseInt(i.getAttribute("data-value"));
  let duration = Math.floor(interval / endValue);

  let counter = setInterval(function () {
    startValue += 1;
    i.textContent = startValue;
    if (startValue == endValue) {
      clearInterval(counter);
    }
  }, duration);
});
