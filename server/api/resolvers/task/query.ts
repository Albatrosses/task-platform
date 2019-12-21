import { taskListingData } from "./mock";
import { TTask } from "./types";

const PAGE_TOTAL = 10;

export const taskListing = async (_, { page = 0 }): Promise<TTask[]> => {
  return taskListingData.slice(page * PAGE_TOTAL, (page + 1) * PAGE_TOTAL);
};
