import { TASK_STATUS_CODE } from "src/components/task/enum";

export type TThirdPartyFilter = {
  key: string;
  name: string;
  status?: TASK_STATUS_CODE;
};
