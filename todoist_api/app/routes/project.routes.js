import express from "express";
import {
  createProject,
  deleteProject,
  findAllProjects,
  findOneProject,
  updateProject,
} from "../controllers/project.controller.js";

const router = express.Router();

router.get("/", (req, res) => {
  findAllProjects(req, res);
});
router.post("/", (req, res) => {
  createProject(req, res);
});

router.get("/:id", (req, res) => {
  findOneProject(req, res);
});
router.put("/:id", (req, res) => {
  updateProject(req, res);
});

router.delete("/:id", (req, res) => {
  deleteProject(req, res);
});
export default router;
