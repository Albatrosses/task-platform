import { PLATFORM_CODE, TASK_STATUS_CODE } from "./enum";

export type TTask = {
  id: number;
  name: string;
  simple?: string;
  description?: string;
  platforms: TPlatform[];
  total: number;
  amount: number;
  status: TASK_STATUS_CODE;
  startDate: string;
  endDate: string;
  steps?: string[];
  criteria?: string[];
};

export type TPlatform = {
  code: PLATFORM_CODE;
  link: string;
};
