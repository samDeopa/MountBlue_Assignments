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
      state.step++;
      render();
    }
  } catch (err) {
    alert(err);
    console.log(err);
  }
};

const prevStep = () => {
  document.getElementById(`step-${state.step + 1}`).classList.add("hidden");
  if (state.step > 0) {
    state.step--;
    render();
  }
};

const validatePersonalInfo = () => {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
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

  const addons = document.querySelector(".checkout-addons");
  addons.innerHTML = "";
  state.selectedAddOns.forEach((item) => {
    const div = document.createElement("div");
    div.classList.add("flex");
    div.classList.add("justify-between");
    console.log(state.addOns[state.monthlyPlans ? "monthly" : "yearly"]);

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

    const totalPriceElement = document.querySelector(".total-price");
    totalPriceElement.innerText = `+$${total}/${
      state.monthlyPlans ? "mo" : "yr"
    }`;
  });
};
// Initial Render
render();

// Expose functions to the global scope so that inline event handlers can find them
window.nextStep = nextStep;
window.prevStep = prevStep;

window.handlePlansChange = handlePlansChange;
window.handleAddOnChange = handleAddOnChange;
{
  /* <div class="flex justify-between">
  <p class="text-[#9699ab] font-200 font-normal text-[14px]">Larger Storage</p>
  <p class="text-[#02295a]">+$20/yr</p>
</div>; */
}
