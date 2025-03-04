const state = {
  personalInfo: {
    name: "",
    email: "",
    phone: "",
  },
  plans: {
    monthly: [
      { name: "Arcade", price: 9 },
      { name: "Advanced", price: 12 },
      { name: "Pro", price: 15 },
    ],
    yearly: [
      { name: "Arcade", price: 90 },
      { name: "Advanced", price: 120 },
      { name: "Pro", price: 150 },
    ],
  },
  addOns: {
    monthly: [
      { name: "Online Services", price: 1 },
      { name: "Larger Storage", price: 2 },
      { name: "Customizable profile", price: 2 },
    ],
    yearly: [
      { name: "Online Services", price: 10 },
      { name: "Larger Storage", price: 20 },
      { name: "Customizable profile", price: 20 },
    ],
  },
  monthlyPlans: false,
  step: 0,
  selectedPlan: "",
  selectedAddOns: [],
};

const render = () => {
  const div = document.getElementById(`step-${state.step + 1}`);
  div.classList.remove("hidden");
  if (state.step === 2) {
    renderPricesAddons();
  } else if (state.step === 3) {
    renderCheckoutPrices();
  }
};

const nextStep = () => {
  try {
    switch (state.step) {
      case 0:
        validatePersonalInfo();
        break;
      case 1:
        validatePlan();
        break;
    }
    document.getElementById(`step-${state.step + 1}`).classList.add("hidden");

    if (state.step < 5) {
      document
        .querySelector(`.circle-step-${state.step + 1}`)
        .classList.remove("selected-circle");
      state.step++;
      if (state.step < 4) {
        document
          .querySelector(`.circle-step-${state.step + 1}`)
          .classList.add("selected-circle");
      }
      render();
    }
  } catch (err) {
    console.log(err);
  }
};

const prevStep = () => {
  document.getElementById(`step-${state.step + 1}`).classList.add("hidden");
  if (state.step > 0) {
    document
      .querySelector(`.circle-step-${state.step + 1}`)
      .classList.remove("selected-circle");
    state.step--;
    if (state.step < 4) {
      document
        .querySelector(`.circle-step-${state.step + 1}`)
        .classList.add("selected-circle");
    }
    render();
  }
};

const validatePersonalInfo = () => {
  const nameWarning = document.querySelector(".warning-name");
  const emailWarning = document.querySelector(".warning-email");
  const phoneWarning = document.querySelector(".warning-phone");
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  let hasError = false;
  const regExEmail =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  if (name.length < 3) {
    hasError = true;
    nameWarning.innerText = "Minimum 3 characters required";
  }
  if (phone.length < 3) {
    hasError = true;
    phoneWarning.innerText = "Minimum 3 characters required";
  }

  if (!email.toLowerCase().match(regExEmail)) {
    hasError = true;
    emailWarning.innerText = "Invalid mail address";
  }
  if (isNaN(phone)) {
    hasError = true;
    phoneWarning.innerText = "Invalid character in phone number";
  }

  if (name.length === 0) {
    hasError = true;
    nameWarning.innerText = "This field is Required";
  } else if (name.length >= 3) {
    nameWarning.innerText = "";
  }
  if (email.length === 0) {
    hasError = true;
    emailWarning.innerText = "This field is Required";
  } else if (email.toLowerCase().match(regExEmail)) {
    emailWarning.innerText = "";
  }
  if (phone.length === 0) {
    hasError = true;
    phoneWarning.innerText = "This field is Required";
  } else {
    if (!isNaN(phone) && phone.length > 2) {
      phoneWarning.innerText = "";
    }
  }
  if (hasError) {
    throw new Error("Invalid Inputs");
  }

  state.name = name;
  state.email = email;
  state.phone = phone;
};

const validatePlan = () => {
  const inputs = document.querySelectorAll('input[name="plan"]');
  let selectedPlan;
  for (let key in inputs) {
    if (inputs[key].checked) {
      selectedPlan = inputs[key].id;
    }
  }
  if (!selectedPlan) {
    throw new Error("No Plan selected");
  }
  state.selectedPlan = selectedPlan;
};

