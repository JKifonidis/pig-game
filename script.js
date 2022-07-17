'use strict';
/*
Section 7.82 - PROJECT #3: Pig Game
*/
// Selectors
const score1 = document.querySelector('#score--0');
const score2 = document.querySelector('#score--1');
const current1 = document.querySelector('#current--0');
const current2 = document.querySelector('#current--1');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const dice = document.querySelector('.dice');
const player1 = document.querySelector('.player--0');
const player2 = document.querySelector('.player--1');

// Initialisation
score1.textContent = '0';
score2.textContent = '0';
const hideDice = function () {
  dice.classList.add('hidden');
};
hideDice();

// Variables
let currentValue1 = 0;
let currentValue2 = 0;
let scorePlayer1 = 0;
let scorePlayer2 = 0;
let roll = 0;
const randomize = () => Math.trunc(Math.random() * 10);
const randomDice = function (randomNumber = randomize()) {
  while (randomNumber > 6 || randomNumber === 0) {
    randomNumber = randomize();
  }
  if (randomNumber === 1) {
    clearCurrent1();
    clearCurrent2();
    playerActive();
    return 0;
  }
  return randomNumber;
};
const setCurrent = function (target, currentValue = 0) {
  target.textContent = String(currentValue);
};
const clearCurrent1 = function () {
  currentValue1 = 0;
  current1.textContent = '0';
};
const clearCurrent2 = function () {
  currentValue2 = 0;
  current2.textContent = '0';
};
const playerActive = function () {
  if (player1.classList.contains('player--active')) {
    player1.classList.remove('player--active');
    player2.classList.add('player--active');
  } else {
    player2.classList.remove('player--active');
    player1.classList.add('player--active');
  }
};
const showDice = function () {
  dice.classList.remove('hidden');
};
const updateScore = function (score, current, target) {
  score += current;
  target.textContent = String(score);
  return score;
};
const playerWins = function (player) {
  player.classList.add('player--winner');
  btnRoll.removeEventListener('click', rollDice);
  btnHold.removeEventListener('click', playerHold);
};
// ROLL DICE function
const rollDice = function () {
  showDice();
  roll = randomDice();

  switch (roll) {
    case 0:
      dice.src = 'dice-1.png';
      break;
    case 2:
      dice.src = 'dice-2.png';
      break;
    case 3:
      dice.src = 'dice-3.png';
      break;
    case 4:
      dice.src = 'dice-4.png';
      break;
    case 5:
      dice.src = 'dice-5.png';
      break;
    case 6:
      dice.src = 'dice-6.png';
      break;
  }

  if (player1.classList.contains('player--active') && roll !== 0) {
    clearCurrent2();
    currentValue1 += roll;
    setCurrent(current1, currentValue1);
  }
  if (player2.classList.contains('player--active') && roll !== 0) {
    clearCurrent1();
    currentValue2 += roll;
    setCurrent(current2, currentValue2);
  }
};

// HOLD function
const playerHold = function () {
  if (player1.classList.contains('player--active')) {
    scorePlayer1 = updateScore(scorePlayer1, currentValue1, score1);
    if (scorePlayer1 >= 100) {
      playerWins(player1);
    }
    clearCurrent1();
    if (scorePlayer1 < 100) playerActive();
  } else {
    scorePlayer2 = updateScore(scorePlayer2, currentValue2, score2);
    if (scorePlayer2 >= 100) {
      playerWins(player2);
    }
    clearCurrent2();
    if (scorePlayer2 < 100) playerActive();
  }
};

// NEW GAME function
const newGame = function () {
  btnRoll.addEventListener('click', rollDice);
  btnHold.addEventListener('click', playerHold);
  hideDice();
  player1.classList.remove('player--winner');
  player2.classList.remove('player--winner');
  clearCurrent1();
  clearCurrent2();
  scorePlayer1 = 0;
  score1.textContent = '0';
  scorePlayer2 = 0;
  score2.textContent = '0';
  if (!player1.classList.contains('player--active')) {
    playerActive();
  }
}

// ROLL DICE
btnRoll.addEventListener('click', rollDice);

// HOLD
btnHold.addEventListener('click', playerHold);

// NEW GAME
btnNew.addEventListener('click', newGame);
