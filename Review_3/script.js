// const comments = {
//   id: {
//     data: "",
//     children: [1,22,453] ids of the child commets
//   },
//   id: {
//     data: "",
//     children: [3424,34234,234], ids of the child commets
//   },
// };

const parentMap = {};
const comments = {
  1: {
    data: "This is a comment",
    children: [2],
  },
  2: {
    data: "This is a comment level 2",
    children: [3],
  },
  3: {
    data: "This is a comment level 3",
    children: [4],
  },
  4: {
    data: "This is a comment level 4",
    children: [5],
  },
  5: {
    data: "This is a comment level 5",
    children: [],
  },
  6: {
    data: "Nothing",
    children: [],
  },
};
const mainDiv = document.querySelector(".comments");

const handleAdd = () => {
  const input = document.querySelector(".input").value;

  addToComments(input);
  document.querySelector(".input").value = "";
  render();
};

const render = () => {
  console.log(comments);

  mainDiv.innerHTML = "";
  const renderedElement = [];
  for (id in comments) {
    renderHelper(id, 0, renderedElement);
  }
};

const renderHelper = (id, level, renderedElement) => {
  if (renderedElement.includes(parseInt(id))) {
    return;
  }
  if (!comments[id]) {
    return;
  }
  renderedElement.push(parseInt(id));
  const div = document.createElement("div");
  div.classList.add("comment");
  div.innerHTML = `<img src="https://xsgames.co/randomusers/avatar.php?g=pixel" class="profile"></img>
                    <div>
                        <p >${comments[id].data}</p>
                        <div>
                            <button onclick="handleEdit(${id})">Reply</button>
                            <button onclick="handleDelete(${id})">Delete</button>
                        </div>
                        <div class="edit hidden">
                            <input placeholder="Reply..." type="text" />
                            <button onclick="handelNestedAdd(${id})">Add</button>
                            <button onclick="handleCancel(${id})">cancel</button>
                        </div>
                    </div>`;
  div.id = id;
  div.style.marginLeft = `${level * 40}px`;
  mainDiv.appendChild(div);
  for (key of comments[id].children) {
    renderHelper(key, level + 1, renderedElement);
  }
};

addToComments = (comment) => {
  const id = randomId();
  comments[id] = {};
  comments[id].data = comment;
  comments[id].children = [];
  return id;
};

const randomId = () => {
  return parseInt(Math.random() * 10000);
};

const handleEdit = (id) => {
  const ele = document.getElementById(id);
  ele.children[1].children[1].classList.add("hidden");
  ele.children[1].children[2].classList.remove("hidden");
};

const handelNestedAdd = (id) => {
  const ele = document.getElementById(id);
  const input = ele.children[1].children[2].children[0].value;
  const childId = addToComments(input);
  comments[id].children.push(childId);
  parentMap[childId] = id;
  render();
};

const handleCancel = (id) => {
  const ele = document.getElementById(id);
  ele.children[1].children[1].classList.remove("hidden");
  ele.children[1].children[2].classList.add("hidden");
};

const handleDelete = (id) => {
  deleteHelper(id);
  render();
};

const deleteHelper = (id) => {
  if (!comments[id]) {
    return;
  }
  for (child of comments[id].children) {
    deleteHelper(child);
  }
  delete comments[id];
};

const deleteFromParent = (childId) => {
  const parentId = parentMap[childId];
  const index = comments[parentId].children.find(
    (id) => parseInt(id) == parseInt(childId)
  );
  comments[parentId].children.splice(index, 1);
};
Window.handelNestedAdd = handelNestedAdd;
Window.handleAdd = handleAdd;
Window.handleEdit = handleEdit;
Window.handleCancel = handleCancel;
Window.handleDelete = handleDelete;
render();
