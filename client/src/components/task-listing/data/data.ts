import { TASK_STATUS_CODE, TASK_STATUS_NAME } from "src/enum/task";
import { generateHashCode } from "src/helper/common";
import { TTask, TThirdPartyFilter } from "../type/type";

export const taskListing: TTask[] = [
  {
    key: generateHashCode(),
    name: "抖音任务",
    image: require("src/assets/img/douyin.jpg"),
    tag: ["抖音"],
    total: 500,
    reward: 500,
    status: TASK_STATUS_CODE.ASSIGNED,
    startDate: "2019/12/12",
    endDate: "2020/12/12"
  },
  {
    key: generateHashCode(),
    name: "快手任务",
    image: require("src/assets/img/kuaishou.jpeg"),
    tag: ["快手"],
    total: 500,
    reward: 500,
    status: TASK_STATUS_CODE.ASSIGNED,
    startDate: "2019/12/12",
    endDate: "2020/12/12"
  },
  {
    key: generateHashCode(),
    name: "微博任务",
    image: require("src/assets/img/weibo.png"),
    tag: ["微博"],
    total: 500,
    reward: 500,
    status: TASK_STATUS_CODE.UNASSIGNED,
    startDate: "2019/12/12",
    endDate: "2020/12/12"
  },
  {
    key: generateHashCode(),
    name: "其他平台任务",
    image: require("src/assets/img/facebook.png"),
    tag: ["抖音"],
    total: 500,
    reward: 500,
    status: TASK_STATUS_CODE.REVIEWING,
    startDate: "2019/12/12",
    endDate: "2020/12/12"
  },
  {
    key: generateHashCode(),
    name: "多组任务",
    image: require("src/assets/img/facebook.png"),
    tag: ["抖音", "快手", "微博"],
    total: 500,
    reward: 500,
    status: TASK_STATUS_CODE.COMPLETED,
    startDate: "2019/12/12",
    endDate: "2020/12/12"
  }
];

export const thirdPartyFilter: TThirdPartyFilter[] = [
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
