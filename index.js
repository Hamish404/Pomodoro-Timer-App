const topButtonStart = document.querySelector('.top-button-start');
const topButtonPause = document.querySelector('.top-button-stop');
const topSideButtonStop = document.querySelector('.top-side-button');
const progressBar = document.querySelector('.outer-circle');
const startButton = document.querySelector('.start-btn');
const stopButton = document.querySelector('.stop-btn');
const displayTime = document.querySelector('.time');
const timeSeparator = document.querySelectorAll('.time-separator');
const hour = document.querySelector('.hour');
const minute = document.querySelector('.minute');
const second = document.querySelector('.second');
const timerAlert = new Audio('sounds/Timer-Jingle.mp3');
let progress = 0;
let elapsed = 0;
let interval;
let interval2;
let initialTotalSeconds = 0;
let totalSecondsLeft = 0;
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

topButtonStart.addEventListener('click', () => {
  if (!isCountingDown && totalSecondsLeft === 0) {
    fetchInput();
    convertTotalSecondsLeft();
    if (totalSecondsLeft > 0) {
      buttonSwap();
      countDown();
      updateProgressAnimation();
    }
  } else {
    buttonSwap();
    countDown();
    updateProgressAnimation();
  }
})

topButtonPause.addEventListener('click', () => {
  if (!isCountingDown && timerAlert.currentTime > 0) {
    buttonSwap();
    stopTimerAlert();
    stopProgressAnimation();
    return  
  }
  clearInterval(interval);
  clearInterval(interval2);
  buttonSwap();
  stopTimerAlert();
  isCountingDown = false;
})

topSideButtonStop.addEventListener('click', () => {
  if (totalSecondsLeft < 1) {
    return
  }
  isCountingDown = false;
  totalSecondsLeft = 0;
  timerInitialization();
  clearInterval(interval);
  buttonSwap();
  enableInput();
  stopTimerAlert();
  stopProgressAnimation();
})

startButton.addEventListener('click', () => {
  if (!isCountingDown && totalSecondsLeft === 0) {
    fetchInput();
    convertTotalSecondsLeft();
    if (totalSecondsLeft > 0) {
      buttonSwap();
      countDown();
      updateProgressAnimation();
    }
  } else {
    buttonSwap();
    countDown();
    updateProgressAnimation();
  }
});

stopButton.addEventListener('click', () => {
  isCountingDown = false;
  totalSecondsLeft = 0;
  timerInitialization();
  clearInterval(interval);
  buttonSwap();
  enableInput();
  stopTimerAlert();
  stopProgressAnimation();
});

document.addEventListener('keydown', (e) => { 
  if (e.key === ' ' && !isCountingDown) {
    if (timerAlert.currentTime > 0) {
      buttonSwap();
      stopTimerAlert();
      stopProgressAnimation();
      return  
    } else if (totalSecondsLeft > 0) {
      buttonSwap();
      countDown();
      updateProgressAnimation();
    } else {
      fetchInput();
      convertTotalSecondsLeft();
      if (totalSecondsLeft < 1) {
        return
      } else {
        buttonSwap();
        countDown();
        updateProgressAnimation();
      }
    }
  }

  if (e.key == ' ' && isCountingDown) {
    clearInterval(interval);
    clearInterval(interval2);
    buttonSwap();
    stopTimerAlert();
    isCountingDown = false;
  }

  if (e.key === 'Enter' && !isCountingDown) {
    fetchInput();
    convertTotalSecondsLeft();
    if (totalSecondsLeft > 0) {
      buttonSwap();
      countDown();
      updateProgressAnimation();
    }
  };

  if (e.key === 'Escape' && isCountingDown) {
    isCountingDown = false;
    totalSecondsLeft = 0;
    timerInitialization();
    clearInterval(interval);
    enableInput();
    buttonSwap();
    stopTimerAlert();
    stopProgressAnimation();
  }

  if (e.key === 'Escape' && !isCountingDown && timerAlert.currentTime > 0) {
    buttonSwap();
    stopTimerAlert();
    stopProgressAnimation();  
  }
});

function convertTotalSecondsLeft() {
  totalSecondsLeft = secondValue + (minuteValue * 60) + (hourValue * 3600);
  initialTotalSeconds = totalSecondsLeft;
};

function timeConverter(totalSecondsLeft) {
  const hours = Math.floor(totalSecondsLeft / 3600);
  const minutes = Math.floor((totalSecondsLeft % 3600) / 60);
  const seconds = totalSecondsLeft % 60;
  return { 
    hours: hours.toString().padStart(2, '0'),
    minutes: minutes.toString().padStart(2, '0'),
    seconds: seconds.toString().padStart(2, '0'),
  }
};

function countDown() {
  interval = setInterval(() => {
    if (totalSecondsLeft === 0) {
      isCountingDown = false;
      clearInterval(interval);
      playTimerAlert();
      enableInput();
    } else {
      isCountingDown = true;
      totalSecondsLeft--;
      const currentTime = timeConverter(totalSecondsLeft); 
      hour.value = currentTime.hours;
      minute.value = currentTime.minutes;
      second.value = currentTime.seconds;
      disableInput();
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
  topButtonStart.classList.toggle('hide');
  topButtonPause.classList.toggle('hide');
  startButton.classList.toggle('hide');
  stopButton.classList.toggle('hide');
};

function enableInput() {
  changeSeparatorColor('black');
  hour.disabled = false;
  minute.disabled = false;
  second.disabled = false;
};

function disableInput() {
  changeSeparatorColor('#545454');
  hour.disabled = true;
  minute.disabled = true;
  second.disabled = true;
};

function playTimerAlert() {
  timerAlert.play();
};

function stopTimerAlert() {
  timerAlert.pause();
  timerAlert.currentTime = 0;
};

function updateProgressAnimation() {
  interval2 = setInterval(() => {
    elapsed = initialTotalSeconds - totalSecondsLeft;
    progress = (elapsed / initialTotalSeconds) * 100;
    progressBar.style.setProperty('--progress', progress + "%");
    if (totalSecondsLeft <= 0) {
      clearInterval(interval2);
    }
  }, 1000);
};

function stopProgressAnimation() {
  clearInterval(interval2);
  progressBar.style.setProperty('--progress', "0%");
};

const changeSeparatorColor = (color) => timeSeparator.forEach((separator) => {
  separator.style.color = color;
})
