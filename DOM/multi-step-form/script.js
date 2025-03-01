import { PersonalInfo } from "./components/PersonalInfo.js";

const state = {
  name: "",
  email: "",
  phone: "",
  plan: "",
  monthlyPlans: true,
  step: 0,
};

const pages = [PersonalInfo];

const render = () => {
  const mainDiv = document.querySelector(".main-content");

  if (!mainDiv) {
    console.error("Error: .main-content element not found.");
    return;
  }

  mainDiv.innerHTML = pages[state.step];

  // Attach event listeners to buttons (if any exist in the components)
  attachEventListeners();
};

const attachEventListeners = () => {
  console.log(document.querySelector(".next-btn"));

  document.querySelector(".next-btn")?.addEventListener("click", nextStep);
  document.querySelector(".back-btn")?.addEventListener("click", prevStep);
};

const nextStep = () => {
  console.log("HI");
  if (state.step < pages.length - 1) {
    state.step++;
    render();
  }
};

const prevStep = () => {
  if (state.step > 0) {
    state.step--;
    render();
  }
};

// Initial Render
render();
