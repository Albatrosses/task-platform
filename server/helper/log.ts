import { compact, map } from "lodash";
import { formatData, getNowString } from ".";
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

export const generateResolver = (
  success: boolean,
  words: string,
  data?: any
) => {
  const message: TMessage = {
    code: success ? HTTP_CODE.SUCCESS : HTTP_CODE.FAIL,
    message: words,
    success
  };

  if (!data) {
    return message;
  }
  if (data instanceof Array) {
    return {
      ...message,
      data: compact(map(data, item => formatData(item)))
    };
  }

  return {
    ...message,
    data: formatData(data)
  };
};
