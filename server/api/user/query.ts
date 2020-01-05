import { queryDB } from "../../entity";
import { Users } from "../../entity/users";
import { generateNameQuery, generateAmountQuery, generateDateQuery, generateOrderByQuery, generatePageQuery, generateAndWhereQuery } from "../../helper/sql";

const PAGE_TOTAL = 20;

export const user = async (_, { queryUserInput }) => {
  const { id } = queryUserInput;

  return await queryDB(async connection => {
    const userRepository = connection.getRepository(Users);
    return await userRepository.findOne({ id });
  });
};

export const userListing = async (_, { queryUserListingInput }) => {
  const {
    page,
    name,
    phone,
    payWay,
    inviteId,
    status,
    role,
    amount,
    date,
    order
  } = queryUserListingInput;

  const result = await queryDB(async connection => {
    const userRepository = connection.getRepository(Users);

    const nameQuery = generateNameQuery(name);
    const amountQuery = generateAmountQuery(amount);
    const dateQuery = generateDateQuery(date);

    const query = `select * from tasks${generateAndWhereQuery([
      nameQuery,
      amountQuery,
      dateQuery
    ])}${generateOrderByQuery(order)}${generatePageQuery(page, PAGE_TOTAL)}`;

    return await userRepository.query(query);
  });

  return result;
};
