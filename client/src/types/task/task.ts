import { TPlatform } from "../common/platform";

export enum TASK_STATUS_CODE {
  UNASSIGNED = 0,
  ASSIGNED,
  REVIEWING,
  FAIL,
  COMPLETED
}

export enum TASK_STATUS_NAME {
  UNASSIGNED = "未接受",
  ASSIGNED = "已接受",
  REVIEWING = "审核中",
  FAIL = "未通过",
  COMPLETED = "已完成"
}

export type TTask = {
  id: number;
  name: string;
  simple?: string;
  description: string;
  steps: string[];
  criteria: string[];
  platforms?: TPlatform[];
  total: number;
  amount: number;
  status: TASK_STATUS_CODE;
  startDate: string;
  endDate: string;
  updateDate: string;
};
