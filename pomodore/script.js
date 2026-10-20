const timer = document.querySelector("#timer");
let runningTime;
let isPaused = true;

const playBtn = document.querySelector("#start");
const resetBtn = document.querySelector("#reset");
const pomodoroBtn = document.querySelector("#pomodoro");
const shortBtn = document.querySelector("#short_break");
const longBtn = document.querySelector("#long_break");

const timeToMills = (timeInMin) => {
  return timeInMin * 60000;
};
let currentTime = timeToMills(25);

const setTimer = (timeToCount) => {
  let newTimeInSec = timeToCount;
  runningTime = setInterval(() => {
    newTimeInSec = newTimeInSec - 1000;
    const min = Math.floor(newTimeInSec / 60000);
    const sec = ((newTimeInSec % 60000) / 1000).toFixed(0);

    timer.textContent =
      String(min).padStart(2, "0") + ":" + String(sec).padStart(2, "0");
    currentTime = newTimeInSec;
  }, 1000);
  if (isPaused) {
    document.querySelector("#start").textContent =
      "<i class='bi bi-play-fill' aria-hidden='true'></i><p>Pause</p>";
  }
  if (newTimeInSec === 0) {
    clearInterval(runningTime);
  }
};

const activeTimer = (minutes) => {
  clearInterval(runningTime);
  currentTime = timeToMills(minutes);
  timer.textContent = String(minutes).padStart(2, "0") + ":00";
  console.log("activamos");

  // setTimer(timeToMills(minutes));
};

const play = () => {
  if (isPaused) {
    console.log("play");
    setTimer(currentTime);
  } else {
    console.log("pausa");
    clearInterval(runningTime);
  }
};

const reset = () => {
  console.log("resetTimer ");
};

pomodoroBtn.addEventListener("click", activeTimer(25));
shortBtn.addEventListener("click", activeTimer(5));
longBtn.addEventListener("click", activeTimer(15));

playBtn.addEventListener("click", play);
resetBtn.addEventListener("click", reset);
