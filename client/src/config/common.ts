import { ORDER_STATUS_CODE, ORDER_TYPE_CODE } from "src/types/common/order";
import { PLATFORM_CODE, PLATFORM_NAME } from "src/types/common/platform";
import { TASK_STATUS_CODE, TASK_STATUS_NAME } from "src/types/task/task";

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
  [TASK_STATUS_CODE.UNASSIGNED]: {
    name: TASK_STATUS_NAME.UNASSIGNED
  },
  [TASK_STATUS_CODE.ASSIGNED]: {
    name: TASK_STATUS_NAME.ASSIGNED
  },
  [TASK_STATUS_CODE.REVIEWING]: {
    name: TASK_STATUS_NAME.REVIEWING
  },
  [TASK_STATUS_CODE.FAIL]: {
    name: TASK_STATUS_NAME.FAIL
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

export const orderTypeConfig = {
  [ORDER_TYPE_CODE.DEFAULT]: {
    label: "默认排序",
    icon: "ordered-list"
  },
  [ORDER_TYPE_CODE.AMOUNT]: {
    label: "按报酬排序",
    icon: "money-collect"
  },
  [ORDER_TYPE_CODE.START_DATE]: {
    label: "按起始日期排序",
    icon: "calendar"
  },
  [ORDER_TYPE_CODE.END_DATE]: {
    label: "按截止日期排序",
    icon: "calendar"
  },
  [ORDER_TYPE_CODE.SUBMIT_DATE]: {
    label: "按提交日期排序",
    icon: "calendar"
  },
  [ORDER_TYPE_CODE.RESULT_DATE]: {
    label: "按审核日期排序",
    icon: "calendar"
  },
  [ORDER_TYPE_CODE.SIGNIN_DATE]: {
    label: "按注册日期排序",
    icon: "calendar"
  },
  [ORDER_TYPE_CODE.LOGIN_DATE]: {
    label: "按登录日期排序",
    icon: "calendar"
  },
  [ORDER_TYPE_CODE.LOGOUT_DATE]: {
    label: "按登出日期排序",
    icon: "calendar"
  },
  [ORDER_TYPE_CODE.ASSIGN_DATE]: {
    label: "按接受日期排序",
    icon: "calendar"
  },
  [ORDER_TYPE_CODE.UPLOAD_DATE]: {
    label: "按上传日期排序",
    icon: "calendar"
  },
  [ORDER_TYPE_CODE.REVIEW_DATE]: {
    label: "按审核日期排序",
    icon: "calendar"
  }
};

export const orderStatusConfig = {
  [ORDER_STATUS_CODE.ASC]: "正序",
  [ORDER_STATUS_CODE.DESC]: "倒序"
};
