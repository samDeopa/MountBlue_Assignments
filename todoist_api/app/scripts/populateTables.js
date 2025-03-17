import populateProjects from "./populateProjects.js";
import populateTasks from "./populateTasks.js";
import populateUsers from "./populateUsers.js";
import db from "../models/db.js";

const populateTable = async () => {
  const start = Date.now();
  try {
    await new Promise((resolve, reject) => {
      db.beginTransaction((err) => {
        if (err) return reject(err);
        resolve();
      });
    });

    console.log(await populateUsers());
    console.log(
      `Time Taken to insert users= ${Math.floor(
        (Date.now() - start) / 1000
      )} seconds`
    );
    console.log(await populateProjects());
    console.log(
      `Time Taken to insert projects= ${Math.floor(
        (Date.now() - start) / 1000
      )} seconds`
    );
    console.log(await populateTasks());
    console.log(
      `Time Taken to insert tasks= ${Math.floor(
        (Date.now() - start) / 1000
      )} seconds`
    );
    await new Promise((resolve, reject) => {
      db.commit((err) => {
        if (err) {
          return db.rollback(() => {
            reject(err);
          });
        }
        resolve();
      });
    });

    console.log(
      `Total Time Taken = ${Math.floor((Date.now() - start) / 1000)} seconds`
    );
  } catch (err) {
    db.rollback(() => {
      console.error("Transaction error:", err);
      process.exit(1);
    });
  }
};

populateTable();
// Time Taken = 175 seconds with logs
