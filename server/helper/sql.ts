import { compact, isEmpty } from "lodash";
import { generateHashCode } from ".";
import { TAmount } from "../types/common/amount";
import { TDate } from "../types/common/date";
import { TOrder } from "../types/common/order";
import { PLATFORM_CODE } from "../types/common/platform";
import { TASK_STATUS_CODE } from "../types/task/task";
import { USER_ROLE_CODE } from "../types/user/user";
import {
  dateTypeConfig,
  orderStatusConfig,
  orderTypeConfig
} from "../api/config/common";

export const generateStatusQuery = (status?: number) => {
  if (!status) {
    return "";
  }
  return `status = ${status}`;
};

export const generateTypeQuery = (type?: number) => {
  if (!type) {
    return "";
  }
  return `type = ${type}`;
};

export const generateRoleQuery = (role?: number) => {
  if (!role) {
    return "";
  }
  return `role = ${role}`;
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
  return `phone like '%${phone}%'`;
};

export const generateInviteQuery = (inviteId?: number) => {
  if (!inviteId && inviteId !== 0) {
    return "";
  }
  return `inviteId = '${inviteId}'`;
};

export const generatePayWayQuery = (payWayCodes?: number[]) => {
  if (!payWayCodes || isEmpty(payWayCodes)) {
    return "";
  }
  return `json_extract(payWays, '$.code') in (${payWayCodes.join(",")})`;
};

export const generatePlatformQuery = (platformCodes?: number[]) => {
  if (!platformCodes || isEmpty(platformCodes)) {
    return "";
  }
  return `json_extract(platform, '$.code') in (${platformCodes.join(",")})`;
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

export const generateBalanceQuery = (balance?: TAmount) => {
  if (!balance) {
    return "";
  }
  const { min, max } = balance;
  if (!min && !max) {
    return "";
  }
  if (min && !max) {
    return `balance >= ${min}`;
  }
  if (!min && max) {
    return `balance <= ${max}`;
  }
  return `balance between ${min} and ${max}`;
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
  return ` limit ${limit} offset ${page - 1}`;
};

export const generateAndWhereQuery = (whereQuery?: string[]) => {
  if (!whereQuery || isEmpty(compact(whereQuery))) {
    return "";
  }
  return ` where ${compact(whereQuery).join(" and ")}`;
};

export const delayDo = async (
  repository: any,
  delay: number,
  query: string
) => {
  return await repository.query(
    `CREATE EVENT delay_do_${generateHashCode()} ON SCHEDULE AT CURRENT_TIMESTAMP + INTERVAL ${delay} SECOND DO ${query}`
  );
};
