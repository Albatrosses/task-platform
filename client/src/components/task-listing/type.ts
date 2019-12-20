import { TASK_STATUS_CODE } from "src/enum/task";

export type TTask = {
  key: string;
  name: string;
  image: string;
  tag: string[];
  total: number;
  reward: number;
  status: TASK_STATUS_CODE;
};

export type TThirdPartyFilter = {
  key: string;
  name: string;
  status?: TASK_STATUS_CODE;
};
