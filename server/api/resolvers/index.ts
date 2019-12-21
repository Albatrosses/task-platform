import { taskDetail } from "./task/mutation";
import { taskListing } from "./task/query";

const Resolver = {
  Query: {
    taskListing
  },
  Mutation: {
    taskDetail
  }
};

export default Resolver;
