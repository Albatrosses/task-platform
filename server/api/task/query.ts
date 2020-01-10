import { map } from "lodash";
import { MESSAGE_WORD } from "../../../types/common/message";
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

const PAGE_TOTAL = 20;

export const task = async (_, { queryTaskInput }, context): Promise<any> => {
  const { id } = queryTaskInput;

  return await queryDB(async connection => {
    const tasksRepository = connection.getRepository(Tasks);
    const result = await tasksRepository.findOne(id);
    const currentUser = await generateAuth(context, connection);
    if (!currentUser) {
      return generateResolver(false, MESSAGE_WORD.UNAUTH);
    }
    if (!verifyAuth(currentUser, "customer")) {
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
        endDate: result.endDate
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
    const currentUser = await generateAuth(context, connection);
    if (!currentUser) {
      return generateResolver(false, MESSAGE_WORD.UNAUTH);
    }
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
    const result = await tasksRepository.query(query);
    if (!verifyAuth(currentUser, "customer")) {
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
      return generateResolver(true, MESSAGE_WORD.QUERY_SUCCESS, result);
    }
  });
};
