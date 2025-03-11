import express from "express";
import {
  createTutorials,
  deleteAllTutorials,
  deleteTutorial,
  findAllPublishedTutorials,
  findAllTutorials,
  findOneTutorial,
  updateTutorial,
} from "../controllers/tutorial.controller.js";

const router = express.Router();

// Create a new Tutorial
router.post("/", createTutorials);

// Retrieve all Tutorials
router.get("/", findAllTutorials);

// Retrieve all published Tutorials
router.get("/published", findAllPublishedTutorials);

// Retrieve a single Tutorial with id
router.get("/:id", findOneTutorial);

// Update a Tutorial with id
router.put("/:id", updateTutorial);

// Delete a Tutorial with id
router.delete("/:id", deleteTutorial);

// Delete all Tutorials
router.delete("/", deleteAllTutorials);

export default router;
