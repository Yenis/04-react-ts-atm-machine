
import { getUserInfoAsync } from "../data/db_users";
import { toast, ToastType } from "../helpers/ToastManager";

export const isAlreadyRegistered = async (cardNumber: string) => {
  let isRegistered = await getUserInfoAsync(cardNumber);
    if (isRegistered) {
      toast.show({
        type: ToastType.ERROR,
        content: "User with this Card Number Already exists!",
      });
      return true;
    } else {
      return false
    }
};
