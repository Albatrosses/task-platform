import { queryDB } from "../../entity";
import { Users } from "../../entity/users";

export const user = async (_, { queryUserInput }) => {
  const { id } = queryUserInput;

  const result = await queryDB(async connection => {
    const tasksRepository = connection.getRepository(Users);
    return await tasksRepository.find({ id });
  });

  return null;
};

export const userListing = async (_, { queryUserListingInput }) => {
  const {
    name,
    phone,
    payWay,
    inviteId,
    status,
    role,
    balance,
    date
  } = queryUserListingInput;

  return null;
};
