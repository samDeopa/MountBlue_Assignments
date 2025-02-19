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
const lipsumEdit = (
  inputFilePath = "./files/lipsum.txt",
  filenamesListPath = "./filenames.txt"
) => {
  try {
    fs.readFile(inputFilePath, { encoding: "utf-8" }, (err, data) => {
      if (err) {
        console.log(err);
      }
      console.log(`Write Opearation in file lipsum.txt Successfully.\n`);
      data = data.toUpperCase();
      const upperCaseFile = "lipsumUppercase.txt";
      fs.writeFile(`./files/${upperCaseFile}`, data, (err) => {
        if (err) {
          console.log(err);
        }
        console.log(
          `Write Opearation in file ${upperCaseFile}  Successfully.\n`
        );
        fs.appendFile(filenamesListPath, `${upperCaseFile}\n`, () => {
          console.log(
            `Appended file ${upperCaseFile} in filenames Successfully.\n`
          );
          fs.readFile(
            `./files/${upperCaseFile}`,
            { encoding: "utf-8" },
            (err, data) => {
              if (err) {
                console.log(err);
              }
              console.log(
                `Reading Opearation on file ${upperCaseFile}  Successfully.\n`
              );
              const sentences = data.toUpperCase().split(".").join(".\n");
              const sentencesFile = "sentences.txt";
              fs.writeFile(
                `./files/${sentencesFile}`,
                sentences,
                { encoding: "utf-8" },
                (err) => {
                  if (err) {
                    console.log(err);
                  }
                  console.log(
                    `Write Opearation in file ${sentencesFile}  Successfully.\n`
                  );
                  fs.appendFile(
                    filenamesListPath,
                    `${sentencesFile}\n`,
                    (err) => {
                      if (err) {
                        console.log(err);
                      }
                      console.log(
                        `Appended file ${sentencesFile} in filenames Successfully.\n`
                      );
                      fs.readFile(
                        `./files/${sentencesFile}`,
                        { encoding: "utf-8" },
                        (err, sentences) => {
                          if (err) {
                            console.log(err);
                          }
                          console.log(
                            `Reading Opearation on file ${sentencesFile}  Successfully.\n`
                          );

                          const sortedSentences = sentences
                            .split("\n")
                            .sort()
                            .join("\n");
                          const sortedSentencesFile = "sortedSentences.txt";
                          fs.writeFile(
                            `./files/${sortedSentencesFile}`,
                            sortedSentences,
                            (err) => {
                              if (err) {
                                console.log(err);
                              }
                              console.log(
                                `Write Opearation in file ${sortedSentencesFile}  Successfully.\n`
                              );
                              fs.appendFile(
                                filenamesListPath,
                                `${sortedSentencesFile}`,
                                (err) => {
                                  if (err) {
                                    console.log(err);
                                  }
                                  console.log(
                                    `Appended file ${sortedSentencesFile} in filenames Successfully.\n`
                                  );
                                  fs.readFile(
                                    "./filenames.txt",
                                    { encoding: "utf-8" },
                                    (err, data) => {
                                      console.log(
                                        `Reading Opearation on file ${sortedSentencesFile}  Successfully.\n`
                                      );
                                      data.split("\n").forEach((file) => {
                                        fs.rm(`./files/${file}`, (err) => {
                                          if (err) {
                                            console.log(err);
                                          }
                                        });
                                      });
                                      fs.writeFile(
                                        "./filenames.txt",
                                        "",
                                        (err) => {
                                          if (err) {
                                            console.log(err);
                                          }
                                        }
                                      );
                                    }
                                  );
                                }
                              );
                            }
                          );
                        }
                      );
                    }
                  );
                }
              );
            }
          );
        });
      });
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { lipsumEdit };
