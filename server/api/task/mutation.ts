import { TASK_STATUS_CODE } from "../../../types/task/task";
import { queryDB } from "../../entity";
import { Tasks } from "../../entity/tasks";
import { getNowString } from "../../helper";
import { generateMessage } from "../../helper/log";

export const addTask = async (_, { addTaskInput }): Promise<any> => {
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
    endDate
  } = addTaskInput;

  await queryDB(async connection => {
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
    task.updateDate = new Date(getNowString());

    const tasksRepository = connection.getRepository(Tasks);

    return await tasksRepository.save(task);
  });

  return generateMessage(true, "添加成功");
};

export const removeTask = async (_, { removeTaskInput }): Promise<any> => {
  const { id } = removeTaskInput;

  return await queryDB(async connection => {
    const tasksRepository = connection.getRepository(Tasks);
    const task = await tasksRepository.findOne({ id });

    if (task) {
      await tasksRepository.remove(task);
      return generateMessage(true, "删除成功");
    } else {
      return generateMessage(false, "删除失败，任务不存在");
    }
  });
};

export const updateTask = async (_, { updateTaskInput }): Promise<any> => {
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
    endDate
  } = updateTaskInput;

  return await queryDB(async connection => {
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
      task.updateDate = new Date(getNowString());
      await tasksRepository.save(task);
      return generateMessage(true, "更新成功");
    } else {
      return generateMessage(false, "更新失败，任务不存在");
    }
  });
};
