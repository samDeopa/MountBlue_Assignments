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
    if (!fs2.existsSync(fileDir)) {
      await fs.mkdir("./files");
      createFileHelper(n, fileDir);
    } else {
      createFileHelper(n, fileDir);
    }
  } catch (err) {
    console.log(err);
  }
};

const createFileHelper = async (n, fileDir) => {
  const filePathList = [];
  for (let i = 0; i < n; i++) {
    const filePath = `${fileDir}/file${i}.js`;
    //simulating random creation time for a file
    setTimeout(async () => {
      await fs.writeFile(filePath, `const file = ${fileDir}/file${i}.js;`);
      console.log(`Created ${filePath} successfully!`);
      filePathList.push(filePath);
      if (filePathList.length == n) {
        filePathList.forEach(async (file) => {
          await fs.rm(file);
          console.log(`Deleted ${file} successfully!`);
        });
      }
    }, Math.random() * 100);
  }
};

// -------------------Creating and Deleting file in the callback instantly when the file is created------------------------
const createAndDeleteSimultaneously = (n = 4) => {
  try {
    const fileDir = "./files";
    if (!fs2.existsSync(fileDir)) {
      fs.mkdir(fileDir).then((err) => {
        if (err) {
          console.log(err);
          return;
        }
        creteFileSimulHelper(n, fileDir);
      });
    } else {
      creteFileSimulHelper(n, fileDir);
    }
  } catch (error) {
    console.log(error);
  }
};

const creteFileSimulHelper = (n, fileDir) => {
  for (let i = 0; i < n; i++) {
    fs.writeFile(`${fileDir}/file${i}.js`, "const file = 'random'").then(
      (err) => {
        if (err) {
          console.log(err);
          return;
        }
        //simulating random creation time for a file
        setTimeout(() => {
          console.log(`created file ${i}.js successfully`);
          fs.rm(`${fileDir}/file${i}.js`).then((err) => {
            if (err) {
              console.log(err);
              return;
            }
            console.log(`deleted file ${i}.js successfully`);
          });
        }, Math.random() * 100);
      }
    );
  }
};

const num = Math.floor(Math.random() * 100);
createAndDeleteSimultaneously(num);
module.exports = { createFilesThenDeleteAll, createAndDeleteSimultaneously };
