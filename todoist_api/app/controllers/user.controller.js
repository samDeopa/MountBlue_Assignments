import User from "../models/user.models.js";
import { userSchema } from "../schema/zodSchema.js";

export const createUser = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content cannot be empty!",
    });
    return;
  }

  const user = {
    name: req.body.name,
    email: req.body.email,
  };

  if (!validateUser(user, res)) {
    return;
  }

  User.create(user, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the User.",
      });
    } else {
      res.send(data);
    }
  });
};

export const findAllUsers = (req, res) => {
  User.getAll((err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving users.",
      });
    } else {
      res.status(200).send(data);
    }
  });
};

export const findOneUser = (req, res) => {
  const id = req.params.id;
  if (!validateId(id, res)) {
    return;
  }
  User.getById(id, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Error retrieving User with id " + id,
      });
    } else {
      res.status(200).send(data);
    }
  });
};

export const updateUser = (req, res) => {
  const id = req.params.id;
  if (!validateId(id, res)) {
    return;
  }

  // Retrieve existing user details to use as defaults.
  User.getById(id, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Error retrieving User with id " + id,
      });
    } else {
      const user = {
        name: req.body.name || data[0].name,
        email: req.body.email || data[0].email,
      };

      if (!validateUser(user, res)) {
        return;
      }

      User.update(id, user, (err, data) => {
        if (err) {
          res.status(500).send({
            message: err.message || "Error updating User with id " + id,
          });
        } else {
          res.status(200).send(data);
        }
      });
    }
  });
};

export const deleteUser = (req, res) => {
  const id = req.params.id;
  if (!validateId(id, res)) {
    return;
  }
  User.delete(id, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Error deleting User with id " + id,
      });
    } else {
      res.status(200).send(data);
    }
  });
};

function validateUser(user, res) {
  const parseResult = userSchema.safeParse(user);
  if (!parseResult.success) {
    res.status(400).send({
      message: "Invalid data for the User object",
    });
    return false;
  }
  return true;
}

function validateId(id, res) {
  if (!id || isNaN(id)) {
    res.status(400).send({
      message: "Invalid ID for the User object",
    });
    return false;
  }
  return true;
}
