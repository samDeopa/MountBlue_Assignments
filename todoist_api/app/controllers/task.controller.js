import Task from "../models/task.models.js";
import { taskSchema } from "../schema/zodSchema.js";

// Create a new task
export const createTask = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).send({ message: "Content cannot be empty!" });
    }

    // Use current date as createdAt (formatted as YYYY-MM-DD)
    const createdAt = new Date().toISOString().substring(0, 10);

    const task = {
      content: req.body.content,
      description: req.body.description,
      dueDate: req.body.due_date, // convert as needed to match schema field (camelCase)
      isCompleted: false,
      createdAt: createdAt,
      project_id: req.body.project_id,
    };

    // Validate task object with zod
    const parseResult = taskSchema.safeParse(task);
    if (!parseResult.success) {
      console.log(parseResult.error);
      return res
        .status(400)
        .send({ message: "Invalid data for the task object" });
    }

    const data = await Task.create(task);
    return res.status(201).send(data);
  } catch (err) {
    return res.status(500).send({
      message: err.message || "Some error occurred while creating the Task.",
    });
  }
};

// Retrieve all tasks
export const findAllTasks = async (req, res) => {
  try {
    const data = await Task.getAll();
    return res.status(200).send(data);
  } catch (err) {
    return res.status(500).send({
      message: err.message || "Some error occurred while retrieving tasks.",
    });
  }
};

// Retrieve a single task by id
export const findOneTask = async (req, res) => {
  try {
    const id = req.params.id;
    if (!validateId(id, res)) return;

    const data = await Task.getById(id);
    if (!data || data.length === 0) {
      return res.status(404).send({ message: "Task not found with id " + id });
    }
    return res.status(200).send(data);
  } catch (err) {
    return res.status(500).send({
      message: err.message || "Error retrieving Task with id " + req.params.id,
    });
  }
};

// Update an existing task
export const updateTask = async (req, res) => {
  try {
    const id = req.params.id;
    if (!validateId(id, res)) return;

    // Retrieve existing task to merge defaults
    const existingTask = await Task.getById(id);
    if (!existingTask || existingTask.length === 0) {
      return res.status(404).send({ message: "Task not found with id " + id });
    }

    // Merge incoming values with existing task
    const task = {
      content: req.body.content || existingTask[0].content,
      description: req.body.description || existingTask[0].description,
      dueDate: req.body.due_date || existingTask[0].dueDate,
      isCompleted:
        typeof req.body.is_completed !== "undefined"
          ? req.body.is_completed
          : existingTask[0].isCompleted,
      // Typically, createdAt is not updated:
      createdAt: existingTask[0].createdAt,
      projec_id: req.body.project_id || existingTask[0].project_id,
    };

    const parseResult = taskSchema.safeParse(task);
    if (!parseResult.success) {
      console.log(parseResult.error);
      return res
        .status(400)
        .send({ message: "Invalid data for the task object" });
    }

    const data = await Task.updateById(id, task);
    return res.status(200).send(data);
  } catch (err) {
    return res.status(500).send({
      message: err.message || "Error updating Task with id " + req.params.id,
    });
  }
};

// Delete a task by id
export const deleteTask = async (req, res) => {
  try {
    const id = req.params.id;
    if (!validateId(id, res)) return;

    const data = await Task.remove(id);
    return res.status(200).send(data);
  } catch (err) {
    return res.status(500).send({
      message: err.message || "Error deleting Task with id " + req.params.id,
    });
  }
};

// Filter tasks based on query parameters
export const filterTasks = async (req, res) => {
  try {
    const filters = req.query;
    // Map query keys to the schema's camelCase naming
    const filterParams = {};
    if (filters.project_id)
      filterParams.project_id = parseInt(filters.project_id);
    if (filters.due_date) filterParams.dueDate = filters.due_date;
    if (typeof filters.is_completed !== "undefined") {
      filterParams.isCompleted = filters.is_completed === "true" ? 1 : 0;
    }
    if (filters.created_at) filterParams.createdAt = filters.created_at;
    console.log(filterParams);
    const data = await Task.filter(filterParams);
    console.log(data);

    return res.status(200).send(data);
  } catch (err) {
    return res.status(500).send({
      message: err.message || "Error filtering tasks",
    });
  }
};

// Utility function to validate task ID
function validateId(id, res) {
  if (!id || isNaN(id)) {
    res.status(400).send({ message: "Invalid ID for the task object" });
    return false;
  }
  return true;
}
