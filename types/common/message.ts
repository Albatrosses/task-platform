export enum HTTP_CODE {
  SUCCESS = 200,
  FAIL = 400
}

export type TMessage = {
  code: HTTP_CODE;
  message: string;
  success: boolean;
};