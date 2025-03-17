import db from "../models/db.js";

const adjectives = [
  "Innovative",
  "Dynamic",
  "Revolutionary",
  "Cutting-Edge",
  "NextGen",
  "Smart",
  "Visionary",
  "Pioneering",
  "Advanced",
  "Creative",
  "Robust",
  "Intelligent",
  "Agile",
  "Modern",
  "Efficient",
  "Strategic",
  "Forward-Looking",
  "Sustainable",
  "Impactful",
  "Adaptive",
  "Quantum",
  "Synergistic",
  "Transformative",
  "Insightful",
  "Scalable",
  "Progressive",
  "Global",
  "Holistic",
  "Integrated",
  "NextWave",
];

const nouns = [
  "Solution",
  "Project",
  "Initiative",
  "Platform",
  "System",
  "Framework",
  "Network",
  "Engine",
  "Tool",
  "Application",
  "Concept",
  "Model",
  "Strategy",
  "Program",
  "Service",
  "Algorithm",
  "Architecture",
  "Design",
  "Experiment",
  "Venture",
  "Paradigm",
  "Matrix",
  "Protocol",
  "Ecosystem",
  "Hub",
  "Nexus",
  "Interface",
  "Module",
  "Blueprint",
  "Catalyst",
];

const colors = ["Blue", "Red", "Yellow", "Green"];

const generateProjects = () => {
  const projects = [];
  for (let i = 1; i <= 10000; i++) {
    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    projects.push(`${adjective} ${noun} Project #${i}`);
  }
  return projects;
};

const projects = generateProjects();

const chunkArray = (array, size) => {
  const chunks = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
};

const getUserIds = (callback) => {
  db.query("SELECT id FROM users", (err, data) => {
    if (err) {
      callback(err);
    } else {
      callback(null, data);
    }
  });
};

const insertProjectsChunk = (valuesChunk, callback) => {
  const query = `INSERT INTO projects (name, color, is_favorite, user_id) VALUES ${valuesChunk.join(
    ", "
  )};`;
  db.query(query, (err, result) => {
    if (err) return callback(err);
    callback(null, result);
  });
};

const processChunks = (userId, chunks, index, done) => {
  if (index >= chunks.length) {
    return done();
  }
  insertProjectsChunk(chunks[index], (err, result) => {
    if (err) {
      return done(err);
    }

    processChunks(userId, chunks, index + 1, done);
  });
};

const processUsers = (userRows, index, chunkSize, done) => {
  if (index >= userRows.length) {
    return done();
  }
  const user = userRows[index];
  const values = projects.map((projectName) => {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const escapedName = projectName.replace(/'/g, "''");
    return `('${escapedName}', '${randomColor}', false, ${user.id})`;
  });
  const chunks = chunkArray(values, chunkSize);
  processChunks(user.id, chunks, 0, (err) => {
    if (err) {
      return done(err);
    }
    processUsers(userRows, index + 1, chunkSize, done);
  });
};

const populateProjects = () => {
  return new Promise((resolve, reject) => {
    const chunkSize = 500;
    getUserIds((err, userRows) => {
      if (err) {
        reject("Error fetching user IDs:", err);
      }
      processUsers(userRows, 0, chunkSize, (err) => {
        if (err) {
          reject("Error populating projects:", err);
        }
        resolve("All projects inserted successfully.");
      });
    });
  });
};

export default populateProjects;
