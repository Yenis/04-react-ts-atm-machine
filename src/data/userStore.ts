import { User } from "../helpers/currentUserHook";
import { getAllUsersCardNumbersAsync, getUserInfoAsync } from "./db_users";

class UserStore {
  usersData: User[] = [];

  async initializeRegisteredUsersAsync() {
    const users = await getAllUsersCardNumbersAsync();

    await Promise.all(
      users.map(async (cardNumber) => {
        let account = await getUserInfoAsync(cardNumber);
        this.usersData.push(account);
      })
    );
  }
}

export const userStore = new UserStore();
