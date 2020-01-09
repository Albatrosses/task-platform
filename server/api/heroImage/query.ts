import { queryDB } from "../../entity";
import { HeroImage } from "../../entity/hero_image";
import { generateResolver } from "../../helper/log";
import { generateAuth, verifyAuth } from "../../helper/verify";
import { MESSAGE_WORD } from "../enum";

export const heroImageListing = async (_, __, context): Promise<any> => {
  return await queryDB(async connection => {
    const currentUser = await generateAuth(context, connection);
    if (!verifyAuth(currentUser)) {
      return generateResolver(false, MESSAGE_WORD.UNAUTH);
    }
    const heroImagesRepository = connection.getRepository(HeroImage);

    const data = await heroImagesRepository.find();

    return generateResolver(true, MESSAGE_WORD.QUERY_SUCCESS, data);
  });
};
