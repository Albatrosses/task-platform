import { queryDB } from "../../entity";
import { UserTasks } from "../../entity/user_tasks";
import { generateResolver } from "../../helper/log";
import {
  generateAmountQuery,
  generateAndWhereQuery,
  generateDateQuery,
  generateOrderByQuery,
  generatePageQuery,
  generatePlatformQuery,
  generateStatusQuery
} from "../../helper/sql";
import { verifyAuth } from "../../helper/verify";
import { MESSAGE_WORD } from "../enum";

const PAGE_TOTAL = 20;

export const userTask = async (_, { queryUserTaskInput }) => {
  const { userId, id } = queryUserTaskInput;
  return await queryDB(async connection => {
    const userTasksRepository = connection.getRepository(UserTasks);
    const query = `select user_tasks.id id, user_tasks.status status, tasks.name name, tasks.simple simple, tasks.platform platform, tasks.total total, tasks.amount amount, tasks.startDate startDate, tasks.endDate endDate from user_tasks left join tasks on user_tasks.taskId = tasks.id where id = ${id}`;
    return await userTasksRepository.query(query);
  });
};

export const userTaskListing = async (
  _,
  { queryUserTaskListingInput = {} },
  context
) => {
  const {
    userId,
    page,
    status,
    platformCodes,
    amount,
    date,
    order
  } = queryUserTaskListingInput as any;

  return await queryDB(async connection => {
    const isLogin = await verifyAuth(context, connection, userId);
    if (!isLogin) {
      return generateResolver(false, MESSAGE_WORD.UNAUTH);
    }

    const userTasksRepository = connection.getRepository(UserTasks);
    const statusQuery = generateStatusQuery(status);
    const platformQuery = generatePlatformQuery(platformCodes);
    const amountQuery = generateAmountQuery(amount);
    const dateQuery = generateDateQuery(date);

    const query = `select user_tasks.id id, user_tasks.status status, tasks.name name, tasks.simple simple, tasks.platform platform, tasks.total total, tasks.amount amount, tasks.startDate startDate, tasks.endDate endDate from user_tasks left join tasks on user_tasks.taskId = tasks.id${generateAndWhereQuery(
      [statusQuery, platformQuery, amountQuery, dateQuery]
    )}${generateOrderByQuery(order)}${generatePageQuery(page, PAGE_TOTAL)}`;

    return await userTasksRepository.query(query);
  });
};
