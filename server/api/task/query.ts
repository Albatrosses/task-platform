import { get } from "lodash";
import { queryDB } from "../../entity";
import { Tasks } from "../../entity/tasks";
import {
  generateAmountQuery,
  generateAndWhereQuery,
  generateDateQuery,
  generateOrderByQuery,
  generatePageQuery,
  generatePlatformQuery,
  generateStatusQuery
} from "../../helper/sql";

const PAGE_TOTAL = 20;

export const task = async (_, { queryTaskInput }): Promise<any> => {
  const { id } = queryTaskInput;

  return await queryDB(async connection => {
    const tasksRepository = connection.getRepository(Tasks);
    return await tasksRepository.findOne({ id });
  });
};

export const taskListing = async (
  _,
  { queryTaskListingInput = {} }
): Promise<any> => {
  const {
    page,
    status,
    platformCodes,
    amount,
    date,
    order
  } = queryTaskListingInput as any;

  return await queryDB(async connection => {
    const tasksRepository = connection.getRepository(Tasks);

    const statusQuery = generateStatusQuery(status);
    const platformQuery = generatePlatformQuery(platformCodes);
    const amountQuery = generateAmountQuery(amount);
    const dateQuery = generateDateQuery(date);

    const query = `select * from tasks${generateAndWhereQuery([
      statusQuery,
      platformQuery,
      amountQuery,
      dateQuery
    ])}${generateOrderByQuery(order)}${generatePageQuery(page, PAGE_TOTAL)}`;

    return await tasksRepository.query(query);
  });
};
