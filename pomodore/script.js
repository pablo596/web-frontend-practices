const timer = document.querySelector("#timer");
let runningTime;
let isPaused = false;
const setTimer = (timeToCount = 25) => {
  let newTimeInSec = timeToCount * 60000;
  runningTime = setInterval(() => {
    newTimeInSec = newTimeInSec - 1000;
    const min = Math.floor(newTimeInSec / 60000);
    const sec = ((newTimeInSec % 60000) / 1000).toFixed(0);

    timer.textContent =
      String(min).padStart(2, "0") + ":" + String(sec).padStart(2, "0");
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
  timer.textContent = String(minutes).padStart(2, "0") + ":00";
  clearInterval(runningTime);

  setTimer(minutes);
};

const play = () => {};
const reset = () => {};
