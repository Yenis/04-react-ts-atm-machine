export const hasEnoughMoney = (
  availableAmount: number,
  requestedAmount: number
) => {
  return availableAmount >= requestedAmount;
};
