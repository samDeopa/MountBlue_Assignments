import { users } from "../../drizzle/schema.js";
import db from "../db/db.js";

const User = {};

// Create a new user
User.create = async (userData) => {
  return db.insert(users).values(userData);
};

// Retrieve a user by id
User.getById = (id) => {
  return db.select().from(users).where({ id: id });
};

// Retrieve all users
User.getAll = () => {
  return db.select().from(users);
};

// Update a user by id
User.updateById = (id, userData) => {
  return db.update(users).set(userData).where({ id: id });
};

// Remove a user by id
User.remove = (id) => {
  return db.delete(users).where({ id: id });
};

export default User;
