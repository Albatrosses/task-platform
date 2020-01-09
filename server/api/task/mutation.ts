import { TASK_STATUS_CODE } from "../../../types/task/task";
import { queryDB } from "../../entity";
import { Tasks } from "../../entity/tasks";
import { getNowString, getNow } from "../../helper";
import { generateResolver } from "../../helper/log";
import { generateAuth, verifyAuth } from "../../helper/verify";
import { MESSAGE_WORD } from "../enum";
import { roleConfig } from "../config/common";

export const addTask = async (_, { addTaskInput }, context): Promise<any> => {
  const {
    name,
    simple,
    description,
    criteria,
    platform,
    steps,
    total,
    amount,
    startDate,
    endDate,
    reviewer
  } = addTaskInput;

  return await queryDB(async connection => {
    const currentUser = await generateAuth(context, connection);
    if (!verifyAuth(currentUser, "customer")) {
      return generateResolver(false, MESSAGE_WORD.UNAUTH);
    }

    const task = new Tasks();
    task.name = name;
    task.simple = simple;
    task.description = description;
    task.platform = platform;
    task.total = total;
    task.status = TASK_STATUS_CODE.UNASSIGNED;
    task.amount = amount;
    task.steps = steps;
    task.criteria = criteria;
    task.startDate = startDate;
    task.endDate = endDate;
    task.updateDate = getNow();
    task.reviewer = reviewer;

    const tasksRepository = connection.getRepository(Tasks);

    await tasksRepository.save(task);
    return generateResolver(true, MESSAGE_WORD.ADD_SUCCESS);
  });
};

export const removeTask = async (
  _,
  { removeTaskInput },
  context
): Promise<any> => {
  const { id } = removeTaskInput;

  return await queryDB(async connection => {
    const currentUser = await generateAuth(context, connection);
    if (!verifyAuth(currentUser, "customer")) {
      return generateResolver(false, MESSAGE_WORD.UNAUTH);
    }

    const tasksRepository = connection.getRepository(Tasks);
    const task = await tasksRepository.findOne({ id });

    if (task) {
      await tasksRepository.remove(task);
      return generateResolver(true, MESSAGE_WORD.DELETE_SUCCESS);
    } else {
      return generateResolver(false, MESSAGE_WORD.DELETE_ERROR_TASK_NOT_FOUND);
    }
  });
};

export const updateTask = async (
  _,
  { updateTaskInput },
  context
): Promise<any> => {
  const {
    id,
    name,
    simple,
    description,
    criteria,
    platform,
    steps,
    total,
    status,
    amount,
    startDate,
    endDate,
    reviewer
  } = updateTaskInput;

  return await queryDB(async connection => {
    const currentUser = await generateAuth(context, connection);
    if (!verifyAuth(currentUser, "customer")) {
      return generateResolver(false, MESSAGE_WORD.UNAUTH);
    }

    const tasksRepository = connection.getRepository(Tasks);
    const task = await tasksRepository.findOne({ id });

    if (task) {
      task.name = name;
      task.simple = simple;
      task.description = description;
      task.platform = platform;
      task.total = total;
      task.status = status;
      task.amount = amount;
      task.steps = steps;
      task.criteria = criteria;
      task.startDate = startDate;
      task.endDate = endDate;
      task.updateDate = getNow();
      task.reviewer = reviewer;
      await tasksRepository.save(task);
      return generateResolver(true, MESSAGE_WORD.UPDATE_SUCCESS);
    } else {
      return generateResolver(false, MESSAGE_WORD.DELETE_ERROR_TASK_NOT_FOUND);
    }
  });
};
