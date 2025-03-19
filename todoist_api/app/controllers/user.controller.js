import User from "../models/user.models.js";
import { userSchema } from "../schema/zodSchema.js";

// Create a new user
export const createUser = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).send({ message: "Content cannot be empty!" });
    }

    const user = {
      name: req.body.name,
      email: req.body.email,
    };

    // Validate the user data
    const parseResult = userSchema.safeParse(user);
    if (!parseResult.success) {
      return res
        .status(400)
        .send({ message: "Invalid data for the User object" });
    }

    const data = await User.create(user);
    return res.status(201).send(data);
  } catch (err) {
    return res.status(500).send({
      message: err.message || "Some error occurred while creating the User.",
    });
  }
};

// Retrieve all users
export const findAllUsers = async (req, res) => {
  try {
    const data = await User.getAll();
    return res.status(200).send(data);
  } catch (err) {
    return res.status(500).send({
      message: err.message || "Some error occurred while retrieving users.",
    });
  }
};

// Retrieve a user by id
export const findOneUser = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id || isNaN(id)) {
      return res
        .status(400)
        .send({ message: "Invalid ID for the User object" });
    }

    const data = await User.getById(id);
    if (!data || data.length === 0) {
      return res.status(404).send({ message: "User not found with id " + id });
    }
    return res.status(200).send(data);
  } catch (err) {
    return res.status(500).send({
      message: err.message || "Error retrieving User with id " + req.params.id,
    });
  }
};

// Update an existing user
export const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id || isNaN(id)) {
      return res
        .status(400)
        .send({ message: "Invalid ID for the User object" });
    }

    const existingUser = await User.getById(id);
    if (!existingUser || existingUser.length === 0) {
      return res.status(404).send({ message: "User not found with id " + id });
    }

    // Merge incoming data with existing user details
    const user = {
      name: req.body.name || existingUser[0].name,
      email: req.body.email || existingUser[0].email,
    };

    const parseResult = userSchema.safeParse(user);
    if (!parseResult.success) {
      return res
        .status(400)
        .send({ message: "Invalid data for the User object" });
    }

    const data = await User.updateById(id, user);
    return res.status(200).send(data);
  } catch (err) {
    return res.status(500).send({
      message: err.message || "Error updating User with id " + req.params.id,
    });
  }
};

// Delete a user by id
export const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id || isNaN(id)) {
      return res
        .status(400)
        .send({ message: "Invalid ID for the User object" });
    }
    const data = await User.remove(id);
    return res.status(200).send(data);
  } catch (err) {
    return res.status(500).send({
      message: err.message || "Error deleting User with id " + req.params.id,
    });
  }
};
