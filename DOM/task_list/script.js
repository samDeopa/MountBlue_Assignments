let currentStage = 0;
const messages = [
  "Add contact details for further communication.",
  "Add shipping address for successful delivery.",
  "Complete Payment to complete the order.",
  "Ready to get delivered!",
  "Order Delivered successfully!",
];
const handleNext = () => {
  const prevState = document.querySelector(`.stage-${currentStage + 1}`);
  prevState.classList.add("done");
  prevState.innerHTML = "✅";
  currentStage++;
  document.querySelector(".controls").children[0].disabled = false;

  const message = document.querySelector(".message");
  message.innerHTML = messages[currentStage];

  if (currentStage == 4) {
    document.querySelector(".controls").children[1].disabled = true;
    return;
  }
  document
    .querySelector(`.stage-${currentStage + 1}`)
    .classList.add("in-progress");
  const progressBar = document.querySelector(".progress-bar");

  const width = currentStage * 31;
  progressBar.style.width = `${width}%`;
};

const handlePrev = () => {
  const Nextstate = document.querySelector(`.stage-${currentStage + 1}`);
  if (Nextstate) {
    Nextstate.classList.remove("done", "in-progress");
    Nextstate.innerHTML = currentStage + 1;
  }

  currentStage--;
  document.querySelector(`.stage-${currentStage + 1}`).classList.remove("done");
  document.querySelector(`.stage-${currentStage + 1}`).innerHTML = currentStage;
  document.querySelector(".controls").children[1].disabled = false;
  const progressBar = document.querySelector(".progress-bar");
  const width = currentStage * 31;
  progressBar.style.width = `${width}%`;
  const message = document.querySelector(".message");
  message.innerHTML = messages[currentStage];
  if (currentStage == 0) {
    document.querySelector(".controls").children[0].disabled = true;
    return;
  }
};
