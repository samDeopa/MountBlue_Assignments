import db from "../models/db.js";

const taskNames = [
  "Design Landing Page",
  "Implement User Authentication",
  "Fix Navigation Bar Bug",
  "Set Up Database Backup",
  "Write Unit Tests for API Endpoints",
  "Optimize Website Loading Speed",
  "Update User Documentation",
  "Deploy to Production Environment",
  "Conduct Code Review",
  "Plan Sprint Meeting",
];

function getRandomFutureDate() {
  const today = new Date();
  const daysToAdd = Math.floor(Math.random() * 30) + 1; // 1 to 30 days ahead
  const futureDate = new Date(
    today.getTime() + daysToAdd * 24 * 60 * 60 * 1000
  );
  return futureDate.toISOString().split("T")[0]; // Format: YYYY-MM-DD
}

function getRandomPastDate() {
  const today = new Date();
  const daysToSubtract = Math.floor(Math.random() * 30) + 1; // 1 to 30 days ago
  const pastDate = new Date(
    today.getTime() - daysToSubtract * 24 * 60 * 60 * 1000
  );
  return pastDate.toISOString().split("T")[0]; // Format: YYYY-MM-DD
}

const getProjectIds = async () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT id FROM projects", (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
};

const populateTasks = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const projects = await getProjectIds();
      // Loop over each project to insert tasks
      for (const project of projects) {
        const values = taskNames.map((task) => {
          const content = `this is content for ${task}`;
          const description = `this is description for ${task}`;
          const due_date = getRandomFutureDate();
          const is_completed = Math.random() < 0.5; // Random boolean value
          const created_at = getRandomPastDate();
          // Use the current project's ID
          return `('${content}', '${description}', '${due_date}', ${is_completed}, '${created_at}', ${project.id})`;
        });

        const query = `
                INSERT INTO tasks (content, description, due_date, is_completed, created_at, project_id)
                VALUES ${values.join(", ")}
              `;

        await new Promise((resolve, reject) => {
          db.query(query, (err, result) => {
            if (err) reject(err);
            else resolve(result);
          });
        });
      }
      resolve("All tasks inserted successfully.");
    } catch (error) {
      reject("Error populating tasks:", error);
    }
  });
};
export default populateTasks;
