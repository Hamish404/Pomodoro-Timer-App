const startButton = document.querySelector('.start-btn');
const displayTime = document.querySelector('.time');
let totalSeconds = 10;
let decaHours = 0;
let hours = 0;
let decaMinutes = 0;
let minutes = 0;
let decaSeconds = 0;
let seconds = 0;
let isCountingDown = false;

timerInitialization();

startButton.addEventListener('click', () => {
  if (isCountingDown) return;
  isCountingDown = true;
  startButton.disabled = true;

  displayTime.value = timeConverter(totalSeconds);
  countDown();  
});

function timerInitialization() {
  displayTime.value = '00:00';
};

function timeConverter(totalSeconds) {
  if (totalSeconds < 10) {
    decaSeconds = 0;
    seconds = totalSeconds
  }
  else if (totalSeconds < 60) {
    minutes = 0;
    decaSeconds = Math.floor(totalSeconds / 10);
    seconds = totalSeconds - (decaSeconds * 10);
  }
  else if (totalSeconds < 600) {
    decaMinutes = 0;
    minutes = Math.floor(totalSeconds / 60);
    decaSeconds = Math.floor((totalSeconds - minutes * 60) / 10);
    seconds = totalSeconds - (minutes * 60) - (decaSeconds * 10);
  }
  else if (totalSeconds < 3600) {
    hours = 0;
    decaMinutes = Math.floor(totalSeconds / 600);
    minutes = Math.floor((totalSeconds - decaMinutes * 600) / 60);
    decaSeconds = Math.floor((totalSeconds - (decaMinutes * 600) - (minutes * 60)) / 10)
    seconds = totalSeconds - (decaMinutes * 600) - (minutes * 60) - (decaSeconds * 10);
  } 
  else if (totalSeconds < 36000) {
    decaHours = 0;
    hours = Math.floor(totalSeconds / 3600);
    decaMinutes = Math.floor((totalSeconds - hours * 3600) / 600);
    minutes = Math.floor((totalSeconds - (hours * 3600) - (decaMinutes * 600)) / 60);
    decaSeconds = Math.floor((totalSeconds - (hours * 3600) - (decaMinutes * 600) - (minutes * 60)) / 10);
    seconds = totalSeconds - (hours * 3600) - (decaMinutes * 600) - (minutes * 60) - (decaSeconds * 10);
  } 
  else {
    decaHours = Math.floor(totalSeconds / 36000);
    hours = Math.floor((totalSeconds - decaHours * 36000) / 3600);
    decaMinutes = Math.floor((totalSeconds - (decaHours * 36000) - (hours * 3600)) / 600);
    minutes = Math.floor((totalSeconds - (decaHours * 36000) - (hours * 3600) - (decaMinutes * 600)) / 60);
    decaSeconds = Math.floor((totalSeconds - (decaHours * 36000) - (hours * 3600) - (decaMinutes * 600) - (minutes * 60)) / 10);
    seconds = totalSeconds - (decaHours * 36000) - (hours * 3600) - (decaMinutes * 600) - (minutes * 60) - (decaSeconds * 10);
  }
  
  if (totalSeconds < 3600) {
    return `${decaMinutes}` + `${minutes}` + ':' + `${decaSeconds}` + `${seconds}`;
  } else {
    return `${decaHours}` + `${hours}` + ':' + `${decaMinutes}` + `${minutes}` + ':' + `${decaSeconds}` + `${seconds}`;
  }
}


function countDown() {
  const interval = setInterval(() => {
    if (totalSeconds === 0) {
      clearInterval(interval);
      isCountingDown = false;
      startButton.disabled = false;
      alert('Timer has stopped!');
    } else if (totalSeconds > 0) {
      totalSeconds--;
      const currentTime = timeConverter(totalSeconds); 
      displayTime.value = currentTime;
    }
  }, 1000);
}
