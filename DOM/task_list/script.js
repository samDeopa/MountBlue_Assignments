//var id = "id" + Math.random().toString(16).slice(2)
const tasks = {
  id3e5f2a1b: { value: "Complete project report", list: "left" },
  id7c4d8e9f: { value: "Review pull requests", list: "right" },
  id2a1b3c4d: { value: "Update website content", list: "left" },
  id9d8e7c6b: { value: "Prepare for team meeting", list: "right" },
  id5a4b3c2d: { value: "Write unit tests", list: "left" },
  id1f2e3d4c: { value: "Fix UI responsiveness", list: "right" },
  id6b7a8c9d: { value: "Optimize database queries", list: "left" },
  id4d3e2f1g: { value: "Schedule client call", list: "right" },
  id8c7b6a5d: { value: "Clean up old branches", list: "left" },
  id2f1e3d4c: { value: "Prepare presentation slides", list: "right" },
  id9a8b7c6d: { value: "Refactor authentication module", list: "left" },
  id3d2e1f4c: { value: "Update API documentation", list: "right" },
  id7b6a5c4d: { value: "Test new feature deployment", list: "left" },
  id5f4e3d2c: { value: "Research new tech stack", list: "right" },
  id1c2b3a4d: { value: "Fix critical bugs", list: "left" },
  id8e7d6c5b: { value: "Prepare user training guide", list: "right" },
  id4a3b2c1d: { value: "Check application logs", list: "left" },
  id2e3f4d5c: { value: "Update CI/CD pipelines", list: "right" },
  id9b8a7c6d: { value: "Optimize frontend performance", list: "left" },
  id6f5e4d3c: { value: "Write blog post on best practices", list: "right" },
};

const leftListChecked = [];
const rightListChecked = [];

const render = (tasks) => {
  const leftList = document.querySelector(".list-left");

  const rightList = document.querySelector(".list-right");
  leftList.innerHTML = "";
  rightList.innerHTML = "";
  const keys = Object.keys(tasks);
  keys.forEach((id) => {
    const { value, list } = tasks[id];
    const div = document.createElement("div");

    div.innerHTML = `<input type="checkbox" id="${id}" /> <label for="${id}">${value}</label>`;

    if (list == "left") {
      if (leftListChecked.includes(id)) {
        div.children[0].checked = true;
      }

      leftList.appendChild(div);
    } else {
      if (rightListChecked.includes(id)) {
        div.children[0].checked = true;
      }
      rightList.appendChild(div);
    }
  });
  enableDisableButtons();
};
const handleCheck = (e, list) => {
  if (list == "left") {
    if (e.target.checked) {
      leftListChecked.push(e.target.id);
    } else {
      const ind = leftListChecked.find((ele) => (ele = e.target.id));
      leftListChecked.splice(ind, 1);
    }
  } else {
    if (e.target.checked) {
      rightListChecked.push(e.target.id);
    } else {
      const ind = rightListChecked.find((ele) => (ele = e.target.id));
      rightListChecked.splice(ind, 1);
    }
  }
  enableDisableButtons();
};

const enableDisableButtons = () => {
  const buttons = document.querySelector(".controller").children;

  if (leftListChecked.length) {
    buttons[2].disabled = false;
  } else {
    buttons[2].disabled = true;
  }
  if (rightListChecked.length) {
    buttons[1].disabled = false;
  } else {
    buttons[1].disabled = true;
  }
  console.log(document.querySelector(".list-left").children);

  if (document.querySelector(".list-left").children.length) {
    buttons[3].disabled = false;
  } else {
    buttons[3].disabled = true;
  }
  if (document.querySelector(".list-right").children.length) {
    buttons[0].disabled = false;
  } else {
    buttons[0].disabled = true;
  }
};

const shiftRight = () => {
  while (leftListChecked.length) {
    const id = leftListChecked.pop();
    tasks[id].list = "right";
  }
  render(tasks);
};
const shiftLeft = () => {
  while (rightListChecked.length) {
    const id = rightListChecked.pop();
    tasks[id].list = "left";
  }
  render(tasks);
};
const shiftRightAll = () => {
  for (task in tasks) {
    tasks[task].list = "right";
  }
  while (leftListChecked.length) {
    rightListChecked.push(leftListChecked.pop());
  }
  render(tasks);
};

const shiftLeftAll = () => {
  for (task in tasks) {
    tasks[task].list = "left";
  }
  while (rightListChecked.length) {
    leftListChecked.push(rightListChecked.pop());
  }
  render(tasks);
};
render(tasks);
