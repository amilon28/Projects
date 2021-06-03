"use strict";

const simpleBtn = document.querySelector("#simple");
const hexBtn = document.querySelector("#hex");
const bgColor = document.querySelector("#bg-value");
const clickBtn = document.querySelector(".click");
const main = document.querySelector(".main");
// Generate random number
const rand = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const colors = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "a", "b", "c", "d", "e", "f"];
clickBtn.addEventListener("click", function () {
  bgColor.innerText = `#${colors[rand(0, colors.length - 1)]}${
    colors[rand(0, colors.length - 1)]
  }${colors[rand(0, colors.length - 1)]}${colors[rand(0, colors.length - 1)]}${
    colors[rand(0, colors.length - 1)]
  }${colors[rand(0, colors.length - 1)]}`;
  main.style.backgroundColor = bgColor.innerText;
});
