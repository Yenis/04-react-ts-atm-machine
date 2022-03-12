export const isTransactionPossible = (
  availableAmount: number,
  requestedAmount: number
) => {
  return availableAmount >= requestedAmount;
};
