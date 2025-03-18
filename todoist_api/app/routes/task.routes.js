import express from "express";
import {
  createTask,
  deleteTask,
  filterTasks,
  findAllTasks,
  findOneTask,
  updateTask,
} from "../controllers/task.controller.js";

const router = express.Router();

router.get("/filter", (req, res) => {
  filterTasks(req, res);
});
router.get("/", (req, res) => {
  findAllTasks(req, res);
});
router.post("/", (req, res) => {
  createTask(req, res);
});
router.get("/:id", (req, res) => {
  findOneTask(req, res);
});
router.put("/:id", (req, res) => {
  updateTask(req, res);
});
router.delete("/:id", (req, res) => {
  deleteTask(req, res);
});

export default router;
