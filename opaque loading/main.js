"use strict";

const bg = document.querySelector(".bg");
const loading = document.querySelector(".loading-text");
let load = 0;

function scale(number, inMin, inMax, outMin, outMax) {
  return ((number - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}

const increaseLoad = () => {
  loading.innerText = `${load}%`;

  if (load >= 100) clearInterval(int);

  loading.style.opacity = scale(load, 0, 100, 1, 0);
  bg.style.filter = `blur(${scale(load, 0, 100, 30, 0)}px)`;
  load++;
};

const int = setInterval(increaseLoad, 30);
