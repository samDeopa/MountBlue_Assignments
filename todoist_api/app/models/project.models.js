import db from "./db.js";

const Project = {
  // Retrieve all projects
  getAll: (callback) => {
    db.query("SELECT * FROM projects", (error, results) => {
      callback(error, results);
    });
  },

  // Retrieve a project by its ID
  getById: (id, callback) => {
    db.query("SELECT * FROM projects WHERE id = ?", [id], (error, results) => {
      callback(error, results);
    });
  },

  // Create a new project
  create: (projectData, callback) => {
    // projectData should have: name, color, is_favorite
    const query = `
      INSERT INTO projects (name, color, is_favorite)
      VALUES (?, ?, ?)
    `;
    const values = [
      projectData.name,
      projectData.color,
      projectData.is_favorite,
    ];
    db.query(query, values, (error, result) => {
      callback(error, result);
    });
  },

  // Update an existing project
  update: (id, project, result) => {
    let fields = [];
    let values = [];

    if (project.name !== undefined) {
      fields.push("name = ?");
      values.push(project.name);
    }
    if (project.color !== undefined) {
      fields.push("color = ?");
      values.push(project.color);
    }
    if (project.is_favorite !== undefined) {
      fields.push("is_favorite = ?");
      values.push(project.is_favorite);
    }
    if (project.user_id !== undefined) {
      fields.push("user_id = ?");
      values.push(project.user_id);
    }

    // If no fields provided, return early.
    if (fields.length === 0) {
      result({ kind: "no_fields_provided" }, null);
      return;
    }

    // Append the id for the WHERE clause.
    values.push(id);

    const query = `UPDATE projects SET ${fields.join(", ")} WHERE id = ?`;

    db.query(query, values, (err, res) => {
      if (err) {
        result(err, null);
        return;
      }

      // Return the updated project data (for demonstration, we return the fields we updated)
      result(null, { id, ...project });
    });
  },
  // Delete a project by its ID
  delete: (id, callback) => {
    db.query("DELETE FROM projects WHERE id = ?", [id], (error, result) => {
      callback(error, result);
    });
  },
};

export default Project;
