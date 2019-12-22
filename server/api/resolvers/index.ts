import { UpdateTaskDetail } from "./task/mutation";
import { getTaskDetail, getTaskListing } from "./task/query";

const Resolver = {
  Query: {
    getTaskListing,
    getTaskDetail
  },
  Mutation: {
    UpdateTaskDetail
  }
};

export default Resolver;
