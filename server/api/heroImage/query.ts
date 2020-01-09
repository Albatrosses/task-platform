import { queryDB } from "../../entity";
import { HeroImage } from "../../entity/hero_image";
import { generateResolver } from "../../helper/log";
import { verifyAuth } from "../../helper/verify";
import { MESSAGE_WORD } from "../enum";

export const heroImageListing = async (_, __, context): Promise<any> => {
  return await queryDB(async connection => {
    const isAuth = await verifyAuth(context, connection);
    if (!isAuth) {
      return generateResolver(false, MESSAGE_WORD.UNAUTH);
    }
    const heroImagesRepository = connection.getRepository(HeroImage);

    const data = await heroImagesRepository.find();

    return generateResolver(true, MESSAGE_WORD.QUERY_SUCCESS, data);
  });
};
