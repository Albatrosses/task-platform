import { queryDB } from "../../entity";
import { HeroImage } from "../../entity/hero_image";

export const heroImages = async (): Promise<any> => {
  const result = await queryDB(async connection => {
    const heroImagesRepository = connection.getRepository(HeroImage);
    return await heroImagesRepository.find();
  });

  return result;
};
