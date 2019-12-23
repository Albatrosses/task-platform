import { mutationTaskDetail } from "./task/mutation";
import { queryTaskDetail, queryTaskListing } from "./task/query";

const Resolver = {
  Query: {
    queryTaskListing,
    queryTaskDetail
  },
  Mutation: {
    mutationTaskDetail
  }
};

export default Resolver;
