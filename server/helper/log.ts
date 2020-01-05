import { getNowString } from "./common";

export const generateLog = (message: string): void => {
  const timeTemp = getNowString();
  // tslint:disable-next-line: no-console
  console.log(timeTemp, `message: ${message}`);
};

export const generateErrorLog = (error: Error): void => {
  const timeTemp = getNowString();
  // tslint:disable-next-line: no-console
  console.log(timeTemp, `error: ${error}`);
};

enum HTTP_CODE {
  SUCCESS = 200,
  FAIL = 400
}

type TMessage = {
  code: HTTP_CODE;
  message: string;
  success: boolean;
};

export const generateMessage = (
  success: boolean,
  message: string
): TMessage => {
  const code = success ? HTTP_CODE.SUCCESS : HTTP_CODE.FAIL;
  return {
    code,
    message,
    success
  };
};
