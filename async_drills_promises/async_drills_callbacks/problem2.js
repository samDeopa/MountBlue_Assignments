/*
    Problem 2:
    
    Using callbacks and the fs module's asynchronous functions, do the following:
        1. Read the given file lipsum.txt
        2. Convert the content to uppercase & write to a new file. Store the name of the new file in filenames.txt
        3. Read the new file and convert it to lower case. Then split the contents into sentences. Then write it to a new file. Store the name of the new file in filenames.txt
        4. Read the new files, sort the content, write it out to a new file. Store the name of the new file in filenames.txt
        5. Read the contents of filenames.txt and delete all the new files that are mentioned in that list simultaneously.
*/

const fs = require("fs").promises;

const processLipsumFile = (
  inputFilePath = "./files/lipsum.txt",
  filenamesListPath = "./filenames.txt"
) => {
  fs.readFile(inputFilePath, { encoding: "utf-8" })
    .then((content) => {
      console.log(`Read operation on ${inputFilePath} successful.\n`);
      const upperCaseContent = content.toUpperCase();
      const upperCaseFile = "lipsumUppercase.txt";
      const upperCaseFilePath = `./files/${upperCaseFile}`;
      return fs
        .writeFile(upperCaseFilePath, upperCaseContent)
        .then(() => {
          console.log(`Write operation in ${upperCaseFilePath} successful.\n`);
          return fs.appendFile(filenamesListPath, `${upperCaseFile}\n`);
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
  fs.readFile(upperCaseFilePath, { encoding: "utf-8" })
    .then((content) => {
      console.log(`Read operation on ${upperCaseFilePath} successful.\n`);
      const sentences = content.split(".").join(".\n");
      const sentencesFile = "sentences.txt";
      const sentencesFilePath = `./files/${sentencesFile}`;

      fs.writeFile(sentencesFilePath, sentences, { encoding: "utf-8" })
        .then(() => {
          console.log(`Write operation in ${sentencesFilePath} successful.\n`);
          return fs.appendFile(filenamesListPath, `${sentencesFile}\n`);
        })
        .then(() => {
          console.log(`Appended ${sentencesFile} to ${filenamesListPath}.\n`);
          processSortedSentences(sentencesFilePath, filenamesListPath);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

const processSortedSentences = (sentencesFilePath, filenamesListPath) => {
  fs.readFile(sentencesFilePath, { encoding: "utf-8" })
    .then((content) => {
      console.log(`Read operation on ${sentencesFilePath} successful.\n`);
      const sortedContent = content.split("\n").sort().join("\n");
      const sortedFile = "sortedSentences.txt";
      const sortedFilePath = `./files/${sortedFile}`;

      fs.writeFile(sortedFilePath, sortedContent)
        .then(() => {
          console.log(`Write operation in ${sortedFilePath} successful.\n`);
          return fs.appendFile(filenamesListPath, `${sortedFile}\n`);
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
  fs.readFile(filenamesListPath, { encoding: "utf-8" }).then((fileNames) => {
    console.log(`Read operation on ${filenamesListPath} successful.\n`);
    const deletionPromises = fileNames.split("\n").map((file) => {
      const filePath = `./files/${file.trim()}`;
      if (file) {
        return fs.rm(filePath).then(() => {
          console.log(`Deleted ${filePath} successfully.`);
        });
      }
    });
    Promise.all(deletionPromises)
      .then(() => {
        console.log("Deleted All the files Successfully");
        return fs.writeFile(filenamesListPath, "");
      })
      .then(() => {
        console.log(`Cleared ${filenamesListPath} successfully.`);
      })
      .catch((err) => console.error(`Error in deleteFiles: ${err}`));
  });
};

// Execute the function
processLipsumFile();

module.exports = { processLipsumFile };
