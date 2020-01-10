import { MESSAGE_WORD } from "../../../types/common/message";
import { queryDB } from "../../entity";
import { HeroImage } from "../../entity/hero_image";
import { Tasks } from "../../entity/tasks";
import { wait } from "../../helper";
import { deleteImage, storeImage } from "../../helper/file";
import { generateResolver } from "../../helper/log";
import {
  generateAuth,
  verifyAuth,
  verifyBase64Image
} from "../../helper/verify";

const IMAGE_PATH = "heroImage/";
const IMAGE_NAME = "heroImage";

export const addHeroImage = async (
  _,
  { addHeroImageInput },
  context
): Promise<any> => {
  const { taskId, image } = addHeroImageInput;
  if (!verifyBase64Image(image)) {
    return generateResolver(false, MESSAGE_WORD.IMAGE_FORMAT_ERROR);
  }
  return await queryDB(async connection => {
    const currentUser = await generateAuth(context, connection);
    if (!verifyAuth(currentUser, "customer")) {
      return generateResolver(false, MESSAGE_WORD.UNAUTH);
    }
    const taskRepository = connection.getRepository(Tasks);
    const task = await taskRepository.findOne(taskId);
    if (taskId && !task) {
      return generateResolver(false, MESSAGE_WORD.TASK_NOT_FOUND);
    }
    const heroImagesRepository = connection.getRepository(HeroImage);
    const { imageFilePath, imageFileName } = await storeImage(
      image,
      IMAGE_PATH,
      IMAGE_NAME
    );
    const heroImage = new HeroImage();
    heroImage.task = task;
    heroImage.imageSrc = imageFilePath + imageFileName;

    await heroImagesRepository.save(heroImage);

    return generateResolver(true, MESSAGE_WORD.ADD_SUCCESS);
  });
};

export const removeHeroImage = async (
  _,
  { removeHeroImageInput },
  context
): Promise<any> => {
  const { id } = removeHeroImageInput;
  return await queryDB(async connection => {
    const currentUser = await generateAuth(context, connection);
    if (!verifyAuth(currentUser, "customer")) {
      return generateResolver(false, MESSAGE_WORD.UNAUTH);
    }
    const heroImagesRepository = connection.getRepository(HeroImage);
    const heroImage = await heroImagesRepository.findOne(id);
    if (heroImage) {
      await deleteImage(heroImage.imageSrc);
      await heroImagesRepository.remove(heroImage);
      return generateResolver(true, MESSAGE_WORD.DELETE_SUCCESS);
    } else {
      return generateResolver(false, MESSAGE_WORD.DELETE_ERROR_IMAGE_NOT_FOUND);
    }
  });
};

export const updateHeroImage = async (
  _,
  { updateHeroImageInput },
  context
): Promise<any> => {
  const { id, taskId, image } = updateHeroImageInput;
  if (!verifyBase64Image(image)) {
    return generateResolver(false, MESSAGE_WORD.IMAGE_FORMAT_ERROR);
  }
  return await queryDB(async connection => {
    const currentUser = await generateAuth(context, connection);
    if (!verifyAuth(currentUser, "customer")) {
      return generateResolver(false, MESSAGE_WORD.UNAUTH);
    }
    const heroImagesRepository = connection.getRepository(HeroImage);
    const heroImage = await heroImagesRepository.findOne(id);
    if (heroImage) {
      const taskRepository = connection.getRepository(Tasks);
      const task = await taskRepository.findOne(taskId);
      if (taskId && !task) {
        return generateResolver(false, MESSAGE_WORD.TASK_NOT_FOUND);
      }
      heroImage.task = task;
      await deleteImage(heroImage.imageSrc, false);
      await wait(1000);
      const { imageFilePath, imageFileName } = await storeImage(
        image,
        IMAGE_PATH,
        IMAGE_NAME
      );
      heroImage.imageSrc = imageFilePath + imageFileName;
      await heroImagesRepository.save(heroImage);
      return generateResolver(true, MESSAGE_WORD.UPDATE_SUCCESS);
    } else {
      return generateResolver(false, MESSAGE_WORD.UPDATE_ERROR_IMAGE_NOT_FOUND);
    }
  });
};
