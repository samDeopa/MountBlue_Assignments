let tasks = [
  { id: 1, title: "Get Todo" },
  { id: 2, title: "deleteTodo" },
];
console.log("HI");

let todoList = document.querySelector(".tasks");
const addTodo = (e) => {
  e.preventDefault();
  tasks.push({
    id: Math.floor(Math.random() * 10000),
    title: e.target[0].value,
  });
  e.target[0].value = "";
  renderTodos();
};
let form = document.querySelector(".input-form");
form.addEventListener("submit", addTodo);

const editMode = (id, value) => {
  const form = document.querySelector(".input-form");
  form.children[1].value = value;
  const button = form.children[2];
  button.innerHTML = "Edit";
  form.removeEventListener("submit", addTodo);
  form.removeEventListener("submit", handleEditSubmit);

  form.addEventListener("submit", handleEditSubmit);
};
let currentEditId = null;
const editTodo = (id, value) => {
  currentEditId = id;
  let index = tasks.findIndex((task) => task.id == id);
  tasks[index].title = value;
  renderTodos();
  const form = document.querySelector(".input-form");
  form.children[1].value = "";
  const button = form.children[2];
  button.innerHTML = "Add";
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
    const li = document.createElement("li");
    li.setAttribute("id", task.id);
    let element = `<div class="task">
              <p>${task.title}</p>
              <button onClick="deleteTodo(${task.id})" >X</button>
            </div>`;
    li.innerHTML = element;
    todoList.append(li);
  });
};

const deleteTodo = (id) => {
  console.log("deleting");
  const todo = document.getElementById(`${id}`);
  tasks = tasks.filter((task) => task.id != id);
  todo.remove();
};

renderTodos();

editMode(1, "hello");
