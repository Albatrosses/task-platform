import { map, get } from "lodash";
import { queryDB } from "../../entity";
import { Tasks } from "../../entity/tasks";
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
import { MESSAGE_WORD } from "../../types/common/message";

const PAGE_TOTAL = 20;

export const task = async (_, { queryTaskInput }, context): Promise<any> => {
  const { id } = queryTaskInput;

  return await queryDB(async connection => {
    const tasksRepository = connection.getRepository(Tasks);
    const result = await tasksRepository.findOne(id, {
      relations: ["userTaskss"]
    });
    const currentUser = await generateAuth(context, connection);
    if (!currentUser || !verifyAuth(currentUser, "customer")) {
      const data = {
        name: result.name,
        simple: result.simple,
        description: result.description,
        steps: result.steps,
        criteria: result.criteria,
        platform: result.platform,
        total: result.total,
        amount: result.amount,
        startDate: result.startDate,
        endDate: result.endDate,
        status: get(result, "userTaskss[0].status", null),
        assignDate: get(result, "userTaskss[0].assignDate", null),
        uploadDate: get(result, "userTaskss[0].uploadDate", null),
        reviewDate: get(result, "userTaskss[0].reviewDate", null)
      };
      return generateResolver(true, MESSAGE_WORD.QUERY_SUCCESS, data);
    } else {
      return generateResolver(true, MESSAGE_WORD.QUERY_SUCCESS, result);
    }
  });
};

export const taskListing = async (
  _,
  { queryTaskListingInput = {} },
  context
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
    const currentUser = await generateAuth(context, connection);
    if (!currentUser || !verifyAuth(currentUser, "customer")) {
      const query = `select tasks.id id, tasks.name name, tasks.simple simple, tasks.description description, tasks.steps steps, tasks.criteria criteria, tasks.platform platform, tasks.total total, tasks.amount amount, tasks.startDate startDate, tasks.endDate endDate, user_tasks.credentials credentials, user_tasks.status status, user_tasks.assignDate assignDate, user_tasks.uploadDate uploadDate, user_tasks.reviewDate reviewDate from tasks left join user_tasks on tasks.id = user_tasks.taskId${generateAndWhereQuery(
        [statusQuery, platformQuery, amountQuery, dateQuery]
      )}${generateOrderByQuery(order)}${generatePageQuery(page, PAGE_TOTAL)}`;
      const result = await tasksRepository.query(query);
      const data = map(result, item => {
        return {
          id: item.id,
          name: item.name,
          simple: item.simple,
          description: item.description,
          steps: item.steps,
          criteria: item.criteria,
          platform: item.platform,
          total: item.total,
          amount: item.amount,
          startDate: item.startDate,
          endDate: item.endDate
        };
      });
      return generateResolver(true, MESSAGE_WORD.QUERY_SUCCESS, data);
    } else {
      const query = `select * from tasks${generateAndWhereQuery([
        statusQuery,
        platformQuery,
        amountQuery,
        dateQuery
      ])}${generateOrderByQuery(order)}${generatePageQuery(page, PAGE_TOTAL)}`;
      const result = await tasksRepository.query(query);
      return generateResolver(true, MESSAGE_WORD.QUERY_SUCCESS, result);
    }
  });
};
