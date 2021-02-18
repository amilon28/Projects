"use strict";

//! Select Elements
const score0El = document.querySelector("#score--0");
const score1El = document.querySelector("#score--1");
const diceEl = document.querySelector(".dice");
const btnRoll = document.querySelector(".btn--roll");
const btnNew = document.querySelector(".btn--new");
const btnHold = document.querySelector(".btn--hold");
const current0El = document.querySelector("#current--0");
const current1El = document.querySelector("#current--1");
const player0 = document.querySelector(".player--0");
const player1 = document.querySelector(".player--1");

//! Observe Dry Principle
const activePlayer0 = function () {
  player1.classList.remove("player--active");
  player0.classList.add("player--active");
};

const activePlayer1 = function () {
  player0.classList.remove("player--active");
  player1.classList.add("player--active");
};

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle("player--active");
  player1.classList.toggle("player--active");
};

score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add("hidden");

//! Dont relay on DOM
const totalScores = [0, 0];
let currentScore = 0;
let activePlayer = 0; // if activePlayer === 0 it means player 0 is current(active) player and vice versa
let playing = true;

//! Implement Roll-Dice btn functionality
btnRoll.addEventListener("click", function () {
  if (playing) {
    //- generate an integer random number between 1 and 6
    const dice = Math.trunc(Math.random() * 6 + 1);

    //- Display dice number to user
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;

    //- Check dise number is 1 or not
    if (dice !== 1) {
      //- add dice to current score of current player
      currentScore += dice;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
    } else {
      //- Switch Player
      switchPlayer();
    }
  }
});

//! Implement HOLD btn Functionality
btnHold.addEventListener("click", function () {
  if (playing) {
    //- add current score of current player to his total score
    totalScores[activePlayer] += currentScore;
    //- Display that score to player in web page
    document.getElementById(`score--${activePlayer}`).textContent =
      totalScores[activePlayer];
    //- Check if total score of current player is at least 100 or not

    //- if true
    if (totalScores[activePlayer] >= 20) {
      //- set current player winner
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
      //- remove dice image from web page
      diceEl.classList.add("hidden");
      //- disable hold and roll-dice btns
      playing = false;
    } else {
      //- if false
      //switch players
      switchPlayer();
    }
  }
});

//! implement NEW GAME btn Functionality

btnNew.addEventListener("click", function () {
  //- set game state to true
  playing = true;
  //- remove player--winner class from winner player and set player 1 as active player
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove("player--winner");

  document.querySelector(".player--0").classList.add("player--active");
  activePlayer = 0;
  //- set total score of both player to zero
  totalScores[0] = 0;
  totalScores[1] = 0;
  document.getElementById("score--0").textContent = 0;
  document.getElementById("score--1").textContent = 0;
  //- set current score of both player to zero
  currentScore = 0;
  document.getElementById("current--0").textContent = 0;
  document.getElementById("current--1").textContent = 0;
});
