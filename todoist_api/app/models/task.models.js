import db from "../db/db.js";
import { tasks } from "../../drizzle/schema.js";

const Task = {};
// Retrieve all tasks
Task.getAll = () => {
  return db.select().from(tasks);
};

// Retrieve a task by id
Task.getById = (id) => {
  return db.select().from(tasks).where({ id: id });
};

// Create a new task
Task.create = async (taskData) => {
  return db.insert(tasks).values(taskData);
};

// Update a task by id
Task.updateById = (id, taskData) => {
  return db.update(tasks).set(taskData).where({ id: id });
};

// Remove a task by id
Task.remove = (id) => {
  return db.delete(tasks).where({ id: id });
};

// Filter tasks based on provided conditions
Task.filter = (filters) => {
  return db.select().from(tasks).where(filters);
};

export default Task;
