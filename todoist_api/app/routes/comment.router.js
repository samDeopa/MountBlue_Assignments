import express from "express";
import {
  createComment,
  deleteComment,
  findAllComments,
  findOneComment,
  updateComment,
} from "../controllers/comments.controller.js";

const router = express.Router();

// GET /comments - Retrieve all comments
router.get("/", (req, res) => {
  findAllComments(req, res);
});

// GET /comments/:id - Retrieve a specific comment by ID
router.get("/:id", (req, res) => {
  findOneComment(req, res);
});

// POST /comments - Create a new comment
router.post("/", (req, res) => {
  createComment(req, res);
});

// PATCH /comments/:id - Update an existing comment
router.patch("/:id", (req, res) => {
  updateComment(req, res);
});

// DELETE /comments/:id - Delete a comment
router.delete("/:id", (req, res) => {
  deleteComment(req, res);
});

export default router;
