/*
    Problem 1:
    
    Using callbacks and the fs module's asynchronous functions, do the following:
        1. Create a directory of random JSON files
        2. Delete those files simultaneously 
*/

const fs = require("fs");
//------------------waiting for all the files being created then deleting the all the created file -----------------------

const createFilesThenDeleteAll = (n = 4) => {
  try {
    const fileDir = "./files";
    if (!fs.existsSync(fileDir)) {
      fs.mkdir("./files", (err) => {
        try {
          if (err) {
            throw err;
          }
          createFileHelper(n, fileDir);
        } catch (err) {
          console.log("Error While Creating files a Dir", err);
        }
      });
    } else {
      createFileHelper(n, fileDir);
    }
  } catch (err) {
    console.log(err);
  }
};

const createFileHelper = (n, fileDir) => {
  const filePathList = [];
  for (let i = 0; i < n; i++) {
    const filePath = `${fileDir}/file${i}.js`;
    fs.writeFile(filePath, `const file = ${fileDir}/file${i}.js;`, (err) => {
      try {
        if (err) {
          throw err;
        }
        console.log(`Created ${filePath} successfully!`);
        filePathList.push(filePath);
        if (filePathList.length == n) {
          filePathList.forEach((file) => {
            fs.rm(file, (err) => {
              try {
                if (err) {
                  throw err;
                }
                console.log(`Deleted ${file} successfully!`);
              } catch (err) {
                console.log(err);
              }
            });
          });
        }
      } catch (err) {
        console.log(err);
      }
    });
  }
};

// -------------------Creating and Deleting file in the callback instantly when the file is created------------------------
const createAndDeleteSimultaneously = (n = 4) => {
  try {
    const fileDir = "./files";
    if (!fs.existsSync(fileDir)) {
      fs.mkdir(fileDir, (err) => {
        try {
          if (err) {
            throw err;
          }
          createFileSimulHelper(n, fileDir);
        } catch (err) {
          console.log("Error in creating file", err);
        }
      });
    } else {
      createFileSimulHelper(n, fileDir);
    }
  } catch (error) {
    console.log(error);
  }
};

const createFileSimulHelper = (n, fileDir) => {
  for (let i = 0; i < n; i++) {
    fs.writeFile(`${fileDir}/file${i}.js`, "const file = 'random'", (err) => {
      try {
        if (err) {
          throw err;
        }

        console.log(`created file ${i}.js successfully`);

        fs.rm(`${fileDir}/file${i}.js`, (err) => {
          try {
            if (err) {
              throw err;
            }
            console.log(`deleted file ${i}.js successfully`);
          } catch (err) {
            console.log("Error deleing file ${fileDir}/file${i}.js", err);
          }
        });
      } catch (err) {
        console.log(`Error while writing File ${fileDir}/file${i}.js`, err);
      }
    });
  }
};

const num = Math.floor(Math.random() * 100);
createAndDeleteSimultaneously(num);
module.exports = { createFilesThenDeleteAll, createAndDeleteSimultaneously };
