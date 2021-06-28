const fs = require("fs");
const path = require("path");
const sharp = require("sharp");
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

const getFileExtension = (filename) => {
  return path.extname(filename).split(".").pop().toLowerCase();
};
const convertImageType = (image_type, dirPath) => {
  const filenames = fs.readdirSync(dirPath);
  filenames
    .filter((filename) => {
      return ["jpg", "jpeg", "png", "webp", "tiff", "gif", "svg"].includes(
        getFileExtension(filename)
      );
    })
    .forEach(async (filename) => {
      try {
        const h = await sharp(`${dirPath}/${filename}`).metadata();
        console.log(h);
      } catch (error) {
        console.log(error);
      }
    });
};

const dirPath = getDirectoryPath();

program
  .option("-c, --convert-to <type>", "change image type")
  .parse(process.argv);

const options = program.opts();

if (options.convertTo) convertImageType(options.convertTo, dirPath);
