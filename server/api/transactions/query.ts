export const transaction = async (
  _,
  { queryTransactionInput }
): Promise<any> => {
  const { id } = queryTransactionInput;

  return null;
};

export const transactionListing = async (
  _,
  { queryTransactionListingInput }
): Promise<any> => {
  const {
    page,
    status,
    taskId,
    userId,
    amount,
    date
  } = queryTransactionListingInput;

  return null;
};
