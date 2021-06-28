const fs = require("fs");
const path = require("path");
const sharp = require("sharp");
const readlineSync = require("readline-sync");
const { Command } = require("commander");
const program = new Command();
const fsExtra = require("fs-extra");

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
const createOutputDir = (dirPath) => {
  const outputDir = `${dirPath}/output`;
  fs.existsSync(outputDir)
    ? fsExtra.emptyDirSync(outputDir)
    : fs.mkdirSync(outputDir);
};

const getFileExtension = (filename) => {
  return path.extname(filename).split(".").pop().toLowerCase();
};

const getFileNameWithoutExtension = (filename) => {
  return path.basename(filename, getFileExtension(filename));
};

const getSupportedFiles = (directoryPath) => {
  const filenames = fs.readdirSync(directoryPath);
  return filenames.filter((filename) => {
    return ["jpg", "jpeg", "png", "webp", "tiff", "gif", "svg"].includes(
      getFileExtension(filename)
    );
  });
};
const convertImageType = (imageType, dirPath) => {
  console.log(
    `Converting ${
      getSupportedFiles(dirPath).length
    } images to ${imageType}\nthe images will be saved in ${dirPath}/output`
  );
  getSupportedFiles(dirPath).forEach(async (filename) => {
    try {
      await sharp(`${dirPath}/${filename}`)
        .toFormat(imageType)
        .toFile(
          `${dirPath}/output/${getFileNameWithoutExtension(
            filename
          )}${imageType}`
        );
    } catch (error) {
      console.log(error);
    }
  });
};

const resizeImages = (width, height, dirPath) => {
  console.log(
    `Resize ${
      getSupportedFiles(dirPath).length
    } images by ${width}x${height}\nthe images will be saved in ${dirPath}/output`
  );
  getSupportedFiles(dirPath).forEach(async (filename) => {
    try {
      await sharp(`${dirPath}/${filename}`)
        .resize(width, height)
        .toFile(`${dirPath}/output/${filename}`);
    } catch (error) {
      console.log(error);
    }
  });
};
const dirPath = getDirectoryPath();

program
  .option("-c, --convert-to <type>", "change image types")
  .option("-r, --resize-to <imageSize...>", "resize images")
  .parse(process.argv);

const options = program.opts();

createOutputDir(dirPath);
if (options.convertTo) convertImageType(options.convertTo, dirPath);
if (options.resizeTo) {
  [width, height] = options.resizeTo;
  resizeImages(parseInt(width), parseInt(height), dirPath);
}
