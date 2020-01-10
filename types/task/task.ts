import { TPlatform } from "../common/platform";

export enum TASK_STATUS_CODE {
  ALL = 0,
  UNASSIGNED,
  ASSIGNED,
  REVIEWING,
  FAIL,
  COMPLETED
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
