import { TPayWay } from "../common/payWay";

export enum TRANSACTION_STATUS_CODE {
  CANCEL = 0,
  SUCCESS,
  PENDING,
  FAIL
}

export enum TRANSACTION_TYPE_CODE {
  RECHARGE = 1,
  WITHDRAW,
  REWARD,
  DIVIDEND
}

export type TTransaction = {
  id: number;
  taskId?: number;
  userId: number;
  payWay: TPayWay;
  balance: number;
  type: TRANSACTION_TYPE_CODE;
  status: TRANSACTION_STATUS_CODE;
  submitDate: string;
  resultDate: string;
  reviewer: number;
};
