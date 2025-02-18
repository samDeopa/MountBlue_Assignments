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
const lipsumEdit = () => {
  try {
    const filePath = "./files/lipsum.txt";
    fs.readFile(filePath, { encoding: "utf-8" }, (err, data) => {
      if (err) {
        console.log(err);
      }
      console.log(data.toUpperCase().split(".").join(".\n"));
    });
  } catch (err) {
    console.log(err);
  }
};
lipsumEdit();
