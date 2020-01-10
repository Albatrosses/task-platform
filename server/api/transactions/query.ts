import { map } from "lodash";
import { queryDB } from "../../entity";
import { Transactions } from "../../entity/transactions";
import { generateResolver } from "../../helper/log";
import {
  generateAndWhereQuery,
  generateBalanceQuery,
  generateDateQuery,
  generateOrderByQuery,
  generatePageQuery,
  generateStatusQuery,
  generateTypeQuery
} from "../../helper/sql";
import { generateAuth, verifyAuth } from "../../helper/verify";
import { MESSAGE_WORD } from "../enum";

const PAGE_TOTAL = 20;

export const transaction = async (
  _,
  { queryTransactionInput },
  context
): Promise<any> => {
  const { id } = queryTransactionInput;

  return await queryDB(async connection => {
    const currentUser = await generateAuth(context, connection);
    if (!currentUser) {
      return generateResolver(false, MESSAGE_WORD.UNAUTH);
    }
    const transactionsRepository = connection.getRepository(Transactions);
    if (!verifyAuth(currentUser, "customer")) {
      const result = await transactionsRepository.findOne(
        { id, user: currentUser },
        {
          relations: ["user", "task"]
        }
      );
      if (!result) {
        return generateResolver(false, MESSAGE_WORD.TRANSACTION_NOT_FOUND);
      }
      const task = result.task
        ? {
            id: result.task.id,
            name: result.task.name
          }
        : result.task;
      const data = {
        id: result.id,
        task,
        payWay: result.payWay,
        balance: result.balance,
        type: result.type,
        status: result.status,
        submitDate: result.submitDate,
        resultDate: result.resultDate
      };
      return generateResolver(true, MESSAGE_WORD.QUERY_SUCCESS, data);
    } else {
      const result = await transactionsRepository.findOne(id);
      return generateResolver(true, MESSAGE_WORD.QUERY_SUCCESS, result);
    }
  });
};

export const transactionListing = async (
  _,
  { queryTransactionListingInput = {} },
  context
): Promise<any> => {
  const {
    page,
    status,
    type,
    taskId,
    userId,
    amount,
    date,
    order
  } = queryTransactionListingInput as any;

  return await queryDB(async connection => {
    const currentUser = await generateAuth(context, connection);
    if (!currentUser) {
      return generateResolver(false, MESSAGE_WORD.UNAUTH);
    }
    const transactionsRepository = connection.getRepository(Transactions);
    const statusQuery = generateStatusQuery(status);
    const typeQuery = generateTypeQuery(type);
    const balanceQuery = generateBalanceQuery(amount);
    const dateQuery = generateDateQuery(date);
    let query = "";
    if (!verifyAuth(currentUser, "customer")) {
      query = `select transactions.id id, transactions.taskId taskId, transactions.name name, transactions.userId userId, transactions.payWay payWay, transactions.balance balance, transactions.type type, transactions.status status, transactions.submitDate submitDate, transactions.resultDate resultDate from (select transactions.id id, transactions.userId userId, tasks.id taskId, tasks.name name, transactions.payWay payWay, transactions.balance balance, transactions.type type, transactions.status status, transactions.submitDate submitDate, transactions.resultDate resultDate from transactions left join tasks on transactions.taskId = tasks.id) as transactions left join users on transactions.userId = users.id${generateAndWhereQuery(
        [
          statusQuery,
          typeQuery,
          balanceQuery,
          dateQuery,
          `userId = ${currentUser.id}`
        ]
      )}${generateOrderByQuery(order)}${generatePageQuery(page, PAGE_TOTAL)}`;
      const result = await transactionsRepository.query(query);
      const data = map(result, item => {
        const task = item.taskId
          ? {
              id: item.taskId,
              name: item.name
            }
          : null;
        return {
          id: item.id,
          task,
          payWay: item.payWay,
          balance: item.balance,
          type: item.type,
          status: item.status,
          submitDate: item.submitDate,
          resultDate: item.resultDate
        };
      });
      return generateResolver(true, MESSAGE_WORD.QUERY_SUCCESS, data);
    } else {
      query = `select transactions.id id, transactions.taskId taskId, transactions.name name, transactions.userId userId, transactions.payWay payWay, transactions.balance balance, transactions.type type, transactions.status status, transactions.submitDate submitDate, transactions.resultDate resultDate from (select transactions.id id, transactions.userId userId, tasks.id taskId, tasks.name name, transactions.payWay payWay, transactions.balance balance, transactions.type type, transactions.status status, transactions.submitDate submitDate, transactions.resultDate resultDate from transactions left join tasks on transactions.taskId = tasks.id) as transactions left join users on transactions.userId = users.id${generateAndWhereQuery(
        [
          statusQuery,
          typeQuery,
          balanceQuery,
          dateQuery,
          taskId ? `taskId = ${taskId}` : "",
          userId ? `userId = ${userId}` : ""
        ]
      )}${generateOrderByQuery(order)}${generatePageQuery(page, PAGE_TOTAL)}`;
      const result = await transactionsRepository.query(query);
      const data = map(result, item => {
        const task = item.taskId
          ? {
              id: item.taskId,
              name: item.name
            }
          : null;
        return {
          id: item.id,
          task,
          payWay: item.payWay,
          balance: item.balance,
          type: item.type,
          status: item.status,
          submitDate: item.submitDate,
          resultDate: item.resultDate
        };
      });
      return generateResolver(true, MESSAGE_WORD.QUERY_SUCCESS, data);
    }
  });
};
