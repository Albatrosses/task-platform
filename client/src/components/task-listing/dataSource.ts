import { TASK_STATUS_CODE, TASK_STATUS_NAME } from "src/enum/task";
import { generateHashCode } from "src/helper/common";
import { TTask, TThirdPartyFilter } from "./type";

export const taskListing: TTask[] = [
  {
    id: generateHashCode(),
    name: "抖音任务",
    image: require("src/assets/img/douyin.jpg"),
    tag: ["抖音"],
    total: 500,
    reward: 500,
    status: TASK_STATUS_CODE.ASSIGNED
  },
  {
    id: generateHashCode(),
    name: "快手任务",
    image: require("src/assets/img/kuaishou.jpeg"),
    tag: ["快手"],
    total: 500,
    reward: 500,
    status: TASK_STATUS_CODE.ASSIGNED
  },
  {
    id: generateHashCode(),
    name: "微博任务",
    image: require("src/assets/img/weibo.png"),
    tag: ["微博"],
    total: 500,
    reward: 500,
    status: TASK_STATUS_CODE.UNASSIGNED
  },
  {
    id: generateHashCode(),
    name: "其他平台任务",
    image: require("src/assets/img/facebook.png"),
    tag: ["抖音"],
    total: 500,
    reward: 500,
    status: TASK_STATUS_CODE.REVIEWING
  },
  {
    id: generateHashCode(),
    name: "多组任务",
    image: require("src/assets/img/facebook.png"),
    tag: ["抖音", "快手", "微博"],
    total: 500,
    reward: 500,
    status: TASK_STATUS_CODE.COMPLETED
  }
];

export const thirdPartyFilter: TThirdPartyFilter[] = [
  {
    id: generateHashCode(),
    name: TASK_STATUS_NAME.ASSIGNED,
    status: TASK_STATUS_CODE.ASSIGNED
  },
  {
    id: generateHashCode(),
    name: TASK_STATUS_NAME.REVIEWING,
    status: TASK_STATUS_CODE.REVIEWING
  },
  {
    id: generateHashCode(),
    name: TASK_STATUS_NAME.UNASSIGNED,
    status: TASK_STATUS_CODE.UNASSIGNED
  },
  {
    id: generateHashCode(),
    name: TASK_STATUS_NAME.COMPLETED,
    status: TASK_STATUS_CODE.COMPLETED
  }
];
