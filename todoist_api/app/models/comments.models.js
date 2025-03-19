import { comments } from "../../drizzle/schema.js";
import db from "../db/db.js";

const Comments = {};

// Create a new comment
Comments.create = async (newComment) => {
  return db.insert(comments).values(newComment);
};

// Retrieve a comment by id
Comments.getById = (id) => {
  return db.select().from(comments).where({ id: id });
};
// Retrieve all comments
Comments.getAll = () => {
  return db.select().from(comments);
};

// Update a comment's content by id
Comments.updateById = (id, comment) => {
  return db.update(comments).set(comment).where({ id: id });
};

// Remove a comment by id
Comments.remove = (id) => {
  return db.delete(comments).where({ id: id });
};

export default Comments;
