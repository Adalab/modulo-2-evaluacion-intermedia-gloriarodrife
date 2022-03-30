'use strict';

const move = document.querySelector('.js-move');
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

  const validUserOption = userOption >= 1 && userOption <= 6;
  const validUserBet = userBet >= 1 && userBet <= userBalance;
  if (!validUserOption || !validUserBet) {
    resultBetText('Los valores introducidos no son válidos');

    return;
  }

  totalUserBalance();

  bet.value = '';
  optionPlayer.selectedIndex = 0;

  if (machineOption === userOption) {
    userBalance += userBet * 2;
    resultBetText('Has ganado el doble de lo apostado!');
  } else {
    resultBetText('Has perdido lo apostado!');
  }

  setUserBalance();

  if (userBalance === 0) {
    buttonPlayGame.classList.add('hidden');
    buttonRestart.classList.remove('hidden');
    move.classList.add('hidden');
    optionPlayer.classList.add('hidden');
    bet.classList.add('hidden');
    resultBetText('No puedes seguir jugando, la maquina ha ganado!');
  } else if (userBalance >= 200) {
    buttonPlayGame.classList.add('hidden');
    buttonRestart.classList.remove('hidden');
    move.classList.add('hidden');
    optionPlayer.classList.add('hidden');
    bet.classList.add('hidden');
    resultBetText('No puedes seguir jugando, has ganado!');
  }

  function totalUserBalance() {
    userBalance = userBalance - userBet;
    setUserBalance();
  }
}
function resultBetText(text) {
  resultBet.innerHTML = text;
}

function handleClickBtnRestart(event) {
  event.preventDefault();

  userBalance = defaultBalance;
  setUserBalance();
  optionPlayer.selectedIndex = 0;
  bet.value = '';

  buttonPlayGame.classList.remove('hidden');
  buttonRestart.classList.add('hidden');
  move.classList.remove('hidden');
  optionPlayer.classList.remove('hidden');
  bet.classList.remove('hidden');
  resultBetText('Vamos a jugar!');
}

setUserBalance();
buttonPlayGame.addEventListener('click', handleClickBtn);
buttonRestart.addEventListener('click', handleClickBtnRestart);
