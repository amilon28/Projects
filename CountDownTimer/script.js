"use strict";

// Select Elements
//inputs
const hourEl = document.getElementById("hour-value");
const minuteEl = document.getElementById("minute-value");
const secondEl = document.getElementById("second-value");

//boxes
const hourBox = document.querySelector("[data-h]");
const minuteBox = document.querySelector("[data-m]");
const secondBox = document.querySelector("[data-s]");

// btns
const playBtn = document.querySelector("[data-play]");
const resetBtn = document.querySelector("[data-reset]");
const pauseBtn = document.querySelector("[data-pause]");

// data values
let h, m, s;

let int = null;

// Functions
const formater = (v, el) => {
  if (String(v).length === 1) {
    el.value = "0" + v;
    if (el.value == "00") el.value = "";
  } else {
    el.value = +v;
  }
};

//stop interval
const stop = function () {
  clearInterval(int);
};

const countDown = (h, m, s) => {
  if (s !== 0) {
    secondEl.value--;
    formater(secondEl.value, secondEl);
  } else if (m !== 0 && s === 0) {
    secondEl.value = 59;
    minuteEl.value--;
    formater(minuteEl.value, minuteEl);
  } else if (h !== 0 && m === 0) {
    minuteEl.value = 60;
    hourEl.value--;
    formater(hourEl.value, hourEl);
  } else if (
    hourEl.value === "" &&
    minuteEl.value === "" &&
    secondEl.value === ""
  ) {
    stop();
  }
};

// Play
playBtn.addEventListener("click", function () {
  let hour = +hourEl.value;
  let min = +minuteEl.value;
  let sec = +secondEl.value;
  const time = [hour, min, sec];
  const el = [hourEl, minuteEl, secondEl];

  // validations
  if (!hour && !min && !sec) return;

  if (isNaN(hour) || isNaN(min) || isNaN(sec)) return;

  if (hour > 23 || hour < 0 || min > 59 || min < 0 || sec > 59 || sec < 0) {
    if (hour > 23 || hour < 0) {
      hourBox.style.borderColor = "#FF0040";
    }

    if (min > 59 || min < 0) {
      minuteBox.style.borderColor = "#FF0040";
    }

    if (sec > 59 || sec < 0) {
      secondBox.style.borderColor = "#FF0040";
    }
    return;
  } else {
    hourBox.style.borderColor = "#222";
    minuteBox.style.borderColor = "#222";
    secondBox.style.borderColor = "#222";
  }

  // if user input is a single value
  const twoDigitTime = time.map((t) => {
    if (String(t).length === 1) {
      return "0" + t;
    } else {
      return t;
    }
  });

  twoDigitTime.forEach((t, i) => {
    if (t === "00") {
      el[i].value = "";
    } else {
      el[i].value = t;
    }
  });

  int = setInterval(() => {
    h = +hourEl.value;
    m = +minuteEl.value;
    s = +secondEl.value;
    countDown(h, m, s);
  }, 1000);
});

// Reset
resetBtn.addEventListener("click", function () {
  hourEl.value = "";
  minuteEl.value = "";
  secondEl.value = "";
  clearInterval(int);
});

// Pause
pauseBtn.addEventListener("click", function () {
  clearInterval(int);
});
