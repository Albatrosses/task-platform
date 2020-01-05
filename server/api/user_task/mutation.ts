import { generateMessage } from "../../helper/log";

export const acceptUserTask = async (
  _,
  { acceptUserTaskInput }
): Promise<any> => {
  const { id } = acceptUserTaskInput[0];

  return generateMessage(true, "接受任务成功");
};

export const submitUserTask = async (
  _,
  { submitUserTaskInput }
): Promise<any> => {
  const { id, imageUrl } = submitUserTaskInput[0];

  return generateMessage(true, "提交任务成功");
};

export const quitUserTask = async (_, { quitUserTaskInput }): Promise<any> => {
  const { id } = quitUserTaskInput[0];

  return generateMessage(true, "放弃任务成功");
};
