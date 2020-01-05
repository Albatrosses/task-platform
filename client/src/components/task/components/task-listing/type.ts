import { TASK_STATUS_CODE } from "src/components/task/enum";

export type TTask = {
  id: number;
  key: string;
  name: string;
  description?: string;
  criteria?: string;
  image: string;
  link?: string;
  tags: string[];
  total: number;
  amount: number;
  status: TASK_STATUS_CODE;
  startDate: string;
  endDate: string;
};
