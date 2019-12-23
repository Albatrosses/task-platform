import { POLATFORM_CODE, TASK_STATUS_CODE } from "./enum";

export type TTask = {
  id: number;
  name: string;
  simple?: string;
  description?: string;
  polatforms: TPolatform[];
  total: number;
  reward: number;
  status: TASK_STATUS_CODE;
  startDate: string;
  endDate: string;
  steps?: string[];
  criteria?: string[];
};

export type TPolatform = {
  code: POLATFORM_CODE;
  link: string;
};
