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
  isPaused = false;
  changeActiveStatus();

  let newTimeInSec = timeToCount;
  if (newTimeInSec === 0) {
    clearInterval(runningTime);
    isPaused = true;
  }
  runningTime = setInterval(() => {
    isPaused = false;
    newTimeInSec = newTimeInSec - 1000;
    const min = Math.floor(newTimeInSec / 60000);
    const sec = ((newTimeInSec % 60000) / 1000).toFixed(0);

    timer.textContent =
      String(min).padStart(2, "0") + ":" + String(sec).padStart(2, "0");
    currentTime = newTimeInSec;
  }, 1000);
  changeActiveStatus();
};

const changeActiveStatus = () => {
  if (isPaused) {
    document.querySelector("#start > p").textContent = "Pause";
    document.querySelector("#start > i").classList.remove("bi-play-fill");
    document.querySelector("#start > i").classList.add("bi-pause-fill");
  } else {
    document.querySelector("#start > p").textContent = "Play";
    document.querySelector("#start > i").classList.remove("bi-pause-fill");
    document.querySelector("#start > i").classList.add("bi-play-fill");
  }
};

const activeTimer = (minutes) => {
  // isPaused = false;
  clearInterval(runningTime);
  currentTime = timeToMills(minutes);
  timer.textContent = String(minutes).padStart(2, "0") + ":00";
  console.log("activamos", isPaused);
  changeActiveStatus();

  setTimer(timeToMills(minutes));
  // isPaused = false;
};

const play = () => {
  if (isPaused) {
    setTimer(currentTime);
    console.log("play", isPaused);
    changeActiveStatus();
    // isPaused = false;
  } else {
    clearInterval(runningTime);
    console.log("pausa");
    changeActiveStatus();
    // isPaused = true;
  }
};

const reset = () => {
  console.log("resetTimer ");
  isPaused = true;
  clearInterval(runningTime);
  currentTime = timeToMills(25);
  timer.textContent = String(25).padStart(2, "0") + ":00";
};

pomodoroBtn.addEventListener("click", () => activeTimer(25));
shortBtn.addEventListener("click", () => activeTimer(5));
longBtn.addEventListener("click", () => activeTimer(15));

playBtn.addEventListener("click", play);
resetBtn.addEventListener("click", reset);
