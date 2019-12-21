import { generateHashCode } from "../../helper/common";
import { TASK_STATUS_CODE } from "./types";

export const taskListingData = [
  {
    id: 1,
    key: generateHashCode(),
    name: "抖音任务",
    image: "src/assets/img/douyin.jpg",
    tag: ["抖音"],
    total: 500,
    reward: 500,
    status: TASK_STATUS_CODE.ASSIGNED,
    startDate: "2019/12/12",
    endDate: "2020/12/12"
  },
  {
    id: 2,
    key: generateHashCode(),
    name: "快手任务",
    image: "src/assets/img/kuaishou.jpeg",
    tag: ["快手"],
    total: 500,
    reward: 500,
    status: TASK_STATUS_CODE.ASSIGNED,
    startDate: "2019/12/12",
    endDate: "2020/12/12"
  },
  {
    id: 3,
    key: generateHashCode(),
    name: "微博任务",
    image: "src/assets/img/weibo.png",
    tag: ["微博"],
    total: 500,
    reward: 500,
    status: TASK_STATUS_CODE.UNASSIGNED,
    startDate: "2019/12/12",
    endDate: "2020/12/12"
  },
  {
    id: 4,
    key: generateHashCode(),
    name: "其他平台任务",
    image: "src/assets/img/facebook.png",
    tag: ["抖音"],
    total: 500,
    reward: 500,
    status: TASK_STATUS_CODE.REVIEWING,
    startDate: "2019/12/12",
    endDate: "2020/12/12"
  },
  {
    id: 5,
    key: generateHashCode(),
    name: "多组任务",
    image: "src/assets/img/facebook.png",
    tag: ["抖音", "快手", "微博"],
    total: 500,
    reward: 500,
    status: TASK_STATUS_CODE.COMPLETED,
    startDate: "2019/12/12",
    endDate: "2020/12/12"
  }
];