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
  filter: ({ project_id, due_date, is_completed, created_at }, callback) => {
    let sql = "SELECT * FROM tasks";
    if (
      project_id ||
      due_date ||
      typeof is_completed !== "undefined" ||
      created_at
    ) {
      sql += " WHERE 1=1";
    }
    if (project_id) {
      sql += ` AND project_id = ${project_id}`;
    }
    if (due_date) {
      sql += ` AND due_date = '${due_date}'`;
    }
    if (typeof is_completed !== "undefined") {
      sql += ` AND is_completed = ${is_completed == "true" ? 1 : 0}`;
    }
    if (created_at) {
      sql += ` AND created_at = '${created_at}'`;
    }

    db.query(sql, (err, results) => {
      if (err) {
        return callback(err);
      }
      callback(null, results);
    });
  },
};

export default Task;
