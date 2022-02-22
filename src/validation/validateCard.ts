export const isCardValid = (cardNumber: string) => {
  return RegExp(/^\d{16}$/).test(cardNumber);
};

export const hasEnoughMoney = (current: number, request: number) => {
  return current >= request
}

