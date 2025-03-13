import Project from "../models/project.models.js";

import { projectSchema } from "../schema/zodSchema.js";
export const createProject = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  const project = {
    name: req.body.name,
    color: req.body.color,
    is_favorite: req.body.is_favorite || false,
  };

  validateProject(project, res);
  Project.create(project, (err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Project.",
      });
    } else res.send(data);
  });
};

export const findAllProjects = (req, res) => {
  Project.getAll((err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving the Project.",
      });
    } else {
      res.status(201).send(data);
    }
  });
};

export const findOneProject = (req, res) => {
  const id = req.params.id;

  validateId(id, res);
  Project.getById(req.params.id, (err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || "Error retrieving Project with id " + req.params.id,
      });
    } else {
      res.status(201).send(data);
    }
  });
};
export const updateProject = (req, res) => {
  const id = req.params.id;
  Project.getById(id, (err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || "Error retrieving Project with id " + req.params.id,
      });
    } else {
      const project = {
        name: req.body.name,
        color: req.body.color ? req.body.color : data[0].color,
        is_favorite: req.body.is_favorite
          ? req.body.is_favorite
          : data[0].is_favorite == 1
          ? true
          : false,
      };
      validateProject(project, res);

      validateId(id, res);

      Project.update(id, project, (err, data) => {
        if (err) {
          res.status(500).send({
            message:
              err.message || "Error updating Tutorial with id " + req.params.id,
          });
        } else {
          res.status(201).send(data);
        }
      });
    }
  });
};
export const deleteProject = (req, res) => {
  const id = req.params.id;
  validateId(id, res);
  Project.delete(id, (err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || "Error deleting Project with id " + req.params.id,
      });
    } else {
      res.status(201).send(data);
    }
  });
};

function validateProject(project, res) {
  const parse = projectSchema.safeParse(project);

  if (!parse.success) {
    res.status(500).send({
      message: "Invalid data for the project object",
    });
  }
}
const validateId = (id, res) => {
  if (!id || isNaN(id)) {
    res.status(500).send({
      message: "Invalid ID for the project object",
    });
  }
};
