/*
    Problem 1:
    
    Using callbacks and the fs module's asynchronous functions, do the following:
        1. Create a directory of random JSON files
        2. Delete those files simultaneously 
*/

const fs = require("fs");
//------------------waiting for all the files being created then deleting the all the created file -----------------------

const createFilesThenDeleteAll = (n) => {
  try {
    const fileDir = "./files";
    if (!fs.existsSync(fileDir)) {
      fs.mkdir("./files", (err) => {
        if (err) {
          console.log(err);
          return;
        }
        createFileHelper(n, fileDir);
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
      if (err) {
        console.log(err);
        return;
      }
      console.log(`Created ${filePath} successfully!`);
      filePathList.push(filePath);
      if (filePathList.length == n) {
        filePathList.forEach((file) => {
          fs.rm(file, (err) => {
            if (err) {
              console.log(err);
            }
            console.log(`Deleted ${file} successfully!`);
          });
        });
      }
    });
  }
};

// -------------------Creating and Deleting file in the callback instantly when the file is created------------------------
const createAndDeleteSimultaneously = (n) => {
  try {
    const fileDir = "./files";
    if (!fs.existsSync(fileDir)) {
      fs.mkdir(fileDir, (err) => {
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
    fs.writeFile(`./files/file${i}.js`, "const file = 'random'", (err) => {
      if (err) {
        console.log(err);
        return;
      }

      console.log(`created file ${i}.js successfully`);
      fs.rm(`./files/file${i}.js`, (err) => {
        if (err) {
          console.log(err);
          return;
        }
        console.log(`deleted file ${i}.js successfully`);
      });
    });
  }
};

const num = Math.floor(Math.random() * 100);
createAndDeleteSimultaneously(num);
module.exports = { createFilesThenDeleteAll, createAndDeleteSimultaneously };
