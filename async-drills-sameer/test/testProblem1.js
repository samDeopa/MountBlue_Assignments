const {
  createFilesThenDeleteAll,
  createAndDeleteSimultaneously,
} = require("../problem1");
//should create and create 10 files silmultaneously deleting them;
createAndDeleteSimultaneously(10);

//calling without giving the number of files Shoud create and delete 4 files which is given as default
createAndDeleteSimultaneously();

//should create and create 10 files ones and the  deletethem;
createFilesThenDeleteAll(10);

//calling without giving the number of files Shoud create and delete 4 files which is given as default
createFilesThenDeleteAll();
