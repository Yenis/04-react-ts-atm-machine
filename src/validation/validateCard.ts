import { userStore } from "../data/userStore";
import { toast, ToastType } from "../helpers/ToastManager";

export const isCardValid = (cardNumber: string) => {
  if (!RegExp(/^\d{16}$/).test(cardNumber)) {
    toast.show({
      title: ToastType.ERROR,
      content: "Card Number is not Valid",
      duration: 3000,
    });
    return false;
  }
  return true;
};

export const isAlreadyRegistered = (cardNumber: string) => {
  let isRegistered = false;
  userStore.usersData.forEach((user) => {
    if (cardNumber === user.cardNumber) {
      toast.show({
        title: ToastType.ERROR,
        content: "User with this Card Number Already exists!",
        duration: 5000,
      });
      isRegistered = true;
    }
  });
  return isRegistered;
};
