import { find } from "lodash";
import { taskListingData } from "./mock";
import { TTask } from "./types";

const PAGE_TOTAL = 10;

export const getTaskListing = async (_, { page = 0 }): Promise<TTask[]> => {
  return taskListingData.slice(page * PAGE_TOTAL, (page + 1) * PAGE_TOTAL);
};

export const getTaskDetail = async (_, { id }): Promise<TTask> => {
  return find(taskListingData, { id });
};
