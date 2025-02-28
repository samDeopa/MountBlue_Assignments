let tasks = [
  { id: 1, title: "Get Todo", done: true },
  { id: 2, title: "deleteTodo", done: false },
];
console.log("HI");
const editSvg = `<svg class='input-icon' width="64px" height="64px" viewBox="-2.4 -2.4 28.80 28.80" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#FFFF"><g id="SVGRepo_bgCarrier" stroke-width="0"><rect x="-2.4" y="-2.4" width="28.80" height="28.80" rx="2.88" fill="#8d49e9" strokewidth="0"></rect></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Edit / Edit_Pencil_Line_01"> <path id="Vector" d="M4 20.0001H20M4 20.0001V16.0001L12 8.00012M4 20.0001L8 20.0001L16 12.0001M12 8.00012L14.8686 5.13146L14.8704 5.12976C15.2652 4.73488 15.463 4.53709 15.691 4.46301C15.8919 4.39775 16.1082 4.39775 16.3091 4.46301C16.5369 4.53704 16.7345 4.7346 17.1288 5.12892L18.8686 6.86872C19.2646 7.26474 19.4627 7.46284 19.5369 7.69117C19.6022 7.89201 19.6021 8.10835 19.5369 8.3092C19.4628 8.53736 19.265 8.73516 18.8695 9.13061L18.8686 9.13146L16 12.0001M12 8.00012L16 12.0001" stroke="#FFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g> </g></svg>`;
const addIcon = `<svg
              class="input-icon"
              width="64px"
              height="64px"
              viewBox="-10.56 -10.56 37.12 37.12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              stroke="#FFFF"
              stroke-width="0.00016"
              transform="rotate(0)"
            >
              <g
                id="SVGRepo_bgCarrier"
                stroke-width="0"
                transform="translate(0,0), scale(1)"
              >
                <rect
                  x="-10.56"
                  y="-10.56"
                  width="37.12"
                  height="37.12"
                  rx="7.4239999999999995"
                  fill="#8d49e9"
                  strokewidth="0"
                ></rect>
              </g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke="#CCCCCC"
                stroke-width="0.8"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  d="M10 1H6V6L1 6V10H6V15H10V10H15V6L10 6V1Z"
                  fill="#FFFF"
                ></path>
              </g>
            </svg>`;
let todoList = document.querySelector(".tasks");
const addTodo = (e) => {
  e.preventDefault();
  tasks.unshift({
    id: Math.floor(Math.random() * 10000),
    title: e.target[0].value,
  });
  e.target[0].value = "";
  renderTodos();
};
let form = document.querySelector(".input-form");
form.addEventListener("submit", addTodo);

let currentEditId = null;

const editMode = (id, value) => {
  currentEditId = id;
  const form = document.querySelector(".input-form");

  form.children[1].children[0].value = value;
  const button = form.children[1].children[1];
  button.innerHTML = editSvg;
  form.removeEventListener("submit", addTodo);
  form.removeEventListener("submit", handleEditSubmit);

  form.addEventListener("submit", handleEditSubmit);
};
const editTodo = (id, value) => {
  let index = tasks.findIndex((task) => task.id == id);
  tasks[index].title = value;
  renderTodos();
  const form = document.querySelector(".input-form");
  form.children[1].children[0].value = "";
  const button = form.children[1].children[1];
  button.innerHTML = addIcon;
  form.removeEventListener("submit", handleEditSubmit);
  form.addEventListener("submit", addTodo);
};

const handleEditSubmit = (e) => {
  e.preventDefault();
  if (currentEditId !== null) {
    editTodo(currentEditId, e.target[0].value);
  }
};

const renderTodos = () => {
  todoList.innerHTML = "";
  tasks.forEach((task) => {
    const div = document.createElement("div");
    div.classList.add("task");
    div.setAttribute("id", task.id);
    let element = `
              <input type="checkbox"/>
              <p>${task.title}</p>
              <div>
              <button onClick="deleteTodo(${task.id})" >❌</button>
              <button onClick="editMode(${task.id},'${task.title}')" >✎</button>
              </div>
            `;
    div.innerHTML = element;
    if (task.done) {
      div.children[0].checked = true;
    }
    todoList.append(div);
  });
};
// editMode(1, "hello");

const deleteTodo = (id) => {
  console.log("deleting");
  const todo = document.getElementById(`${id}`);
  tasks = tasks.filter((task) => task.id != id);
  todo.remove();
};

renderTodos();
