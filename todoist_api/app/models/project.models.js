import { projects } from "../../drizzle/schema.js";
import db from "../db/db.js";

const Project = {};

// Create a new comment
Project.create = (newProject) => {
  return db.insert(projects).values(newProject);
};

// Retrieve a comment by id
Project.getById = (id) => {
  return db.select().from(projects).where({ id: id });
};

// Retrieve all projects
Project.getAll = () => {
  return db.select().from(projects);
};

// Update a comment's content by id
Project.updateById = (id, comment) => {
  return db.update(projects).set(comment).where({ id: id });
};

// Remove a comment by id
Project.remove = (id) => {
  return db.delete(projects).where({ id: id });
};

export default Project;
