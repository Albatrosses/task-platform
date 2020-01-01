import { find } from "lodash";
import { taskListingData } from "./config/mock";

export const updateTaskDetail = async (_, { input }): Promise<boolean> => {
  const { id, status, imageUrl } = input;
  const task = find(taskListingData, { id });
  task.status = status;
  return true;
};
