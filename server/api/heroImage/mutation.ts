import { queryDB } from "../../entity";
import { HeroImage } from "../../entity/hero_image";
import { Tasks } from "../../entity/tasks";
import { unlink, writeFile } from "../../helper/file";
import { generateImageBuffer } from "../../helper/file";
import { generateMessage } from "../../helper/log";

const IMAGE_PATH = "heroImage/";
const IMAGE_NAME = "heroImage";

export const addHeroImage = async (_, { addHeroImageInput }): Promise<any> => {
  const { taskId, image } = addHeroImageInput;

  return await queryDB(async connection => {
    if (taskId) {
      const taskRepository = connection.getRepository(Tasks);
      const task = await taskRepository.findOne({ id: taskId });

      if (!task) {
        return generateMessage(false, "所选任务不存在");
      }
    }

    const heroImagesRepository = connection.getRepository(HeroImage);
    const { imageBuffer, imageFilePath, imageFileName } = generateImageBuffer(
      image,
      IMAGE_PATH,
      IMAGE_NAME
    );
    await writeFile({
      path: `${process.cwd()}${imageFilePath}${imageFileName}`,
      data: imageBuffer
    });

    const heroImage = new HeroImage();
    heroImage.taskId = taskId;
    heroImage.imageSrc = imageFilePath + imageFileName;

    await heroImagesRepository.save(heroImage);

    return generateMessage(true, "添加成功");
  });
};

export const removeHeroImage = async (
  _,
  { removeHeroImageInput }
): Promise<any> => {
  const { id } = removeHeroImageInput;

  return await queryDB(async connection => {
    const heroImagesRepository = connection.getRepository(HeroImage);

    const heroImage = await heroImagesRepository.findOne({ id });
    if (heroImage) {
      await unlink(`${process.cwd()}${heroImage.imageSrc}`);
      await heroImagesRepository.remove(heroImage);
      return generateMessage(true, "删除成功");
    } else {
      return generateMessage(false, "删除失败，该图片不存在");
    }
  });
};

export const updateHeroImage = async (
  _,
  { updateHeroImageInput }
): Promise<any> => {
  const { id, taskId, image } = updateHeroImageInput;

  return await queryDB(async connection => {
    const heroImagesRepository = connection.getRepository(HeroImage);

    const heroImage = await heroImagesRepository.findOne({ id });
    if (heroImage) {
      await unlink(`${heroImage.imageSrc}`);

      const { imageBuffer, imageFilePath, imageFileName } = generateImageBuffer(
        image,
        IMAGE_PATH,
        IMAGE_NAME
      );
      await writeFile({
        path: `${process.cwd()}${imageFilePath}${imageFileName}`,
        data: imageBuffer
      });
      heroImage.taskId = taskId;
      heroImage.imageSrc = imageFilePath + imageFileName;

      await heroImagesRepository.save(heroImage);
      return generateMessage(true, "更新成功");
    } else {
      return generateMessage(false, "更新失败，该图片不存在");
    }
  });
};
