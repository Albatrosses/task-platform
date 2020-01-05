export const userTask = async (_, { queryUserTaskInput }) => {
  const { id } = queryUserTaskInput;

  return null;
};

export const userTaskListing = async (_, { queryUserTaskListingInput }) => {
  const { page, status, platform, amount, date } = queryUserTaskListingInput;

  return null;
};
