import { find } from "lodash";
import { taskListingData } from "./mock";
import { TTask } from "./types";

const PAGE_TOTAL = 10;

export const queryTaskListing = async (_, { page = 0 }): Promise<TTask[]> => {
  return taskListingData.slice(page * PAGE_TOTAL, (page + 1) * PAGE_TOTAL);
};

export const queryTaskDetail = async (_, { id }): Promise<TTask> => {
  return find(taskListingData, { id });
};
