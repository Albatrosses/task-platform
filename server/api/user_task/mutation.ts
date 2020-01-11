import { forEach, includes, map } from "lodash";
import { MESSAGE_WORD } from "../../types/common/message";
import { TASK_STATUS_CODE } from "../../types/task/task";
import {
  TRANSACTION_STATUS_CODE,
  TRANSACTION_TYPE_CODE
} from "../../types/transaction/transaction";
import { queryDB } from "../../entity";
import { Tasks } from "../../entity/tasks";
import { Transactions } from "../../entity/transactions";
import { UserTasks } from "../../entity/user_tasks";
import { Users } from "../../entity/users";
import { getNow, wait } from "../../helper";
import { deleteImage, storeImage } from "../../helper/file";
import { generateResolver } from "../../helper/log";
import { generateAuth, verifyAuth } from "../../helper/verify";
import { scaleConfig } from "../config/common";

export const acceptUserTask = async (
  _,
  { acceptUserTaskInput },
  context
): Promise<any> => {
  const { taskId } = acceptUserTaskInput;

  return await queryDB(async connection => {
    const currentUser = await generateAuth(context, connection);
    if (!currentUser) {
      return generateResolver(false, MESSAGE_WORD.UNAUTH);
    }

    const tasksRepository = connection.getRepository(Tasks);
    const task = await tasksRepository.findOne({ id: taskId });
    if (!task) {
      return generateResolver(false, MESSAGE_WORD.TASK_NOT_FOUND);
    }

    const userTasksRepository = connection.getRepository(UserTasks);
    const userTaskExist = await userTasksRepository.findOne({
      taskId,
      userId: currentUser.id
    });
    if (
      userTaskExist &&
      includes(
        [TASK_STATUS_CODE.ASSIGNED, TASK_STATUS_CODE.REVIEWING],
        userTaskExist.status
      )
    ) {
      return generateResolver(false, MESSAGE_WORD.TASK_HAVE_ACCEPT);
    }
    const userTask = new UserTasks();
    userTask.task = task;
    userTask.user = currentUser;
    userTask.status = TASK_STATUS_CODE.ASSIGNED;
    userTask.assignDate = getNow();

    await userTasksRepository.save(userTask);
    return generateResolver(true, MESSAGE_WORD.ACCEPT_TASK_SUCCESS);
  });
};

export const submitUserTask = async (
  _,
  { submitUserTaskInput },
  context
): Promise<any> => {
  const { taskId, credentials } = submitUserTaskInput;

  return await queryDB(async connection => {
    const currentUser = await generateAuth(context, connection);
    if (!currentUser) {
      return generateResolver(false, MESSAGE_WORD.UNAUTH);
    }
    const tasksRepository = connection.getRepository(Tasks);
    const task = await tasksRepository.findOne({ id: taskId });
    if (!task) {
      return generateResolver(false, MESSAGE_WORD.TASK_NOT_FOUND);
    }

    const usersRepository = connection.getRepository(Users);
    const user = await usersRepository.findOne({ id: currentUser.id });
    if (!user) {
      return generateResolver(false, MESSAGE_WORD.USER_NOT_FOUND);
    }

    const userTasksRepository = connection.getRepository(UserTasks);
    const userTask = await userTasksRepository.findOne({
      taskId,
      userId: currentUser.id
    });
    if (!userTask) {
      return generateResolver(false, MESSAGE_WORD.TASK_NOT_FOUND);
    } else if (userTask.status === TASK_STATUS_CODE.REVIEWING) {
      return generateResolver(false, MESSAGE_WORD.TASK_REVIEWING);
    } else if (userTask.status === TASK_STATUS_CODE.UNASSIGNED) {
      return generateResolver(false, MESSAGE_WORD.TASK_UNASSIGNED);
    }
    userTask.credentials = map(credentials, async image => {
      const IMAGE_PATH = `credentials/${currentUser.id}/`;
      const IMAGE_NAME = `credential_${taskId}`;
      const { imageFilePath, imageFileName } = await storeImage(
        image,
        IMAGE_PATH,
        IMAGE_NAME
      );
      await wait(1000);
      return imageFilePath + imageFileName;
    });
    userTask.status = TASK_STATUS_CODE.REVIEWING;
    userTask.uploadDate = getNow();
    await userTasksRepository.save(userTask);
    return generateResolver(true, MESSAGE_WORD.SUBMIT_TASK_SUCCESS);
  });
};

export const quitUserTask = async (
  _,
  { quitUserTaskInput },
  context
): Promise<any> => {
  const { taskId } = quitUserTaskInput;

  return await queryDB(async connection => {
    const currentUser = await generateAuth(context, connection);
    if (!currentUser) {
      return generateResolver(false, MESSAGE_WORD.UNAUTH);
    }

    const userTasksRepository = connection.getRepository(UserTasks);
    const userTask = await userTasksRepository.findOne({
      taskId,
      userId: currentUser.id
    });
    if (!userTask) {
      return generateResolver(false, MESSAGE_WORD.TASK_NOT_FOUND);
    } else if (userTask.status === TASK_STATUS_CODE.REVIEWING) {
      await forEach(userTask.credentials, async image => {
        await deleteImage(image);
        await wait(1000);
      });
    }

    await userTasksRepository.remove(userTask);
    return generateResolver(true, MESSAGE_WORD.QUIT_TASK_SUCCESS);
  });
};

export const reviewUserTask = async (_, { reviewUserTaskInput }, context) => {
  const { id } = reviewUserTaskInput;

  return await queryDB(async connection => {
    const currentUser = await generateAuth(context, connection);
    if (!verifyAuth(currentUser, "customer")) {
      return generateResolver(false, MESSAGE_WORD.UNAUTH);
    }

    const userTasksRepository = connection.getRepository(UserTasks);
    const userTask = await userTasksRepository.findOne({ id });
    if (!userTask) {
      return generateResolver(false, MESSAGE_WORD.TASK_NOT_FOUND);
    }
    userTask.status = TASK_STATUS_CODE.COMPLETED;
    userTask.reviewDate = getNow();
    userTask.reviewer = currentUser;
    await userTasksRepository.save(userTask);
    const transactionsRepository = connection.getRepository(Transactions);
    const transaction = new Transactions();
    const tasksRepository = connection.getRepository(Tasks);
    const task = await tasksRepository.findOne({ id: userTask.taskId });
    transaction.task = task;
    transaction.balance = task.amount;
    const usersRepository = connection.getRepository(Users);
    const user = await usersRepository.findOne({ id: userTask.userId });
    transaction.user = user;
    transaction.type = TRANSACTION_TYPE_CODE.REWARD;
    transaction.status = TRANSACTION_STATUS_CODE.SUCCESS;
    await transactionsRepository.save(transaction);
    if (user.inviteId) {
      const transactionInvite = new Transactions();
      transaction.task = task;
      transaction.balance = task.amount * scaleConfig.amount;
      transaction.user = user;
      transaction.type = TRANSACTION_TYPE_CODE.DIVIDEND;
      transaction.status = TRANSACTION_STATUS_CODE.SUCCESS;
      await transactionsRepository.save(transactionInvite);
    }
    return generateResolver(true, MESSAGE_WORD.DELETE_SUCCESS);
  });
};
