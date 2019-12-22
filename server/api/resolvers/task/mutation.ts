import { TTask } from "./types";

export const UpdateTaskDetail = async (_, { task }): Promise<TTask> => {
  return task;
};
