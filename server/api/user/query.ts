import { MESSAGE_WORD } from "../../../types/common/message";
import { queryDB } from "../../entity";
import { Users } from "../../entity/users";
import { generateResolver } from "../../helper/log";
import {
  generateAndWhereQuery,
  generateBalanceQuery,
  generateDateQuery,
  generateInviteQuery,
  generateNameQuery,
  generateOrderByQuery,
  generatePageQuery,
  generatePayWayQuery,
  generatePhoneQuery,
  generateRoleQuery,
  generateStatusQuery
} from "../../helper/sql";
import { generateAuth, verifyAuth } from "../../helper/verify";

const PAGE_TOTAL = 20;

export const user = async (_, { queryUserInput }, context) => {
  const { id } = queryUserInput;
  return await queryDB(async connection => {
    const currentUser = await generateAuth(context, connection);
    if (!currentUser) {
      return generateResolver(false, MESSAGE_WORD.UNAUTH);
    }
    const userRepository = connection.getRepository(Users);
    const result = await userRepository.findOne(id);
    if (!verifyAuth(currentUser, "customer")) {
      if (currentUser.id.toString() !== id) {
        return generateResolver(false, MESSAGE_WORD.UNAUTH);
      }
      const data = {
        name: result.name,
        phone: result.phone,
        avatar: result.avatar,
        balance: result.balance,
        payWays: result.payWays,
        inviteCode: result.inviteCode,
        inviteId: result.inviteId,
        roleLevel: result.roleLevel
      };
      return generateResolver(true, MESSAGE_WORD.QUERY_SUCCESS, data);
    } else {
      return generateResolver(true, MESSAGE_WORD.QUERY_SUCCESS, result);
    }
  });
};

export const userListing = async (
  _,
  { queryUserListingInput = {} },
  context
) => {
  const {
    page,
    name,
    phone,
    payWayCodes,
    inviteId,
    status,
    role,
    balance,
    date,
    order
  } = queryUserListingInput as any;

  return await queryDB(async connection => {
    const currentUser = await generateAuth(context, connection);
    if (!verifyAuth(currentUser, "customer")) {
      return generateResolver(false, MESSAGE_WORD.UNAUTH);
    }
    const userRepository = connection.getRepository(Users);
    const nameQuery = generateNameQuery(name);
    const phoneQuery = generatePhoneQuery(phone);
    const payWayQuery = generatePayWayQuery(payWayCodes);
    const inviteQuery = generateInviteQuery(inviteId);
    const statusQuery = generateStatusQuery(status);
    const roleQuery = generateRoleQuery(role);
    const balanceQuery = generateBalanceQuery(balance);
    const dateQuery = generateDateQuery(date);
    const query = `select * from users${generateAndWhereQuery([
      nameQuery,
      phoneQuery,
      payWayQuery,
      inviteQuery,
      statusQuery,
      roleQuery,
      balanceQuery,
      dateQuery
    ])}${generateOrderByQuery(order)}${generatePageQuery(page, PAGE_TOTAL)}`;

    return await userRepository.query(query);
  });
};