const handlePlansChange = (event) => {
  const isMonthly = event.target.checked;
  state.monthlyPlans = isMonthly;

  const offers = document.querySelectorAll(".offer");
  offers.forEach((offer) => {
    if (isMonthly) {
      offer.classList.add("hidden");
    } else {
      offer.classList.remove("hidden");
    }
  });

  const pricingElements = document.querySelectorAll(".pricing");
  pricingElements.forEach((element, index) => {
    const price =
      state.plans[state.monthlyPlans ? "monthly" : "yearly"][index].price;

    element.innerText = `$${price}/mo`;
  });
};

const renderPricesAddons = () => {
  const elements = document.querySelectorAll(".pricing-addon");

  // Validate that we have a matching pricing array
  if (!state.addOnPricing || state.addOnPricing.length !== elements.length) {
    return;
  }

  elements.forEach((element, index) => {
    const basePrice = state.addOnPricing[index];

    if (state.monthlyPlans) {
      element.innerText = `$+${basePrice}/mo`;
    } else {
      element.innerText = `$+${basePrice * 10}/yr`;
    }
  });
};

const handleAddOnChange = (event) => {
  if (event.target.checked) {
    if (event.target.id === "online-sevice") {
      state.selectedAddOns.push("Online Services");
    } else if (event.target.id === "storage") {
      state.selectedAddOns.push("Larger Storage");
    } else if (event.target.id === "custom-profile") {
      state.selectedAddOns.push("Customizable profile");
    }
  } else {
    let index;
    if (event.target.id === "online-sevice") {
      index = state.selectedAddOns.findIndex(
        (element) => element === "Online Services"
      );
    } else if (event.target.id === "storage") {
      index = state.selectedAddOns.findIndex(
        (element) => element === "Larger Storage"
      );
    } else if (event.target.id === "custom-profile") {
      index = state.selectedAddOns.findIndex(
        (element) => element === "Customizable profile"
      );
    }
    state.selectedAddOns.splice(index, 1);
  }
};

const renderCheckoutPrices = () => {
  let total = 0;
  let planPrice;
  let plans = state.plans[state.monthlyPlans ? "monthly" : "yearly"];
  for (let plan of plans) {
    if (plan.name === state.selectedPlan) {
      planPrice = plan.price;
      total += planPrice;
    }
  }

  document.querySelector(".checkout-plan").innerText = `${
    state.selectedPlan
  } (${state.monthlyPlans ? "Monthly" : "Yearly"})`;

  document.querySelector(".checkout-plan-price").innerText = `$${planPrice}/${
    state.monthlyPlans ? "mo" : "yr"
  }`;
  if (!state.selectedAddOns.length) {
    document.querySelector(".addon-divide").classList.add("hidden");
  } else if (state.selectedAddOns.length) {
    document.querySelector(".addon-divide").classList.remove("hidden");
  }

  const addons = document.querySelector(".checkout-addons");
  addons.innerHTML = "";

  state.selectedAddOns.forEach((item) => {
    const div = document.createElement("div");
    div.classList.add("flex");
    div.classList.add("justify-between");

    const price = state.addOns[
      state.monthlyPlans ? "monthly" : "yearly"
    ].reduce((accumulator, curr) => {
      if (curr.name == item) {
        accumulator = curr.price;
      }
      return accumulator;
    }, 0);
    total += price;

    div.innerHTML = `<p class="text-[#9699ab] font-200 font-normal text-[14px]">${item}</p>
                     <p class="text-[#02295a]">+$${price}/${
      state.monthlyPlans ? "mo" : "yr"
    }</p>`;
    addons.append(div);
  });
  const totalPriceElement = document.querySelector(".total-price");
  totalPriceElement.innerText = `+$${total}/${
    state.monthlyPlans ? "mo" : "yr"
  }`;
};

const changePricingPlan = () => {
  prevStep();
  prevStep();
};
// Initial Render
render();

// Expose functions to the global scope so that inline event handlers can find them
window.nextStep = nextStep;
window.prevStep = prevStep;

window.handlePlansChange = handlePlansChange;
window.handleAddOnChange = handleAddOnChange;
window.changePricingPlan = changePricingPlan;

{
  /* <div class="flex justify-between">
  <p class="text-[#9699ab] font-200 font-normal text-[14px]">Larger Storage</p>
  <p class="text-[#02295a]">+$20/yr</p>
</div>; */
}
