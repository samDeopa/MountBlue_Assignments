import express from "express";
import {
  createUser,
  findAllUsers,
  findOneUser,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";

const router = express.Router();

// Get all users
router.get("/", (req, res) => {
  findAllUsers(req, res);
});

// Create a new user
router.post("/", (req, res) => {
  createUser(req, res);
});

// Get a single user by id
router.get("/:id", (req, res) => {
  findOneUser(req, res);
});

// Update a user by id
router.put("/:id", (req, res) => {
  updateUser(req, res);
});

// Delete a user by id
router.delete("/:id", (req, res) => {
  deleteUser(req, res);
});

export default router;
