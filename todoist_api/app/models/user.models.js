import db from "./db.js";

const User = {
  getAll: (callback) => {
    db.query("SELECT * FROM users", (error, results) => {
      callback(error, results);
    });
  },

  getById: (id, callback) => {
    db.query("SELECT * FROM users WHERE id = ?", [id], (error, results) => {
      callback(error, results);
    });
  },

  create: (userData, callback) => {
    const query = `
      INSERT INTO users (name, email) 
      VALUES (?, ?)
    `;
    const values = [userData.name, userData.email];
    db.query(query, values, (error, result) => {
      callback(error, result);
    });
  },

  update: (id, userData, callback) => {
    const query = `
      UPDATE users 
      SET name = ?, email = ? 
      WHERE id = ?
    `;
    const values = [userData.name, userData.email, id];
    db.query(query, values, (error, result) => {
      callback(error, result);
    });
  },

  delete: (id, callback) => {
    db.query("DELETE FROM users WHERE id = ?", [id], (error, result) => {
      callback(error, result);
    });
  },
};

export default User;
