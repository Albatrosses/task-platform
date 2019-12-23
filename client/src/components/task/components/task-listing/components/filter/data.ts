import { TASK_STATUS_CODE, TASK_STATUS_NAME } from "src/components/task/enum";
import { generateHashCode } from "src/helper/common";
import { TThirdPartyFilter } from "./type";

export const thirdPartyFilter: TThirdPartyFilter[] = [
  {
    key: generateHashCode(),
    name: "全部"
  },
  {
    key: generateHashCode(),
    name: TASK_STATUS_NAME.ASSIGNED,
    status: TASK_STATUS_CODE.ASSIGNED
  },
  {
    key: generateHashCode(),
    name: TASK_STATUS_NAME.REVIEWING,
    status: TASK_STATUS_CODE.REVIEWING
  },
  {
    key: generateHashCode(),
    name: TASK_STATUS_NAME.UNASSIGNED,
    status: TASK_STATUS_CODE.UNASSIGNED
  },
  {
    key: generateHashCode(),
    name: TASK_STATUS_NAME.COMPLETED,
    status: TASK_STATUS_CODE.COMPLETED
  }
];
