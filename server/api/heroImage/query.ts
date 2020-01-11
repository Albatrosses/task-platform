import { MESSAGE_WORD } from "../../types/common/message";
import { queryDB } from "../../entity";
import { HeroImage } from "../../entity/hero_image";
import { generateResolver } from "../../helper/log";

export const heroImageListing = async (_, __, context): Promise<any> => {
  return await queryDB(async connection => {
    const heroImagesRepository = connection.getRepository(HeroImage);

    const result = await heroImagesRepository.find();

    return generateResolver(true, MESSAGE_WORD.QUERY_SUCCESS, result);
  });
};
