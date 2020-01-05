import { find } from "lodash";
import { queryDB } from "../../entity";
import { Tasks } from "../../entity/tasks";
import { getNowString } from "../../helper/common";
import { generateMessage } from "../../helper/log";
import { taskListingData } from "./entity/mock";

export const addTask = async (_, { addTaskInput }): Promise<any> => {
  const {
    name,
    simple,
    description,
    criteria,
    platforms,
    steps,
    total,
    amount,
    startDate,
    endDate
  } = addTaskInput[0];

  // await queryDB(async connection => {
  //   const task = new Tasks();
  //   task.name = name;
  //   task.simple = simple;
  //   task.description = description;
  //   task.platforms = platforms;
  //   task.total = total;
  //   task.amount = amount;
  //   task.steps = steps;
  //   task.criteria = criteria;
  //   task.startDate = startDate;
  //   task.endDate = endDate;
  //   task.updateDate = new Date(getNowString());

  //   const tasksRepository = connection.getRepository(Tasks);

  //   return await tasksRepository.save(task);
  // });

  return generateMessage(true, "成功添加任务");
};

export const removeTask = async (_, { removeTaskInput }): Promise<any> => {
  const { id } = removeTaskInput[0];

  return generateMessage(true, "删除添加任务");
};

export const updateTask = async (_, { updateTaskInput }): Promise<any> => {
  const {
    name,
    simple,
    description,
    criteria,
    platforms,
    steps,
    total,
    amount,
    startDate,
    endDate
  } = updateTaskInput[0];

  return generateMessage(true, "更新添加任务");
};
