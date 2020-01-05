import { generateMessage } from "../../helper/log";

export const addHeroImage = async (_, { addHeroImageInput }): Promise<any> => {
  const { taskId, imageSrc } = addHeroImageInput[0];
  return generateMessage(true, "添加HeroImage成功");
};

export const removeHeroImage = async (
  _,
  { removeHeroImageInput }
): Promise<any> => {
  const { id } = removeHeroImageInput[0];
  return generateMessage(true, "移除HeroImage成功");
};

export const updateHeroImage = async (
  _,
  { updateHeroImageInput }
): Promise<any> => {
  const { id, taskId, imageSrc } = updateHeroImageInput[0];
  return generateMessage(true, "更新HeroImage成功");
};
