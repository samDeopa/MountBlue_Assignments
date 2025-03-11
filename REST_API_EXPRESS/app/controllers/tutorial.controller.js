import {
  getAllTutorials,
  createTutorial,
  getAllPublishedTutorials,
  findTutorialById,
  updateTutorialById,
  removeTutorial,
  removeAllTutorial,
} from "../models/tutorial.models.js";
const createTutorials = (req, res) => {
  console.log(req.body);

  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  const tutorial = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published || false,
  };
  createTutorial(tutorial, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial.",
      });
    else res.send(data);
  });
};

const findAllTutorials = (req, res) => {
  getAllTutorials((err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving the Tutorial.",
      });
    } else {
      res.status(201).send(data);
    }
  });
};

const findAllPublishedTutorials = (req, res) => {
  getAllPublishedTutorials((err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving the Tutorial.",
      });
    } else {
      res.status(201).send(data);
    }
  });
};

const findOneTutorial = (req, res) => {
  findTutorialById(req.params.id, (err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || "Error retrieving Tutorial with id " + req.params.id,
      });
    } else {
      res.status(201).send(data);
    }
  });
};
const updateTutorial = (req, res) => {
  const tutorial = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published || false,
  };
  updateTutorialById(req.params.id, tutorial, (err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || "Error updating Tutorial with id " + req.params.id,
      });
    } else {
      res.status(201).send(data);
    }
  });
};
const deleteTutorial = (req, res) => {
  const id = req.params.id;
  removeTutorial(id, (err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || "Error deleting Tutorial with id " + req.params.id,
      });
    } else {
      res.status(201).send(data);
    }
  });
};

const deleteAllTutorials = (req, res) => {
  removeAllTutorial((err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Error deleting Tutorials ",
      });
    } else {
      res.status(201).send(data);
    }
  });
};

export {
  createTutorials,
  findAllTutorials,
  findAllPublishedTutorials,
  findOneTutorial,
  updateTutorial,
  deleteTutorial,
  deleteAllTutorials,
};
