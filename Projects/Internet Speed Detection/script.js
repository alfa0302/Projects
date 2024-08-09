let startTime, endTime;
let image = new Image();
let imageSize = "";
let bitOutput = document.getElementById("bits");
let kbOutput = document.getElementById("kbs");
let mbOutput = document.getElementById("mbs");

let imageLink = "random-image.png?random=" + Math.random();

image.onload = async () => {
  endTime = new Date().getTime();

  await fetch(imageLink).then((response) => {
    imageSize = response.headers.get("content-length");
    calculateSpeed();
  });
};

function calculateSpeed() {
  let time = (endTime - startTime) / 1000;

  let loadedBites = imageSize * 8;
  let speedBps = (loadedBites / time).toFixed(2);
  let speedKbps = (speedBps / 1024).toFixed(2);
  let speedMbps = (speedKbps / 1024).toFixed(2);

  bitOutput.innerHTML += ` ${speedBps}`;
  kbOutput.innerHTML += ` ${speedKbps}`;
  mbOutput.innerHTML += ` ${speedMbps}`;
}

const init = async () => {
  startTime = new Date().getTime();
  image.src = imageLink;
};

window.onload = () => init();
