'use strict';

const optionPlayer = document.querySelector('.js-option');
const resultBet = document.querySelector('.js-result');
const balanceMoney = document.querySelector('.js-balance');
const bet = document.querySelector('.js-bet');
const buttonPlayGame = document.querySelector('.js-play');
const buttonRestart = document.querySelector('.js-restart');
const defaultBalance = 50;

let userBalance = defaultBalance;

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

  if (userBalance === 0) {
    buttonPlayGame.classList.add('hidden');
    buttonRestart.classList.remove('hidden');
    resultBet.innerHTML = 'No puedes seguir jugando, la maquina ha ganado!';
  } else if (userBalance >= 200) {
    buttonPlayGame.classList.add('hidden');
    buttonRestart.classList.remove('hidden');
    resultBet.innerHTML = 'No puedes seguir jugando, has ganado!';
  }
}

function handleClickBtnRestart(event) {
  event.preventDefault();

  userBalance = defaultBalance;
  setUserBalance();
  optionPlayer.value = 'placeholder';
  bet.value = '';

  buttonPlayGame.classList.remove('hidden');
  buttonRestart.classList.add('hidden');
  resultBet.innerHTML = 'Vamos a jugar!';
}

setUserBalance();
buttonPlayGame.addEventListener('click', handleClickBtn);
buttonRestart.addEventListener('click', handleClickBtnRestart);
