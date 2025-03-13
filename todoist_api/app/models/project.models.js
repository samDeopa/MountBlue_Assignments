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
  update: (id, projectData, callback) => {
    const query = `
      UPDATE projects
      SET name = ?,
          color = ?,
          is_favorite = ?
      WHERE id = ?
    `;
    const values = [
      projectData.name,
      projectData.color,
      projectData.is_favorite,
      id,
    ];
    db.query(query, values, (error, result) => {
      callback(error, result);
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
