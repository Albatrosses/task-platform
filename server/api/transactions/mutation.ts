import { includes, isNil } from "lodash";
import { MESSAGE_WORD } from "../../types/common/message";
import {
  TRANSACTION_STATUS_CODE,
  TRANSACTION_TYPE_CODE
} from "../../types/transaction/transaction";
import { queryDB } from "../../entity";
import { Transactions } from "../../entity/transactions";
import { getNow } from "../../helper";
import { generateResolver } from "../../helper/log";
import { generateAuth, verifyAuth } from "../../helper/verify";

export const addTransaction = async (
  _,
  { addTransactionInput },
  context
): Promise<any> => {
  const { payWay, type, amount } = addTransactionInput;

  if (isNil(amount) || !payWay) {
    return generateResolver(false, MESSAGE_WORD.INPUT_INVAILD);
  }

  return await queryDB(async connection => {
    const currentUser = await generateAuth(context, connection);
    if (!currentUser) {
      return generateResolver(false, MESSAGE_WORD.UNAUTH);
    }
    const transactionsRepository = connection.getRepository(Transactions);
    if (!verifyAuth(currentUser, "customer")) {
      if (type === TRANSACTION_TYPE_CODE.RECHARGE) {
        const transaction = new Transactions();
        transaction.user = currentUser;
        transaction.type = TRANSACTION_TYPE_CODE.RECHARGE;
        if (!currentUser.payWays || !includes(currentUser.payWays, payWay)) {
          return generateResolver(true, MESSAGE_WORD.PAYWAY_ERROR);
        }
        transaction.payWay = payWay;
        transaction.balance = amount;
        transaction.status = TRANSACTION_STATUS_CODE.PENDING;
        transaction.submitDate = getNow();
        await transactionsRepository.save(transaction);
        return generateResolver(true, MESSAGE_WORD.QUERY_RECHARGE);
      }
      if (type === TRANSACTION_TYPE_CODE.WITHDRAW) {
        const transaction = new Transactions();
        transaction.user = currentUser;
        transaction.type = TRANSACTION_TYPE_CODE.WITHDRAW;
        if (!currentUser.payWays || !includes(currentUser.payWays, payWay)) {
          return generateResolver(true, MESSAGE_WORD.PAYWAY_ERROR);
        }
        transaction.payWay = payWay;
        if (amount > currentUser.balance) {
          return generateResolver(true, MESSAGE_WORD.BALANCE_ERROR);
        }
        transaction.balance = amount;
        transaction.status = TRANSACTION_STATUS_CODE.PENDING;
        transaction.submitDate = getNow();
        await transactionsRepository.save(transaction);
        return generateResolver(true, MESSAGE_WORD.QUERY_WITHDRAW);
      }
      return generateResolver(false, MESSAGE_WORD.UNAUTH);
    }
    return generateResolver(true, MESSAGE_WORD.QUERY_SUCCESS);
  });
};

export const removeTransaction = async (
  _,
  { removeTransactionInput },
  context
): Promise<any> => {
  const { id } = removeTransactionInput;

  return await queryDB(async connection => {
    const currentUser = await generateAuth(context, connection);
    if (!verifyAuth(currentUser, "customer")) {
      return generateResolver(false, MESSAGE_WORD.UNAUTH);
    }
    const transactionsRepository = connection.getRepository(Transactions);
    const transaction = await transactionsRepository.findOne(id);
    if (!transaction) {
      return generateResolver(false, MESSAGE_WORD.TRANSACTION_NOT_FOUND);
    }
    await transactionsRepository.remove(transaction);
    return generateResolver(true, MESSAGE_WORD.DELETE_SUCCESS);
  });
};

export const updateTransaction = async (
  _,
  { updateTransactionInput },
  context
): Promise<any> => {
  const { id, payWay, amount, type, status } = updateTransactionInput;

  return await queryDB(async connection => {
    const currentUser = await generateAuth(context, connection);
    if (!verifyAuth(currentUser, "customer")) {
      return generateResolver(false, MESSAGE_WORD.UNAUTH);
    }
    const transactionsRepository = connection.getRepository(Transactions);
    const transaction = transactionsRepository.findOne(id);
    if (!transaction) {
      return generateResolver(false, MESSAGE_WORD.TRANSACTION_NOT_FOUND);
    }
    transaction.payWay = payWay;
    transaction.amount = amount;
    transaction.type = type;
    transaction.status = status;
    transaction.resultDate = getNow();
    transaction.reviewer = currentUser;
    await transactionsRepository.save(transaction);
    return generateResolver(true, MESSAGE_WORD.DELETE_SUCCESS);
  });
};
