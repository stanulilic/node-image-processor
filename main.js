const readlineSync = require("readline-sync");

var directoryPath = readlineSync.question(
  `========================================================
   Enter the full path of the directory containing images.\n
   example: /home/username/pics
   ...`
);
