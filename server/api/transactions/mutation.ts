import { generateResolver } from "../../helper/log";

export const addTransaction = async (
  _,
  { addTransactionInput }
): Promise<any> => {
  const { taskId, userId, type, amount } = addTransactionInput[0];

  return generateResolver(true, "添加交易记录成功");
};

export const removeTransaction = async (
  _,
  { removeTransactionInput }
): Promise<any> => {
  const { id } = removeTransactionInput[0];

  return generateResolver(true, "删除交易记录成功");
};

export const updateTransaction = async (
  _,
  { updateTransactionInput }
): Promise<any> => {
  const {
    id,
    taskId,
    taskName,
    taskSimplem,
    taskDescriptionm,
    taskPlatforms,
    userId,
    userNamem,
    userPhonem,
    payWay,
    role,
    amount,
    type,
    status,
    submitDatem,
    resultDatem
  } = updateTransactionInput[0];

  return generateResolver(true, "删除添加任务");
};
