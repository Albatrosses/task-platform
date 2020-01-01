import { find } from "lodash";
import {
  compareDate,
  comparePlatform,
  compareReward,
  compareStatus
} from "../../helper/common";
import { heroImageData, taskListingData } from "./config/mock";
import { TTask } from "./config/types";

const PAGE_TOTAL = 10;

export const heroImage = async () => {
  return heroImageData;
};

export const taskListing = async (
  _,
  {
    page = 1,
    status: statusInput,
    platform: platformInput,
    reward: rewardInput,
    date: dateInput
  }
): Promise<TTask[]> =>
  taskListingData
    .slice(page - 1 * PAGE_TOTAL, page * PAGE_TOTAL)
    .filter(
      ({ status, platforms, reward, startDate, endDate }) =>
        compareStatus(status, statusInput) &&
        comparePlatform(platforms, platformInput) &&
        compareReward(reward, rewardInput) &&
        compareDate([startDate, endDate], dateInput)
    );

export const taskDetail = async (_, { id }): Promise<TTask> => {
  return find(taskListingData, { id });
};
