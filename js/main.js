'use strict';

const optionPlayer = document.querySelector('.js-option');
const resultBet = document.querySelector('.js-result');
const balanceMoney = document.querySelector('.js-balance');
const bet = document.querySelector('.js-bet');
const buttonPlayGame = document.querySelector('.js-play');
const buttonRestart = document.querySelector('.js-restart');
let userBalance = 50;

function getRandomNumber(max) {
  return Math.ceil(Math.random() * max);
}

function setUserBalance() {
  bet.setAttribute('min', 0);
  bet.setAttribute('max', userBalance);
  balanceMoney.innerHTML = `Tu saldo es: ${userBalance}`;
}

function handleClickBtn(event) {
  event.preventDefault();

  const machineOption = getRandomNumber(6);
  const userOption = parseInt(optionPlayer.value);
  const userBet = parseInt(bet.value);

  userBalance = userBalance - userBet;
  setUserBalance();

  if (machineOption === userOption) {
    userBalance += userBet * 2;
    resultBet.innerHTML = 'Has ganado el doble de lo apostado!';
  } else {
    resultBet.innerHTML = 'Has perdido lo apostado!';
  }

  setUserBalance();
}

setUserBalance();
buttonPlayGame.addEventListener('click', handleClickBtn);
