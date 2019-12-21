export enum TASK_STATUS_CODE {
  UNASSIGNED = 1,
  ASSIGNED = 2,
  REVIEWING = 3,
  COMPLETED = 4
};

export enum TASK_STATUS_NAME {
  UNASSIGNED = "未接受",
  ASSIGNED = "已接受",
  REVIEWING = "审核中",
  COMPLETED = "已完成"
};

export enum TASK_TAG {
  DOUYIN = "抖音",
  KUAISHOU = "快手",
  WEIBO = "微博",
  WEISHI = "微视"
};

export type TTask = {
  id: number;
  key: string;
  name: string;
  image: string;
  tag: string[];
  total: number;
  reward: number;
  status: TASK_STATUS_CODE;
  startDate: string;
  endDate: string;
  link?: string;
  criteria?: string;
  description?: string;
};

export type TThirdPartyFilter = {
  key: string;
  name: string;
  status?: TASK_STATUS_CODE;
};