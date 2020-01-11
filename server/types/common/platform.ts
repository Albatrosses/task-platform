export enum PLATFORM_CODE {
  DEFAULT = 0,
  DOUYIN,
  KUAISHOU,
  WEIBO,
  WEISHI,
  XIGUA,
  TAOBAO,
  FACEBOOK
}

export enum PLATFORM_NAME {
  DEFAULT = "",
  DOUYIN = "抖音",
  KUAISHOU = "快手",
  WEIBO = "微博",
  WEISHI = "微视",
  XIGUA = "西瓜",
  TAOBAO = "淘宝",
  FACEBOOK = "FaceBook"
}

export type TPlatform = {
  code: PLATFORM_CODE;
  link: string;
};
