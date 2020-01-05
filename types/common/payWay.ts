export enum PAY_WAY_CODE {
  WECHAT = 1,
  ALIPAY
}


export type TPayWay = {
  code: PAY_WAY_CODE;
  account: string;
};
