import Project from "../models/project.models.js";
import { projectSchema } from "../schema/zodSchema.js";

// Create a new project
export const createProject = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).send({
        message: "Content cannot be empty!",
      });
    }
    const project = {
      name: req.body.name,
      color: req.body.color,
      is_favorite: req.body.is_favorite || false,
      user_id: req.body.user_id || null,
    };

    // Validate project object with zod
    const parse = projectSchema.safeParse(project);
    if (!parse.success) {
      return res.status(400).send({
        message: "Invalid data for the project object",
      });
    }

    const data = await Project.create(project);
    res.status(201).send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the Project.",
    });
  }
};

// Retrieve all projects
export const findAllProjects = async (req, res) => {
  try {
    const data = await Project.getAll();
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving Projects.",
    });
  }
};

// Retrieve a project by id
export const findOneProject = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id || isNaN(id)) {
      return res.status(400).send({
        message: "Invalid ID for the project object",
      });
    }
    const data = await Project.getById(id);
    if (!data || data.length === 0) {
      return res.status(404).send({
        message: `Project not found with id ${id}`,
      });
    }
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send({
      message:
        err.message || `Error retrieving Project with id ${req.params.id}`,
    });
  }
};

// Update an existing project
export const updateProject = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id || isNaN(id)) {
      return res.status(400).send({
        message: "Invalid ID for the project object",
      });
    }

    const existingProject = await Project.getById(id);
    if (!existingProject || existingProject.length === 0) {
      return res.status(404).send({
        message: "Project not found with id " + id,
      });
    }

    // Merge incoming values with the existing project data
    const project = {
      name: req.body.name || existingProject[0].name,
      color: req.body.color || existingProject[0].color,
      is_favorite:
        typeof req.body.is_favorite !== "undefined"
          ? req.body.is_favorite
          : existingProject[0].is_favorite,
      user_id: req.body.user_id || existingProject[0].user_id,
    };

    // Validate the merged project object
    const parse = projectSchema.safeParse(project);
    if (!parse.success) {
      return res.status(400).send({
        message: "Invalid data for the project object",
      });
    }

    const data = await Project.update(id, project);
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || `Error updating Project with id ${req.params.id}`,
    });
  }
};

// Delete a project by id
export const deleteProject = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id || isNaN(id)) {
      return res.status(400).send({
        message: "Invalid ID for the project object",
      });
    }
    const data = await Project.delete(id);
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || `Error deleting Project with id ${req.params.id}`,
    });
  }
};
