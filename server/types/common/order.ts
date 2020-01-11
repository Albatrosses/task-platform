export enum ORDER_TYPE_CODE {
  DEFAULT = 0,
  AMOUNT,
  START_DATE,
  END_DATE,
  SUBMIT_DATE,
  RESULT_DATE,
  SIGNIN_DATE,
  LOGIN_DATE,
  LOGOUT_DATE,
  ASSIGN_DATE,
  UPLOAD_DATE,
  REVIEW_DATE
}

export enum ORDER_STATUS_CODE {
  ASC = 0,
  DESC
}

export enum ORDER_TYPE_NAME {
  DEFAULT = "id",
  AMOUNT = "amount",
  START_DATE = "startDate",
  END_DATE = "endDate",
  SUBMIT_DATE = "submitDate",
  RESULT_DATE = "resultDate",
  SIGNIN_DATE = "signInDate",
  LOGIN_DATE = "loginDate",
  LOGOUT_DATE = "logoutDate",
  ASSIGN_DATE = "assignDate",
  UPLOAD_DATE = "uploadDate",
  REVIEW_DATE = "reviewDate"
}

export enum ORDER_STATUS_NAME {
  ASC = "asc",
  DESC = "desc"
}

export type TOrder = {
  orderStatus: ORDER_TYPE_CODE;
  orderType: ORDER_STATUS_CODE;
};
