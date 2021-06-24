"use strict";

const pass = document.querySelector(".pass");
const copyBtn = document.getElementById("copy-btn");
const btn = document.querySelector("button");
const message = document.getElementById("message");

if (!pass.value) {
  copyBtn.classList.add("hide");
}

btn.addEventListener("click", function () {
  pass.value =
    Math.random().toString(36).slice(2) +
    Math.random().toString(36).slice(2).toUpperCase();
  copyBtn.classList.remove("hide");
  message.classList.add("hide");
});

copyBtn.addEventListener("click", function () {
  message.style.opacity = 1;
  pass.select();
  pass.setSelectionRange(0, 9999);
  document.execCommand("copy");
  message.classList.remove("hide");
  setTimeout(() => {
    message.style.opacity = 0;
  }, 800);
});
