let counter = 0;
let intervalId = 0;
const render = () => {
  if (counter === 0) {
    const stopwatch = document.querySelector(".stop-watch");
    stopwatch.classList.add("border");
  }
  const counterElement = document.querySelector(".counter");
  let ms = counter % 1000;
  let sec = parseInt(counter / 1000) % 60;
  let min = parseInt(counter / 1000 / 60);

  counterElement.innerText = `${min}:${sec}:${ms}`;
};

const start = () => {
  intervalId = setInterval(() => {
    counter++;
    render();
  }, 1);
};

const stop = () => {
  clearInterval(intervalId);
};
render();

const reset = () => {
  clearInterval(intervalId);
  counter = 0;
  render();
};
