const startButton = document.querySelector('.start-btn');
const stopButton = document.querySelector('.stop-btn');
const displayTime = document.querySelector('.time');
const hour = document.querySelector('.hour');
const minute = document.querySelector('.minute');
const second = document.querySelector('.second');
let interval;
let totalSeconds = 0;
let hourValue = '';
let minuteValue = '';
let secondValue = '';
let isCountingDown = false;

timerInitialization();

hour.addEventListener('input', () => {
  hour.value = hour.value.replace(/[^0-9]/g, '').slice(0, 2);
});

minute.addEventListener('input', () => {
  minute.value = minute.value.replace(/[^0-9]/g, '').slice(0, 2);
});

second.addEventListener('input', () => {
  second.value = second.value.replace(/[^0-9]/g, '').slice(0, 2);
});

startButton.addEventListener('click', () => {
  buttonSwap();
  fetchInput();
  convertToTotalSeconds();
  countDown();
});

stopButton.addEventListener('click', () => {
  totalSeconds = 0;
  timerInitialization();
  clearInterval(interval);
  buttonSwap();
  alert('Timer has stopped!');
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && isCountingDown === false) {
    fetchInput();
    convertToTotalSeconds();
    if (totalSeconds > 0) {
      buttonSwap();
      countDown();
    }
  };

  if (e.key === 'Escape' && isCountingDown === true) {
    isCountingDown = false;
    totalSeconds = 0;
    timerInitialization();
    clearInterval(interval);
    buttonSwap();
    alert('Timer has stopped!');
  }
});

function convertToTotalSeconds() {
  totalSeconds = secondValue + (minuteValue * 60) + (hourValue * 3600);
};

function timeConverter(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return {
    hours: hours.toString().padStart(2, '0'),
    minutes: minutes.toString().padStart(2, '0'),
    seconds: seconds.toString().padStart(2, '0'),
  }
};

function countDown() {
  interval = setInterval(() => {
    if (totalSeconds === 0) {
      hour.disabled = false;
      minute.disabled = false;
      second.disabled = false;
      isCountingDown = false;
      clearInterval(interval);
      buttonSwap();
      alert('Timer has stopped!');
    } else {
      isCountingDown = true;
      hour.disabled = true;
      minute.disabled = true;
      second.disabled = true;
      totalSeconds--;
      const currentTime = timeConverter(totalSeconds); 
      hour.value = currentTime.hours;
      minute.value = currentTime.minutes;
      second.value = currentTime.seconds;
    }
  }, 1000);
};

function timerInitialization() {
  hour.value = '00';
  minute.value = '00';
  second.value = '00';
};

function fetchInput() {
  hourValue = parseInt(hour.value || 0, 10);
  minuteValue = parseInt(minute.value || 0, 10);
  secondValue = parseInt(second.value || 0, 10);
};

function buttonSwap() {
  startButton.classList.toggle('hide');
  stopButton.classList.toggle('hide');
};
