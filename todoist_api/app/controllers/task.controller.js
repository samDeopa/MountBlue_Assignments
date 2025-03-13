import Task from "../models/task.models.js";
import { taskSchema } from "../schema/zodSchema.js";

export const createTask = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  const createdAt = new Date().toISOString().substring(0, 10);

  const task = {
    content: req.body.content,
    description: req.body.description,
    due_date: req.body.due_date,
    is_completed: false,
    created_at: createdAt,
    project_id: req.body.project_id,
  };

  if (!validateTask(task, res)) {
    return;
  }

  Task.create(task, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Task.",
      });
    } else {
      res.send(data);
    }
  });
};

export const findAllTasks = (req, res) => {
  Task.getAll((err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving tasks.",
      });
    } else {
      res.status(201).send(data);
    }
  });
};

export const findOneTask = (req, res) => {
  const id = req.params.id;
  validateId(id, res);
  Task.getById(id, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Error retrieving Task with id " + id,
      });
    } else {
      res.status(201).send(data);
    }
  });
};

export const updateTask = (req, res) => {
  const id = req.params.id;
  Task.getById(id, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Error retrieving Task with id " + id,
      });
    } else {
      const task = {
        title: req.body.title,
        description: req.body.description
          ? req.body.description
          : data[0].description,
        status: req.body.status ? req.body.status : data[0].status,
      };
      validateTask(task, res);
      validateId(id, res);
      Task.update(id, task, (err, data) => {
        if (err) {
          res.status(500).send({
            message: err.message || "Error updating Task with id " + id,
          });
        } else {
          res.status(201).send(data);
        }
      });
    }
  });
};

export const deleteTask = (req, res) => {
  const id = req.params.id;
  validateId(id, res);
  Task.delete(id, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Error deleting Task with id " + id,
      });
    } else {
      res.status(201).send(data);
    }
  });
};

function validateTask(task, res) {
  const parseResult = taskSchema.safeParse(task);
  if (!parseResult.success) {
    console.log(parseResult.error);

    res.status(500).send({
      message: "Invalid data for the task object",
    });
    return false;
  }
  return true;
}

const validateId = (id, res) => {
  if (!id || isNaN(id)) {
    res.status(500).send({
      message: "Invalid ID for the task object",
    });
  }
};
