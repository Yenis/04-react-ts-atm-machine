
export const isCardValid = (cardNumber: string) => {
  return RegExp(/^\d{16}$/).test(cardNumber) 
};
