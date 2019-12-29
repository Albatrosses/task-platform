import { mutationTaskDetail } from "./task/mutation";
import {
  queryHeroImage,
  queryTaskDetail,
  queryTaskListing
} from "./task/query";

const Resolver = {
  Query: {
    queryTaskListing,
    queryTaskDetail,
    queryHeroImage
  },
  Mutation: {
    mutationTaskDetail
  }
};

export default Resolver;
