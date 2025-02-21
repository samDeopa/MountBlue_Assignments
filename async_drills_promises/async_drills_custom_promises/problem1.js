/*
    Problem 1:
    
    Using callbacks and the fs module's asynchronous functions, do the following:
        1. Create a directory of random JSON files
        2. Delete those files simultaneously 
*/

const fs = require("fs");
//------------------waiting for all the files being created then deleting the all the created file -----------------------

const createFilesThenDeleteAll = async (n = 4) => {
  try {
    const fileDir = "./files";
    const mkdirPromise = new Promise((resolve, reject) => {
      fs.mkdir("./files", { recursive: true }, (err) => {
        if (err) {
          reject(err);
        }
        resolve(`${fileDir} Created`);
      });
    });
    mkdirPromise.then(() => createFileHelper(n, fileDir));
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
          const writePromise = new Promise((resolve, reject) => {
            fs.writeFile(
              filePath,
              `const file = ${fileDir}/file${i}.js;`,
              (err) => {
                if (err) {
                  reject(err);
                }
                resolve(`Created ${filePath}  successfully!`);
              }
            );
          });
          writePromise.then(() => {
            console.log(`Created ${filePath} successfully!`);
            filePathList.push(filePath);
            if (filePathList.length == n) {
              console.log();

              filePathList.forEach((file) => {
                const deletePromise = new Promise((resolve, reject) => {
                  fs.rm(file, (err) => {
                    if (err) {
                      reject(err);
                    }
                    resolve(`Deleted ${file} successfully!`);
                  });
                });
                deletePromise.then(() =>
                  console.log(`Deleted ${file} successfully!`)
                );
              });
            }
          });
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
    const mkdirPromise = new Promise((resolve, reject) => {
      fs.mkdir(fileDir, { recursive: true }, (err) => {
        if (err) {
          reject();
        }
        resolve(`${fileDir} Created`);
      });
    });
    mkdirPromise
      .then(() => {
        creteFileSimulHelper(n, fileDir);
      })
      .catch((err) => console.log(err));
  } catch (error) {
    console.log(error);
  }
};

const creteFileSimulHelper = (n, fileDir) => {
  for (let i = 0; i < n; i++) {
    const filePath = `${fileDir}/file${i}.js`;
    const writePromise = new Promise((resolve, reject) => {
      fs.writeFile(filePath, `const file = ${fileDir}/file${i}.js;`, (err) => {
        if (err) {
          reject(err);
        }
        resolve(`Created ${filePath}  successfully!`);
      });
    });
    writePromise
      .then(() => {
        //simulating random creation time for a file
        setTimeout(() => {
          console.log(`created file ${i}.js successfully`);
          const deletePromise = new Promise((resolve, reject) => {
            fs.rm(filePath, (err) => {
              if (err) {
                reject(err);
              }
              resolve(`Deleted ${filePath} successfully!`);
            });
          });
          deletePromise
            .then(() => {
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
