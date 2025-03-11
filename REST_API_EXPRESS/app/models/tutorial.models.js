import { DB } from "./db.js";

const createTutorial = (newTutorial, result) => {
  const sql =
    "INSERT INTO tutorials (title, description, published) VALUES (?, ?, ?)";
  const params = [
    newTutorial.title,
    newTutorial.description,
    newTutorial.published,
  ];
  DB.run(sql, params, function (err) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log(this);

    console.log("created tutorial: ", { id: this.lastID, ...newTutorial });
    result(null, { id: this.lastID, ...newTutorial });
  });
};

const getAllTutorials = (result) => {
  const sql = "Select * from  tutorials ";

  DB.all(sql, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);

      return;
    }
    result(null, res);
  });
};

const findTutorialById = (id, result) => {
  const sql = "Select * from tutorials where id = ?";
  DB.get(sql, id, function (err, res) {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }
    result(null, res);
  });
};

const getAllPublishedTutorials = (result) => {
  const sql = "Select * from tutorials where published=true";
  DB.all(sql, function (err, res) {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }
    console.log(res);

    result(null, res);
  });
};

const updateTutorialById = (id, tutorial, result) => {
  console.log(id);

  const sql =
    "Update tutorials set title = ?, description = ? , published = ? where id = ?";
  const params = [tutorial.title, tutorial.description, tutorial.published, id];
  DB.run(sql, params, function (err) {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }
    if (this.changes === 0) {
      // No rows were updated
      result({ message: "No tutorial found with the given ID." }, null);
      return;
    }
    console.log("Updated tutorial:", { id: id, ...tutorial });
    result(null, { id: id, ...tutorial });
  });
};
const removeTutorial = function (id, result) {
  const sql = "delete  from tutorials where id = ?";
  DB.run(sql, id, function (err) {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }

    if (this.changes === 0) {
      // No rows were updated
      result({ message: "No tutorial found with the given ID." }, null);
      return;
    }
    console.log("Deleted tutorial:", id);
    result(null, id);
  });
};

const removeAllTutorial = (result) => {
  const sql = "delete from tutorials";
  DB.run(sql, function (err) {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }
    if (this.changes === 0) {
      // No rows were updated
      result({ message: "No tutorial found." }, null);
      return;
    }
    console.log("Deleted all tutorials");
    result(null, "Deleted all tutorials");
  });
};
export {
  createTutorial,
  getAllTutorials,
  getAllPublishedTutorials,
  findTutorialById,
  updateTutorialById,
  removeTutorial,
  removeAllTutorial,
};
