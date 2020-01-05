import {
  PLATFORM_CODE,
  PLATFORM_NAME,
  SORT_TYPE,
  TASK_STATUS_CODE,
  TASK_STATUS_NAME
} from "./enum";

export const platformsConfig = {
  [PLATFORM_CODE.DEFAULT]: {
    name: PLATFORM_NAME.DEFAULT,
    image: require("src/assets/img/default.png"),
    checked: true
  },
  [PLATFORM_CODE.DOUYIN]: {
    name: PLATFORM_NAME.DOUYIN,
    image: require("src/assets/img/douyin.jpg"),
    checked: true
  },
  [PLATFORM_CODE.KUAISHOU]: {
    name: PLATFORM_NAME.KUAISHOU,
    image: require("src/assets/img/kuaishou.jpeg"),
    checked: true
  },
  [PLATFORM_CODE.WEIBO]: {
    name: PLATFORM_NAME.WEIBO,
    image: require("src/assets/img/weibo.jpg"),
    checked: true
  },
  [PLATFORM_CODE.WEISHI]: {
    name: PLATFORM_NAME.WEISHI,
    image: require("src/assets/img/weishi.png"),
    checked: true
  },
  [PLATFORM_CODE.XIGUA]: {
    name: PLATFORM_NAME.XIGUA,
    image: require("src/assets/img/xigua.jpg"),
    checked: true
  },
  [PLATFORM_CODE.TAOBAO]: {
    name: PLATFORM_NAME.TAOBAO,
    image: require("src/assets/img/taobao.jpg"),
    checked: true
  },
  [PLATFORM_CODE.FACEBOOK]: {
    name: PLATFORM_NAME.FACEBOOK,
    image: require("src/assets/img/facebook.png"),
    checked: true
  }
};

export const statusConfig = {
  [TASK_STATUS_CODE.ALL]: {
    name: TASK_STATUS_NAME.ALL
  },
  [TASK_STATUS_CODE.UNASSIGNED]: {
    name: TASK_STATUS_NAME.UNASSIGNED
  },
  [TASK_STATUS_CODE.ASSIGNED]: {
    name: TASK_STATUS_NAME.ASSIGNED
  },
  [TASK_STATUS_CODE.REVIEWING]: {
    name: TASK_STATUS_NAME.REVIEWING
  },
  [TASK_STATUS_CODE.COMPLETED]: {
    name: TASK_STATUS_NAME.COMPLETED
  }
};

export const amountRangeConfig = [
  {
    label: "不限",
    value: 0
  },
  {
    label: "5",
    value: 5
  },
  {
    label: "10",
    value: 10
  },
  {
    label: "20",
    value: 20
  },
  {
    label: "50",
    value: 50
  },
  {
    label: "100",
    value: 100
  }
];

export const sortTypeConfig = {
  [SORT_TYPE.DEFAULT]: {
    label: "默认排序",
    icon: "ordered-list"
  },
  [SORT_TYPE.REWARD]: {
    label: "按报酬排序",
    icon: "money-collect"
  },
  [SORT_TYPE.DATE]: {
    label: "按日期排序",
    icon: "calendar"
  }
};
