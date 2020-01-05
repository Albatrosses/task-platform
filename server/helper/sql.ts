import { compact, isEmpty } from "lodash";
import { TAmount } from "../../types/common/amount";
import { TDate } from "../../types/common/date";
import { TOrder } from "../../types/common/order";
import { PLATFORM_CODE } from "../../types/common/platform";
import { TASK_STATUS_CODE } from "../../types/task/task";
import {
  dateTypeConfig,
  orderStatusConfig,
  orderTypeConfig
} from "../api/config/common";

export const generateStatusQuery = (status?: TASK_STATUS_CODE) => {
  if (!status) {
    return "";
  }
  return `status = ${status}`;
};

export const generateNameQuery = (name?: string) => {
  if (!name) {
    return "";
  }
  return `name like '%${name}%'`;
};

export const generatePhoneQuery = (phone?: number) => {
  if (!phone) {
    return "";
  }
  return `phone like %${phone}%`;
};

export const generatePayWayQuery = (payWayCodes?: PLATFORM_CODE[]) => {
  if (!payWayCodes || isEmpty(compact(payWayCodes))) {
    return "";
  }
  return `json_extract(payWay, '$.code') in (${compact(payWayCodes).join(
    ","
  )})`;
};

export const generatePlatformQuery = (platformCodes?: PLATFORM_CODE[]) => {
  if (!platformCodes || isEmpty(compact(platformCodes))) {
    return "";
  }
  return `json_extract(platform, '$.code') in (${compact(platformCodes).join(
    ","
  )})`;
};

export const generateAmountQuery = (amount?: TAmount) => {
  if (!amount) {
    return "";
  }
  const { min, max } = amount;
  if (!min && !max) {
    return "";
  }
  if (min && !max) {
    return `amount >= ${min}`;
  }
  if (!min && max) {
    return `amount <= ${max}`;
  }
  return `amount between ${min} and ${max}`;
};

export const generateDateQuery = (date?: TDate) => {
  if (!date) {
    return "";
  }
  const { min, max, dateType } = date;
  if (!min && !max) {
    return "";
  }
  if (min && !max) {
    return `${dateTypeConfig[dateType]} >= \'${min}\'`;
  }
  if (!min && max) {
    return `${dateTypeConfig[dateType]} <= \'${max}\'`;
  }
  return `${dateTypeConfig[dateType]} between \'${min}\' and \'${max}\'`;
};

export const generateOrderByQuery = (order?: TOrder) => {
  if (!order) {
    return "";
  }
  const { orderStatus, orderType } = order;
  return ` order by ${orderTypeConfig[orderType]} ${orderStatusConfig[orderStatus]}`;
};

export const generatePageQuery = (page?: number, limit?: number) => {
  if (!page) {
    return "";
  }
  return ` limit ${limit} offset ${page}`;
};

export const generateAndWhereQuery = (whereQuery?: string[]) => {
  if (!whereQuery || isEmpty(compact(whereQuery))) {
    return "";
  }
  return ` where ${compact(whereQuery).join(" and ")}`;
};
