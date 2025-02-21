/*
    Problem 2:
    
    Using callbacks and the fs module's asynchronous functions, do the following:
        1. Read the given file lipsum.txt
        2. Convert the content to uppercase & write to a new file. Store the name of the new file in filenames.txt
        3. Read the new file and convert it to lower case. Then split the contents into sentences. Then write it to a new file. Store the name of the new file in filenames.txt
        4. Read the new files, sort the content, write it out to a new file. Store the name of the new file in filenames.txt
        5. Read the contents of filenames.txt and delete all the new files that are mentioned in that list simultaneously.
*/

const fs = require("fs");

const processLipsumFile = (
  inputFilePath = "./files/lipsum.txt",
  filenamesListPath = "./filenames.txt"
) => {
  const readPromise = new Promise((resolve, reject) => {
    fs.readFile(inputFilePath, { encoding: "utf-8" }, (err, content) => {
      if (err) {
        reject(err);
      }
      resolve(content);
    });
  });
  readPromise
    .then((content) => {
      console.log(`Read operation on ${inputFilePath} successful.\n`);
      const upperCaseContent = content.toUpperCase();
      const upperCaseFile = "lipsumUppercase.txt";
      const upperCaseFilePath = `./files/${upperCaseFile}`;
      const writePromise = new Promise((resolve, reject) => {
        fs.writeFile(upperCaseFilePath, upperCaseContent, (err) => {
          if (err) {
            reject(err);
          }
          resolve();
        });
      });
      return writePromise
        .then(() => {
          console.log(`Write operation in ${upperCaseFilePath} successful.\n`);
          const appendPromise = new Promise((resolve, reject) => {
            fs.appendFile(filenamesListPath, `${upperCaseFile}\n`, (err) => {
              if (err) {
                reject(err);
              }
              resolve();
            });
          });
          return appendPromise;
        })
        .then(() => {
          console.log(`Appended ${upperCaseFile} to ${filenamesListPath}.\n`);
          processSentences(upperCaseFilePath, filenamesListPath);
        })
        .catch((err) => console.error(`Error in deleteFiles: ${err}`));
    })
    .catch((err) => {
      console.log(err);
    });
};

const processSentences = (upperCaseFilePath, filenamesListPath) => {
  const readPromise = new Promise((resolve, reject) => {
    fs.readFile(upperCaseFilePath, { encoding: "utf-8" }, (err, content) => {
      if (err) {
        reject(err);
      }
      resolve(content);
    });
  });
  readPromise
    .then((content) => {
      console.log(`Read operation on ${upperCaseFilePath} successful.\n`);
      const sentences = content.split(".").join(".\n");
      const sentencesFile = "sentences.txt";
      const sentencesFilePath = `./files/${sentencesFile}`;

      const writePromise = new Promise((resolve, reject) => {
        fs.writeFile(
          sentencesFilePath,
          sentences,
          { encoding: "utf-8" },
          (err) => {
            if (err) {
              reject(err);
            }
            resolve();
          }
        );
      });
      writePromise
        .then(() => {
          console.log(`Write operation in ${sentencesFilePath} successful.\n`);
          const appendPromise = new Promise((resolve, reject) => {
            fs.appendFile(filenamesListPath, `${sentencesFile}\n`, (err) => {
              if (err) {
                reject(err);
              }
              resolve();
            });
          });
          return appendPromise;
        })
        .then(() => {
          console.log(`Appended ${sentencesFile} to ${filenamesListPath}.\n`);
          processSortedSentences(sentencesFilePath, filenamesListPath);
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

const processSortedSentences = (sentencesFilePath, filenamesListPath) => {
  const readPromise = new Promise((resolve, reject) => {
    fs.readFile(sentencesFilePath, { encoding: "utf-8" }, (err, content) => {
      if (err) {
        reject(err);
      }
      resolve(content);
    });
  });
  readPromise
    .then((content) => {
      console.log(`Read operation on ${sentencesFilePath} successful.\n`);
      const sortedContent = content.split("\n").sort().join("\n");
      const sortedFile = "sortedSentences.txt";
      const sortedFilePath = `./files/${sortedFile}`;

      const writePromise = new Promise((resolve, reject) => {
        fs.writeFile(
          sortedFilePath,
          sortedContent,
          { encoding: "utf-8" },
          (err) => {
            if (err) {
              reject(err);
            }
            resolve();
          }
        );
      });
      writePromise
        .then(() => {
          console.log(`Write operation in ${sortedFilePath} successful.\n`);
          const appendPromise = new Promise((resolve, reject) => {
            fs.appendFile(filenamesListPath, `${sortedFile}\n`, (err) => {
              if (err) {
                reject(err);
              }
              resolve();
            });
          });
          return appendPromise;
        })
        .then(() => {
          console.log(`Appended ${sortedFile} to ${filenamesListPath}.\n`);
          deleteFiles(filenamesListPath);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

const deleteFiles = (filenamesListPath) => {
  const readPromise = new Promise((resolve, reject) => {
    fs.readFile(filenamesListPath, { encoding: "utf-8" }, (err, content) => {
      if (err) {
        reject(err);
      }
      resolve(content);
    });
  });
  readPromise
    .then((fileNames) => {
      console.log(`Read operation on ${filenamesListPath} successful.\n`);
      const deletionPromises = fileNames.split("\n").map((file) => {
        const filePath = `./files/${file.trim()}`;
        if (file) {
          const deletePromise = new Promise((resolve, reject) => {
            fs.rm(filePath, (err) => {
              if (err) {
                reject(err);
              }
              resolve();
            });
          });
          return deletePromise.then(() => {
            console.log(`Deleted ${filePath} successfully.`);
          });
        }
      });
      Promise.all(deletionPromises)
        .then(() => {
          console.log("Deleted All the files Successfully");
          const clearPromise = new Promise((resolve, reject) => {
            fs.writeFile(filenamesListPath, "", (err) => {
              if (err) {
                reject(err);
              }
              resolve();
            });
          });
          return clearPromise;
        })
        .then(() => {
          console.log(`Cleared ${filenamesListPath} successfully.`);
        })
        .catch((err) => console.error(`Error in deleteFiles: ${err}`));
    })
    .catch((err) => {
      console.log(err);
    });
};

// Execute the function
processLipsumFile();

module.exports = { processLipsumFile };
