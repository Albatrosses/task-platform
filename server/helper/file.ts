import fs from "fs";
import { generateHashCode } from ".";
import { imageSizeConfig } from "../api/config/common";

export const mkdir = (path: string) => {
  return new Promise(resolve => {
    fs.mkdir(path, error => {
      if (error) {
        resolve(false);
      } else {
        resolve(true);
      }
    });
  });
};

export const rmdir = (path: string) => {
  return new Promise(resolve => {
    fs.rmdir(path, error => {
      if (error) {
        resolve(false);
      } else {
        resolve(true);
      }
    });
  });
};

export const lstat = (path: string) => {
  return new Promise(resolve => {
    fs.lstat(path, error => {
      if (error) {
        resolve(false);
      } else {
        resolve(true);
      }
    });
  });
};

export const stat = (path: string) => {
  return new Promise(resolve => {
    fs.stat(path, error => {
      if (error) {
        resolve(false);
      } else {
        resolve(true);
      }
    });
  });
};

export const writeFile = ({ path, data, options }: any) => {
  return new Promise(resolve => {
    fs.writeFile(path, data, options, error => {
      if (error) {
        resolve(false);
      } else {
        resolve(true);
      }
    });
  });
};

export const unlink = (path: string) => {
  return new Promise(resolve => {
    fs.unlink(path, error => {
      if (error) {
        resolve(false);
      } else {
        resolve(true);
      }
    });
  });
};

export const storeImage = async (image: string, path: string, name: string) => {
  const imageBuffer = Buffer.from(
    image.replace(/^data:image\/\w+;base64,/, ""),
    "base64"
  );
  const imageFilePath = `/media/${path}`;
  const imageFileName = `${name}_${generateHashCode()}.jpg`;
  const isExist = await stat(
    `${process.cwd()}${imageFilePath}${imageFileName}`
  );
  if (!isExist) {
    await mkdir(`${process.cwd()}${imageFilePath}`);
  }

  await writeFile({
    path: `${process.cwd()}${imageFilePath}${imageFileName}`,
    data: imageBuffer
  });

  return {
    imageFilePath,
    imageFileName
  };
};

export const deleteImage = async (path: string, clearFold: boolean = true) => {
  const currentPath = path
    .split("/")
    .slice(0, -1)
    .join("/");
  const isExist = await stat(`${process.cwd()}${currentPath}`);
  if (!isExist) {
    return true;
  }
  await unlink(`${process.cwd()}${path}`);
  if (clearFold) {
    const isLstat = await lstat(`${process.cwd()}${currentPath}`);
    if (isLstat) {
      await rmdir(`${process.cwd()}${currentPath}`);
    }
  }
  return true;
};

export const compareImgByteSize = (
  image: string,
  compare: number = imageSizeConfig.avatar
) => {
  let size = 0;
  if (image) {
    const equalIndex = image.indexOf("=");
    if (equalIndex > 0) {
      const str = image.substring(0, equalIndex);
      const strLength = str.length;
      const fileLength = strLength - (strLength / 8) * 2;
      size = Math.floor(fileLength);
    } else {
      const strLength = image.length;
      const fileLength = strLength - (strLength / 8) * 2;
      size = Math.floor(fileLength);
    }
  }
  return size > compare;
};
