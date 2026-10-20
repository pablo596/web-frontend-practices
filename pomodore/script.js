const timer = document.querySelector("#timer");

const setTimer = (timeToCount = 25) => {
  let newTimeInSec = timeToCount * 60000;
  setInterval(() => {
    newTimeInSec = newTimeInSec - 1000;
    const min = Math.floor(newTimeInSec / 60000);
    const sec = ((newTimeInSec % 60000) / 1000).toFixed(0);

    timer.textContent =
      String(min).padStart(2, "0") + ":" + String(sec).padStart(2, "0");
  }, 1000);
};

setTimer(25);
