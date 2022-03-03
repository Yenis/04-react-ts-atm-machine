import {
  getAllUsersCardNumbersAsync,
  getUserInfoAsync,
} from "./userData";
import { User } from "../helpers/currentUserHook";

class UserStore {
  usersData: User[] = [];

  // constructor() {
  //   this.initializeRegisteredUsersAsync();
  // }

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
