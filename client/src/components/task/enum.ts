export enum TASK_STATUS_CODE {
  ALL = 0,
  UNASSIGNED,
  ASSIGNED,
  REVIEWING,
  COMPLETED
}

export enum TASK_STATUS_NAME {
  ALL = "全部",
  UNASSIGNED = "未接受",
  ASSIGNED = "已接受",
  REVIEWING = "审核中",
  COMPLETED = "已完成"
}

export enum POLATFORM_NAME {
  DEFAULT = "",
  DOUYIN = "抖音",
  KUAISHOU = "快手",
  WEIBO = "微博",
  WEISHI = "微视",
  XIGUA = "西瓜",
  TAOBAO = "淘宝",
  FACEBOOK = "FaceBook"
}

export enum POLATFORM_CODE {
  DEFAULT = 0,
  DOUYIN,
  KUAISHOU,
  WEIBO,
  WEISHI,
  XIGUA,
  TAOBAO,
  FACEBOOK
}
