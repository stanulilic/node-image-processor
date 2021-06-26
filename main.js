const fs = require("fs");
const readlineSync = require("readline-sync");
const { Command } = require("commander");
const program = new Command();

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

program
  .option("-c, --convert-to <type>", "change image type")
  .parse(process.argv);

const options = program.opts();
console.log(options);

if (options.convertTo) console.log(options.convertTo);
