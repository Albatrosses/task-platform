import { queryDB } from "../../entity";
import { Tasks } from "../../entity/tasks";
import {
  compareAmount,
  compareDate,
  comparePlatform,
  compareStatus
} from "./hepler";

const PAGE_TOTAL = 10;

export const task = async (_, { queryTaskInput }): Promise<any> => {
  const {
    id,
    name,
    simple,
    description,
    criteria,
    platforms,
    steps,
    total,
    amount,
    status,
    startDate,
    endDate
  } = queryTaskInput;

  return null;
};

export const taskListing = async (
  _,
  { queryTaskListingInput }
): Promise<any> => {
  const {
    page,
    status: statusInput,
    platform: platformInput,
    amount: amountInput,
    date: dateInput
  } = queryTaskListingInput;

  const result = await queryDB(async connection => {
    const tasksRepository = connection.getRepository(Tasks);
    return await tasksRepository.find();
  });

  return result
    .slice(page - 1 * PAGE_TOTAL, page * PAGE_TOTAL)
    .filter(
      ({ status, platforms, amount, startDate, endDate }) =>
        compareStatus(status, statusInput) &&
        comparePlatform(platforms, platformInput) &&
        compareAmount(amount, amountInput) &&
        compareDate([startDate, endDate], dateInput)
  );
};
