import sqlite3 from "sqlite3";

const sql3 = sqlite3.verbose();

const connected = (err) => {
  if (err) {
    console.log(err);
    return;
  } else {
    console.log("Sqlite Server Started");
  }
};
const DB = new sqlite3.Database(
  "./tutorials.db",
  sqlite3.OPEN_READWRITE,
  connected
);

export { DB };
