const state = {
  num1: "0",
  num2: "0",
  action: "",
};

const handleInput = (event) => {
  const display = document.querySelector(".display");
  if (event.target.type != "submit") {
    return;
  }

  console.log(event.target.innerHTML);
  const input = event.target.innerHTML;
  if (input === "C") {
    clearInput();
  } else if (isNaN(input)) {
    if (input === "=") {
      if (state.action != "") {
        const result = calculateInput();
        display.value = result;
        state.num1 = result;
        state.action = "";
        state.num2 = "0";
      } else {
        display.value = state.num1;
      }
    } else {
      if (input === ".") {
        if (state.action === "") {
          state.num1 = state.num1 + input;
          display.value = state.num1;
        } else {
          state.num2 = state.num2 + input;
          display.value = state.num2;
        }
      } else {
        state.action = input;
      }
    }
  } else {
    if (state.action === "") {
      state.num1 = state.num1 === "0" ? input : state.num1 + input;
      display.value = state.num1;
      console.log(display);
    } else {
      state.num2 = state.num2 === "0" ? input : state.num2 + input;
      display.value = state.num2;
      console.log(display);
    }
  }
};

const clearInput = () => {
  state.num1 = "0";
  state.num2 = "0";
  state.action = "";
  const display = document.querySelector(".display");

  display.value = state.num1;
};

const calculateInput = () => {
  const { action, num1, num2 } = state;
  if (action == "+") {
    return Number(num1) + Number(num2);
  } else if (action == "-") {
    return Number(num1) - Number(num2);
  } else if (action == "/") {
    return Number(num1) / Number(num2);
  } else if (action == "*") {
    return Number(num1) * Number(num2);
  }
};
