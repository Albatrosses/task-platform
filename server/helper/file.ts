import fs from "fs";
import { generateHashCode } from ".";

export const writeFile = ({ path, data, options }: any) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, options, error => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
};

export const unlink = path => {
  return new Promise((resolve, reject) => {
    fs.unlink(path, error => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
};

export const generateImageBuffer = (
  image: string,
  path: string,
  name: string
) => {
  const imageBuffer = Buffer.from(
    image.replace(/^data:image\/\w+;base64,/, ""),
    "base64"
  );
  const imageFilePath = `/media/${path}`;
  const imageFileName = `${name}_${generateHashCode()}.jpg`;

  return {
    imageBuffer,
    imageFilePath,
    imageFileName
  };
};
