import "dotenv/config";
import { drizzle } from "drizzle-orm/mysql2";
import Comments from "../models/comments.models.js";
const db = drizzle(process.env.DATABASE_URL);

// Create a new comment
export const createComment = async (req, res) => {
  try {
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
      user_id: parseInt(req.body.user_id),
      project_id: req.body.project_id ? parseInt(req.body.project_id) : null,
      task_id: req.body.task_id ? parseInt(req.body.task_id) : null,
    };
    const response = Comments.create(comment);

    res.send(response);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the Comment.",
    });
  }
};

// Retrieve all comments
export const findAllComments = async (req, res) => {
  try {
    const allCommments = await Comments.getAll();
    res.status(200).send(allCommments);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving comments.",
    });
  }
};

// Retrieve a single comment by id
export const findOneComment = async (req, res) => {
  try {
    const id = req.params.id;

    const comment = await Comments.getById(id);
    res.status(200).send(comment);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error retrieving Comment with id " + id,
    });
  }
};

// Update a comment by id
// For this example, we update only the comment content.
export const updateComment = async (req, res) => {
  try {
    const id = req.params.id;
    if (!req.body) {
      res.status(400).send({
        message: "Content cannot be empty!",
      });
      return;
    }
    const value = {};

    for (const key in req.body) {
      value[key] = req.body[key];
    }

    const comment = await Comments.updateById(id, value);
    res.status(200).send(comment);
  } catch (err) {
    console.log(err);

    res.status(500).send({
      message: err.message || "Error updating Comment with id " + id,
    });
  }
};

// Delete a comment by id
export const deleteComment = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await Comments.remove(id);
    res.status(200).send({ message: "Comment was deleted successfully!" });
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error deleting Comment with id " + id,
    });
  }
};
