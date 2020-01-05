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

export type TPlatform = {
  code: PLATFORM_CODE;
  link: string;
};