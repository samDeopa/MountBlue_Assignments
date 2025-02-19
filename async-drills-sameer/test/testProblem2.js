const { lipsumEdit } = require("../problem2");

//calling without any argument should take the default ones;
lipsumEdit();

lipsumEdit("./files/lipsum.txt", "./filenames.txt");
