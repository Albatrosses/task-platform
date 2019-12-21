import { TASK_STATUS_CODE } from "src/enum/task";

export type TTask = {
  key: string;
  name: string;
  description?: string;
  criteria?: string;
  image: string;
  link?: string;
  tag: string[];
  total: number;
  reward: number;
  status: TASK_STATUS_CODE;
  startDate: string;
  endDate: string;
};

export type TThirdPartyFilter = {
  key: string;
  name: string;
  status?: TASK_STATUS_CODE;
};
