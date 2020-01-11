export enum DATE_TYPE_CODE {
  START_DATE = 0,
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

export enum DATE_TYPE_NAME {
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

export type TDate = {
  min: string;
  max: string;
  dateType: DATE_TYPE_CODE;
};
