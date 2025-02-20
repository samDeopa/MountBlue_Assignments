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
  try {
    fs.readFile(inputFilePath, { encoding: "utf-8" }, (err, content) => {
      try {
        if (err) {
          throw err;
        }
        console.log(`Read operation on ${inputFilePath} successful.\n`);
        const upperCaseContent = content.toUpperCase();
        const upperCaseFile = "lipsumUppercase.txt";
        const upperCaseFilePath = `./files/${upperCaseFile}`;

        fs.writeFile(upperCaseFilePath, upperCaseContent, (err) => {
          try {
            if (err) {
              throw err;
            }

            console.log(
              `Write operation in ${upperCaseFilePath} successful.\n`
            );
            fs.appendFile(filenamesListPath, `${upperCaseFile}\n`, (err) => {
              try {
                if (err) {
                  throw err;
                }

                console.log(
                  `Appended ${upperCaseFile} to ${filenamesListPath}.\n`
                );
                processSentences(upperCaseFilePath, filenamesListPath);
              } catch (err) {
                console.log(
                  `Error appending ${upperCaseFile} to ${filenamesListPath}:`,
                  err
                );
              }
            });
          } catch (err) {
            console.log(`Error writing ${upperCaseFilePath}:`, err);
          }
        });
      } catch (err) {
        console.log(`Error reading ${inputFilePath}:`, err);
      }
    });
  } catch (err) {
    console.log(err);
  }
};

const processSentences = (upperCaseFilePath, filenamesListPath) => {
  fs.readFile(upperCaseFilePath, { encoding: "utf-8" }, (err, content) => {
    if (err) {
      throw err;
    }

    console.log(`Read operation on ${upperCaseFilePath} successful.\n`);
    const sentences = content.toLowerCase().split(".").join(".\n");
    const sentencesFile = "sentences.txt";
    const sentencesFilePath = `./files/${sentencesFile}`;

    fs.writeFile(sentencesFilePath, sentences, { encoding: "utf-8" }, (err) => {
      try {
        if (err) {
          console.error(err);
          return;
        }

        console.log(`Write operation in ${sentencesFilePath} successful.\n`);
        fs.appendFile(filenamesListPath, `${sentencesFile}\n`, (err) => {
          try {
            if (err) {
              throw err;
            }

            console.log(`Appended ${sentencesFile} to ${filenamesListPath}.\n`);
            processSortedSentences(sentencesFilePath, filenamesListPath);
          } catch (err) {
            console.log(
              `Error appending ${sentencesFile} to ${filenamesListPath}:`,
              err
            );
          }
        });
      } catch (err) {
        console.log(`Error writing ${sentencesFilePath}:`, err);
      }
    });
  });
};

const processSortedSentences = (sentencesFilePath, filenamesListPath) => {
  fs.readFile(sentencesFilePath, { encoding: "utf-8" }, (err, content) => {
    try {
      if (err) {
        throw err;
      }

      console.log(`Read operation on ${sentencesFilePath} successful.\n`);
      const sortedContent = content.split("\n").sort().join("\n");
      const sortedFile = "sortedSentences.txt";
      const sortedFilePath = `./files/${sortedFile}`;

      fs.writeFile(sortedFilePath, sortedContent, (err) => {
        try {
          if (err) {
            throw err;
          }

          console.log(`Write operation in ${sortedFilePath} successful.\n`);
          fs.appendFile(filenamesListPath, `${sortedFile}\n`, (err) => {
            try {
              if (err) {
                throw err;
              }

              console.log(`Appended ${sortedFile} to ${filenamesListPath}.\n`);
              deleteFiles(filenamesListPath);
            } catch (err) {
              console.log(
                `Error appending ${sortedFile} to ${filenamesListPath}:`,
                err
              );
            }
          });
        } catch (err) {
          console.log(`Error writing ${sortedFilePath}:`, err);
        }
      });
    } catch (err) {
      console.log(`Error reading ${sentencesFilePath}:`, err);
    }
  });
};

const deleteFiles = (filenamesListPath) => {
  fs.readFile(filenamesListPath, { encoding: "utf-8" }, (err, fileNames) => {
    try {
      if (err) {
        throw err;
      }

      console.log(`Read operation on ${filenamesListPath} successful.\n`);
      fileNames.split("\n").forEach((file) => {
        const filePath = `./files/${file.trim()}`;
        if (file) {
          fs.rm(filePath, (err) => {
            try {
              if (err) {
                throw err;
              }
              console.log(`Deleted ${filePath} successfully.`);
            } catch (err) {
              console.log(`Error deleting ${filePath}:`, err);
            }
          });
        }
      });

      fs.writeFile(filenamesListPath, "", (err) => {
        try {
          if (err) {
            throw err;
          }
          console.log(`Cleared ${filenamesListPath} successfully.`);
        } catch (err) {
          console.log(`Error clearing ${filenamesListPath}:`, err);
        }
      });
    } catch (err) {
      console.log(`Error reading ${filenamesListPath}:`, err);
    }
  });
};

// Execute the function
processLipsumFile();

module.exports = { processLipsumFile };
