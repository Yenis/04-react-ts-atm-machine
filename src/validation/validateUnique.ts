
import { getUserInfoAsync } from "../data/db_users";

export const isAlreadyRegistered = async (cardNumber: string) => {
  let isRegistered = await getUserInfoAsync(cardNumber);
    if (isRegistered) {
      return true;
    } else {
      return false
    }
};
