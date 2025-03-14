import express from "express";
import cors from "cors";
import projectRouter from "./app/routes/project.routes.js";
import taskRouter from "./app/routes/task.routes.js";
try {
  const app = express();

  app.use(cors());

  app.use(express.json());

  // Error-handling middleware for invalid JSON
  app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
      console.error("Bad JSON:", err);
      return res.status(400).json({ error: "Invalid JSON provided." });
    }
    next();
  });
  app.use("/api/todoist/project", projectRouter);
  app.use("/api/todoist/task", taskRouter);

  const PORT = 8080;

  app.listen(PORT, (err) => {
    if (err) {
      console.log(err.message);
    }
    console.log(`Server is running on port ${PORT}.`);
  });
} catch (err) {
  console.log(err);
}
