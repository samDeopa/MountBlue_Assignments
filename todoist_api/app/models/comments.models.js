import db from "./db.js"; // Adjust the path as needed

const Comments = {};

// Create a new comment
// newComment should be an object containing: content, user_id, project_id OR task_id (but not both)
Comments.create = (newComment, result) => {
  const sql = "INSERT INTO comments SET ?";
  db.query(sql, newComment, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    result(null, { id: res.insertId, ...newComment });
  });
};

// Retrieve a comment by id
Comments.getById = (id, result) => {
  const sql = "SELECT * FROM comments WHERE id = ?";
  db.query(sql, [id], (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    if (res.length) {
      result(null, res[0]);
      return;
    }
    // not found
    result({ kind: "not_found" }, null);
  });
};

// Retrieve all comments
Comments.getAll = (result) => {
  const sql = "SELECT * FROM comments";
  db.query(sql, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    result(null, res);
  });
};

// Update a comment's content by id
// For simplicity, we update only the content field here. You can extend this as needed.
Comments.updateById = (id, comment, result) => {
  const sql = "UPDATE comments SET content = ? WHERE id = ?";
  db.query(sql, [comment.content, id], (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    if (res.affectedRows === 0) {
      // not found
      result({ kind: "not_found" }, null);
      return;
    }
    result(null, { id, ...comment });
  });
};

// Remove a comment by id
Comments.remove = (id, result) => {
  const sql = "DELETE FROM comments WHERE id = ?";
  db.query(sql, [id], (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    if (res.affectedRows === 0) {
      // not found
      result({ kind: "not_found" }, null);
      return;
    }
    result(null, res);
  });
};

export default Comments;
