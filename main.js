const fs = require("fs");
const readlineSync = require("readline-sync");

const getDirectoryPath = () => {
  let directoryPath = null;

  directoryPath = readlineSync.question(
    `========================================================
    Enter the full path of the directory containing images.\n
    example: /home/username/pics
    ...`
  );

  while (!fs.existsSync(directoryPath)) {
    directoryPath = readlineSync.question(
      `The directory path is invalid. please enter a valid directory path.\n
   ...`
    );
  }

  return directoryPath;
};

const dirPath = getDirectoryPath();
console.log(dirPath);
