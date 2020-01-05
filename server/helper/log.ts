import { getNowString } from ".";
import { TMessage } from "../../types/common/message";
import { HTTP_CODE } from "../../types/common/message";

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
