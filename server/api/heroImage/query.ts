import { MESSAGE_WORD } from "../../../types/common/message";
import { queryDB } from "../../entity";
import { HeroImage } from "../../entity/hero_image";
import { generateResolver } from "../../helper/log";
import { generateAuth } from "../../helper/verify";

export const heroImageListing = async (_, __, context): Promise<any> => {
  return await queryDB(async connection => {
    const currentUser = await generateAuth(context, connection);
    if (!currentUser) {
      return generateResolver(false, MESSAGE_WORD.UNAUTH);
    }
    const heroImagesRepository = connection.getRepository(HeroImage);

    const result = await heroImagesRepository.find();

    return generateResolver(true, MESSAGE_WORD.QUERY_SUCCESS, result);
  });
};
