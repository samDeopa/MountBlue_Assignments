/*
    Problem 1:
    
    Using callbacks and the fs module's asynchronous functions, do the following:
        1. Create a directory of random JSON files
        2. Delete those files simultaneously 
*/

const fs = require("fs").promises;
const fs2 = require("fs");
//------------------waiting for all the files being created then deleting the all the created file -----------------------

const createFilesThenDeleteAll = async (n = 4) => {
  try {
    const fileDir = "./files";

    fs.mkdir("./files", { recursive: true }).then(() =>
      createFileHelper(n, fileDir)
    );
  } catch (err) {
    console.log(err);
  }
};

const createFileHelper = async (n, fileDir) => {
  try {
    const filePathList = [];
    for (let i = 0; i < n; i++) {
      const filePath = `${fileDir}/file${i}.js`;
      //simulating random creation time for a file
      setTimeout(async () => {
        try {
          fs.writeFile(filePath, `const file = ${fileDir}/file${i}.js;`).then(
            () => {
              console.log(`Created ${filePath} successfully!`);
              filePathList.push(filePath);
              if (filePathList.length == n) {
                filePathList.forEach((file) => {
                  fs.rm(file).then(() =>
                    console.log(`Deleted ${file} successfully!`)
                  );
                });
              }
            }
          );
        } catch (err) {
          console.log(err);
        }
      }, Math.random() * 100);
    }
  } catch (err) {
    console.log(err);
  }
};

// -------------------Creating and Deleting file in the callback instantly when the file is created------------------------
const createAndDeleteSimultaneously = (n = 4) => {
  try {
    const fileDir = "./files";
    fs.mkdir(fileDir, { recursive: true })
      .then((err) => {
        if (err) {
          console.log(err);
          return;
        }
        creteFileSimulHelper(n, fileDir);
      })
      .catch((err) => console.log(err));
  } catch (error) {
    console.log(error);
  }
};

const creteFileSimulHelper = (n, fileDir) => {
  for (let i = 0; i < n; i++) {
    fs.writeFile(`${fileDir}/file${i}.js`, "const file = 'random'")
      .then((err) => {
        if (err) {
          throw err;
        }
        //simulating random creation time for a file
        setTimeout(() => {
          console.log(`created file ${i}.js successfully`);
          fs.rm(`${fileDir}/file${i}.js`)
            .then((err) => {
              if (err) {
                console.log(err);
                return;
              }
              console.log(`deleted file ${i}.js successfully`);
            })
            .catch((err) => console.log(err));
        }, Math.random() * 100);
      })
      .catch((err) => console.log(err));
  }
};

const num = Math.floor(Math.random() * 100);
createFilesThenDeleteAll(num);
module.exports = { createFilesThenDeleteAll, createAndDeleteSimultaneously };
