import {
  POLATFORM_CODE,
  POLATFORM_NAME,
  TASK_STATUS_CODE,
  TASK_STATUS_NAME
} from "./enum";

export const imagesConfig = {
  [POLATFORM_CODE.DEFAULT]: {
    name: POLATFORM_NAME.DEFAULT,
    image: require("src/assets/img/default.png")
  },
  [POLATFORM_CODE.DOUYIN]: {
    name: POLATFORM_NAME.DOUYIN,
    image: require("src/assets/img/douyin.jpg")
  },
  [POLATFORM_CODE.KUAISHOU]: {
    name: POLATFORM_NAME.KUAISHOU,
    image: require("src/assets/img/kuaishou.jpeg")
  },
  [POLATFORM_CODE.WEIBO]: {
    name: POLATFORM_NAME.WEIBO,
    image: require("src/assets/img/weibo.jpg")
  },
  [POLATFORM_CODE.WEISHI]: {
    name: POLATFORM_NAME.WEISHI,
    image: require("src/assets/img/weishi.png")
  },
  [POLATFORM_CODE.XIGUA]: {
    name: POLATFORM_NAME.XIGUA,
    image: require("src/assets/img/xigua.jpg")
  },
  [POLATFORM_CODE.TAOBAO]: {
    name: POLATFORM_NAME.TAOBAO,
    image: require("src/assets/img/taobao.jpg")
  },
  [POLATFORM_CODE.FACEBOOK]: {
    name: POLATFORM_NAME.FACEBOOK,
    image: require("src/assets/img/facebook.png")
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
