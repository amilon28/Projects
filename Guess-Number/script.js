"use strict";

let secretNumber = Math.trunc(Math.random() * 20 + 1);
let score = 20;
let highScore = 0;

//! functionality of Check Button
document.querySelector(".check").addEventListener("click", function () {
  const guess = Number(document.querySelector(".guess").value);

  //! check if there is any input value or not
  if (!guess) document.querySelector(".message").textContent = "No Number! ⛔";
  //! if we have any value
  else {
    //! if user guess was correct
    if (guess === secretNumber) {
      //- Show message("Correct NUmber")
      document.querySelector(".message").textContent = "Correct Number 🥳";
      //- show secret number to the user instead of ? mark
      document.querySelector(".number").textContent = guess;
      //- Change the color of page to green
      document.querySelector("body").style.backgroundColor = "#60b347";
      //- set the highScore
      if (score > highScore) {
        highScore = score;
        document.querySelector(".highscore").textContent = score;
      }
    } else if (guess !== secretNumber) {
      //- check if the user still has a chance to guess or not
      if (score > 0) {
        //- detemine that user guess is too low or too high
        document.querySelector(".message").textContent =
          guess > secretNumber ? "too high 😲" : "too low 😯";
        //- decrease user score
        score--;
        //- show score to user
        document.querySelector(".score").textContent = score;
        //- if the user can not guess correctly the secret number after 20 times, then he/she lose
        if (score === 0)
          document.querySelector(".message").textContent =
            "You lost the game 😞";
      }
    }
  }
});

//! functionality of Again Button
document.querySelector(".again").addEventListener("click", function () {
  //- reset everything
  secretNumber = Math.trunc(Math.random() * 20 + 1);
  document.querySelector(".number").textContent = "?";
  document.querySelector(".guess").value = "";
  document.querySelector(".message").textContent = "Start guessing...";
  score = 20;
  document.querySelector(".score").textContent = 20;
  document.querySelector("body").style.backgroundColor = "#222";
});
