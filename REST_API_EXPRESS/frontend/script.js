const createForm = document.getElementById("createForm");
const fetchTutorialsButton = document.getElementById("fetchTutorials");
const tutorialsListDiv = document.getElementById("tutorialsList");

const BASE_URL = "https://tutorials-api-pwq5.onrender.com/api/tutorials";

// Handle form submission to create or update a tutorial
createForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const id = document.getElementById("tutorialId").value;
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const published = document.getElementById("published").checked;
  const tutorialData = { title, description, published };

  try {
    let response;
    if (id) {
      // Update existing tutorial
      response = await fetch(`${BASE_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tutorialData),
      });
      alert("Tutorial updated successfully!");
    } else {
      // Create new tutorial
      response = await fetch(BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tutorialData),
      });
      alert("Tutorial created successfully!");
    }
    createForm.reset();
    document.getElementById("tutorialId").value = "";
    await fetchTutorials();
  } catch (err) {
    console.error("Error saving tutorial:", err);
    alert("Error saving tutorial.");
  }
});

// Fetch and render all tutorials
async function fetchTutorials() {
  try {
    const response = await fetch(BASE_URL);
    const tutorials = await response.json();
    renderTutorials(tutorials);
  } catch (err) {
    console.error("Error fetching tutorials:", err);
    alert("Error fetching tutorials.");
  }
}

fetchTutorialsButton.addEventListener("click", fetchTutorials);

// Render tutorials with edit and delete buttons
function renderTutorials(tutorials) {
  tutorialsListDiv.innerHTML = "";
  if (tutorials.length === 0) {
    tutorialsListDiv.innerHTML = "<p>No tutorials found.</p>";
    return;
  }
  tutorials.forEach((tutorial) => {
    const tutorialDiv = document.createElement("div");
    tutorialDiv.className = "tutorial-item";
    tutorialDiv.innerHTML = `
      <h3 class="tutorial-title">${tutorial.title}</h3>
      <p class="tutorial-description">${tutorial.description}</p>
      <p class="tutorial-published"><strong>Published:</strong> ${tutorial.published}</p>
      <p class="tutorial-id"><strong>ID:</strong> ${tutorial.id}</p>
      <div class="tutorial-actions">
        <button class="btn btn-edit" onclick="editTutorial('${tutorial.id}', '${tutorial.title}', '${tutorial.description}', ${tutorial.published})">Edit</button>
        <button class="btn btn-delete" onclick="deleteTutorial('${tutorial.id}')">Delete</button>
      </div>
    `;
    tutorialsListDiv.appendChild(tutorialDiv);
  });
}

// Edit tutorial
function editTutorial(id, title, description, published) {
  document.getElementById("tutorialId").value = id;
  document.getElementById("title").value = title;
  document.getElementById("description").value = description;
  document.getElementById("published").checked = published;
}

// Delete tutorial
async function deleteTutorial(id) {
  if (!confirm("Are you sure you want to delete this tutorial?")) return;
  try {
    await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
    alert("Tutorial deleted successfully!");
    await fetchTutorials();
  } catch (err) {
    console.error("Error deleting tutorial:", err);
    alert("Error deleting tutorial.");
  }
}

fetchTutorials();
