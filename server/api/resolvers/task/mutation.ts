import { find } from "lodash";
import { taskListingData } from "./mock";
import { TTask } from "./types";

export const taskDetail = async (_, { id }): Promise<TTask> => {
  return find(taskListingData, { id });
};
