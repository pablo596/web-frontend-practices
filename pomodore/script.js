const timer = document.querySelector("#timer");
let runningTime;
let isPaused = true;

let sessionCounter = 0;

const playBtn = document.querySelector("#start");
const resetBtn = document.querySelector("#reset");
const pomodoroBtn = document.querySelector("#pomodoro");
const shortBtn = document.querySelector("#short_break");
const longBtn = document.querySelector("#long_break");

const sessionValue = document.querySelector("#session-value");
const updateSessions = async () => {
  const currentValue = await getSessions();

  const newCount = parseInt(currentValue) + 1;

  localStorage.setItem("sessions", newCount);

  sessionValue.textContent = newCount;
};

const getSessions = async () => {
  const sessions = (await localStorage.getItem("sessions")) || 0;

  sessionCounter = sessions;
  sessionValue.textContent = sessionCounter;
  return sessionCounter;
};

window.addEventListener("load", getSessions);

const timeToMills = (timeInMin) => {
  return timeInMin * 60000;
};
let currentTime = timeToMills(25);

const setTimer = (timeToCount) => {
  isPaused = false;

  let newTimeInSec = timeToCount;
  runningTime = setInterval(() => {
    if (newTimeInSec < 1) {
      timer.textContent = "00:00";
      clearInterval(runningTime);
      isPaused = true;
      changeActiveStatus();
      updateSessions();
      return;
    }
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
  if (isPaused === false) {
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
  isPaused = true;
  clearInterval(runningTime);
  currentTime = timeToMills(minutes);
  timer.textContent = String(minutes).padStart(2, "0") + ":00";
  changeActiveStatus();
};

const play = () => {
  if (isPaused) {
    isPaused = false;
    setTimer(currentTime);
    changeActiveStatus();
  } else {
    isPaused = true;
    clearInterval(runningTime);
    changeActiveStatus();
  }
};

const reset = () => {
  isPaused = true;
  clearInterval(runningTime);
  currentTime = timeToMills(25);
  timer.textContent = String(25).padStart(2, "0") + ":00";
  changeActiveStatus();
};

pomodoroBtn.addEventListener("click", () => activeTimer(25));
shortBtn.addEventListener("click", () => activeTimer(5));
longBtn.addEventListener("click", () => activeTimer(15));

const testBtn = document.querySelector("#test");
testBtn.addEventListener("click", () => activeTimer(0.0666667));

playBtn.addEventListener("click", play);
resetBtn.addEventListener("click", reset);
