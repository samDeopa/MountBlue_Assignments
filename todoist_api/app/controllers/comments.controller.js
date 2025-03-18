import Comments from "../models/comments.models.js";

// Create a new comment
export const createComment = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content cannot be empty!",
    });
    return;
  }
  // Build the comment object.
  // Either project_id or task_id should be provided (but not both).
  const comment = {
    content: req.body.content,
    user_id: req.body.user_id,
    project_id: req.body.project_id || null,
    task_id: req.body.task_id || null,
  };

  Comments.create(comment, (err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Comment.",
      });
    } else {
      res.send(data);
    }
  });
};

// Retrieve all comments
export const findAllComments = (req, res) => {
  Comments.getAll((err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving comments.",
      });
    } else {
      res.status(200).send(data);
    }
  });
};

// Retrieve a single comment by id
export const findOneComment = (req, res) => {
  const id = req.params.id;
  Comments.getById(id, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Error retrieving Comment with id " + id,
      });
    } else {
      res.status(200).send(data);
    }
  });
};

// Update a comment by id
// For this example, we update only the comment content.
export const updateComment = (req, res) => {
  const id = req.params.id;
  if (!req.body) {
    res.status(400).send({
      message: "Content cannot be empty!",
    });
    return;
  }
  const comment = {
    content: req.body.content,
  };

  Comments.updateById(id, comment, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Error updating Comment with id " + id,
      });
    } else {
      res.status(200).send(data);
    }
  });
};

// Delete a comment by id
export const deleteComment = (req, res) => {
  const id = req.params.id;
  Comments.remove(id, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Error deleting Comment with id " + id,
      });
    } else {
      res.status(200).send({ message: "Comment was deleted successfully!" });
    }
  });
};
