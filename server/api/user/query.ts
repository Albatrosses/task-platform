import { queryDB } from "../../entity";
import { Users } from "../../entity/users";
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

const PAGE_TOTAL = 20;

export const user = async (_, { queryUserInput }) => {
  const { id } = queryUserInput;

  return await queryDB(async connection => {
    const userRepository = connection.getRepository(Users);
    return await userRepository.findOne({ id });
  });
};

export const userListing = async (_, { queryUserListingInput = {} }) => {
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

  const result = await queryDB(async connection => {
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

  return result;
};
