import express from "express";
import cors from "cors";
import tutorialRouter from "./app/routes/tutorial.routes.js";

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/tutorials", tutorialRouter);

const PORT = 8080;

app.listen(PORT, (err) => {
  if (err) {
    console.log(err.message);
  }
  console.log(`Server is running on port ${PORT}.`);
});
