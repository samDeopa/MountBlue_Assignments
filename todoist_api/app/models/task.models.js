import db from "./db.js";

const Task = {
  getAll: (callback) => {
    db.query("SELECT * FROM tasks", (error, results) => {
      callback(error, results);
    });
  },

  getById: (id, callback) => {
    db.query("SELECT * FROM tasks WHERE id = ?", [id], (error, results) => {
      callback(error, results);
    });
  },

  create: (taskData, callback) => {
    const query = `
      INSERT INTO tasks 
      (content, description, due_date, is_completed, created_at, project_id) 
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const values = [
      taskData.content,
      taskData.description,
      taskData.due_date,
      taskData.is_completed,
      taskData.created_at,
      taskData.project_id,
    ];
    db.query(query, values, (error, result) => {
      callback(error, result);
    });
  },

  update: (id, taskData, callback) => {
    const query = `
      UPDATE tasks 
      SET content = ?, 
          description = ?, 
          due_date = ?, 
          is_completed = ?, 
          created_at = ?, 
          project_id = ? 
      WHERE id = ?
    `;
    const values = [
      taskData.content,
      taskData.description,
      taskData.due_date,
      taskData.is_completed,
      taskData.created_at,
      taskData.project_id,
      id,
    ];
    db.query(query, values, (error, result) => {
      callback(error, result);
    });
  },

  delete: (id, callback) => {
    db.query("DELETE FROM tasks WHERE id = ?", [id], (error, result) => {
      callback(error, result);
    });
  },
};

export default Task;
