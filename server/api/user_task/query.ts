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
import { generateAuth, verifyAuth } from "../../helper/verify";
import { MESSAGE_WORD } from "../enum";

const PAGE_TOTAL = 20;

export const userTask = async (_, { queryUserTaskInput }, context) => {
  const { id, taskId } = queryUserTaskInput;
  return await queryDB(async connection => {
    const currentUser = await generateAuth(context, connection);
    if (!currentUser) {
      return generateResolver(false, MESSAGE_WORD.UNAUTH);
    }
    const userTasksRepository = connection.getRepository(UserTasks);
    let query = "";
    if (!verifyAuth(currentUser, "customer")) {
      query = `select tasks.taskId taskId, tasks.userId userId, user_tasks.status status, tasks.name name, tasks.simple simple, tasks.platform platform, tasks.total total, tasks.amount amount, user_tasks.credentials credentials, user_tasks.assignDate assignDate, user_tasks.uploadDate uploadDate, user_tasks.reviewDate reviewDate, tasks.startDate startDate, tasks.endDate endDate from user_tasks left join tasks on user_tasks.taskId = tasks.id where taskId = ${taskId} and userId = ${currentUser.id}`;
    } else {
      query = `select user_tasks.id id, tasks.taskId taskId, tasks.userId userId, user_tasks.status status, tasks.name name, tasks.simple simple, tasks.platform platform, tasks.total total, tasks.amount amount, user_tasks.credentials credentials, user_tasks.assignDate assignDate, user_tasks.uploadDate uploadDate, user_tasks.reviewDate reviewDate, tasks.startDate startDate, tasks.endDate endDate from user_tasks left join tasks on user_tasks.taskId = tasks.id where id = ${id}`;
    }
    const result = await userTasksRepository.query(query);
    if (!result) {
      return generateResolver(false, MESSAGE_WORD.TASK_NOT_FOUND);
    }
    return generateResolver(true, MESSAGE_WORD.UNAUTH, result);
  });
};

export const userTaskListing = async (
  _,
  { queryUserTaskListingInput = {} },
  context
) => {
  const {
    page,
    status,
    platformCodes,
    amount,
    date,
    order
  } = queryUserTaskListingInput as any;

  return await queryDB(async connection => {
    const currentUser = await generateAuth(context, connection);
    if (!currentUser) {
      return generateResolver(false, MESSAGE_WORD.UNAUTH);
    }

    let query = "";
    const userTasksRepository = connection.getRepository(UserTasks);
    const statusQuery = generateStatusQuery(status);
    const platformQuery = generatePlatformQuery(platformCodes);
    const amountQuery = generateAmountQuery(amount);
    const dateQuery = generateDateQuery(date);
    if (!verifyAuth(currentUser, "customer")) {
      query = `select tasks.taskId taskId, tasks.userId userId, user_tasks.status status, tasks.name name, tasks.simple simple, tasks.platform platform, tasks.total total, tasks.amount amount, user_tasks.credentials credentials, user_tasks.assignDate assignDate, user_tasks.uploadDate uploadDate, user_tasks.reviewDate reviewDate, tasks.startDate startDate, tasks.endDate endDate from user_tasks left join tasks on user_tasks.taskId = tasks.id${generateAndWhereQuery(
        [
          statusQuery,
          platformQuery,
          amountQuery,
          dateQuery,
          `userId = ${currentUser.id}`
        ]
      )}${generateOrderByQuery(order)}${generatePageQuery(page, PAGE_TOTAL)}`;
    } else {
      query = `select user_tasks.id id, tasks.taskId taskId, tasks.userId userId, user_tasks.status status, tasks.name name, tasks.simple simple, tasks.platform platform, tasks.total total, tasks.amount amount, user_tasks.credentials credentials, user_tasks.assignDate assignDate, user_tasks.uploadDate uploadDate, user_tasks.reviewDate reviewDate, tasks.startDate startDate, tasks.endDate endDate from user_tasks left join tasks on user_tasks.taskId = tasks.id${generateAndWhereQuery(
        [statusQuery, platformQuery, amountQuery, dateQuery]
      )}${generateOrderByQuery(order)}${generatePageQuery(page, PAGE_TOTAL)}`;
    }

    return await userTasksRepository.query(query);
  });
};
