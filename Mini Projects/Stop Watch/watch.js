let [seconds, minutes, hours] = [0, 0, 0];
let displayTime = document.getElementById("displayTime");
let timer;

function countTime() {
  seconds++;
  if (seconds == 60) {
    minutes++;
    seconds = 0;
    if (minutes == 60) {
      hours++;
      minutes = 0;
    }
  }
  let h = hours < 10 ? `0${hours}` : hours;
  let m = minutes < 10 ? `0${minutes}` : minutes;
  let s = seconds < 10 ? `0${seconds}` : seconds;

  displayTime.innerHTML = h + ":" + m + ":" + s;
}
function startCount() {
  if (timer !== null) {
    clearInterval(timer); //clearing interval does not mean resetting values. The interval is stopped. New interval is set in next line. It resumes from where it left off.
  }
  timer = setInterval(countTime, 1000);
}

function stopCount() {
  clearInterval(timer);
}

function watchReset() {
  clearInterval(timer);
  [seconds, minutes, hours] = [0, 0, 0];
  displayTime.innerHTML = "00:00:00";
}
