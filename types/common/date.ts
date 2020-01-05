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

export type TDate = {
  min: string;
  max: string;
  dateType: DATE_TYPE_CODE;
};
