export enum USER_ROLE_CODE {
  CONSUMER = 0,
  CONSUMER_VIP,
  CUSTOMER,
  CUSTOMER_ADMIN,
  SUPER_ADMIN
}

export enum USER_ROLE_LEVEL_CODE {
  VIP1 = 1,
  VIP2,
  VIP3,
  VIP4,
  VIP5
}

export enum USER_STATUS_CODE {
  INACTIVE = 0,
  LOGOUT,
  ACTIVE
}

export enum USER_ROLE_NAME {
  CONSUMER = "普通用户",
  CONSUMER_VIP = "会员用户",
  CUSTOMER = "任务发布员",
  CUSTOMER_ADMIN = "任务发布员管理员",
  SUPER_ADMIN = "超级管理员"
}

export enum USER_ROLE_LEVEL_NAME {
  VIP1 = "VIP1",
  VIP2 = "VIP2",
  VIP3 = "VIP3",
  VIP4 = "VIP4",
  VIP5 = "VIP5"
}

export enum USER_STATUS_NAME {
  INACTIVE = "未激活",
  LOGOUT = "登出",
  ACTIVE = "在线"
}
