export const isTransactionValid = (
  availableAmount: number,
  requestedAmount: number
) => {
  return availableAmount >= requestedAmount;
};
