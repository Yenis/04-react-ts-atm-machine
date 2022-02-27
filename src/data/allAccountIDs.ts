import { User } from "./currentUser";
import {
  getAllUsersCardNumbersAsync,
  getSingleUserFullInfoAsync,
} from "./userData";

class UserStore {
  userData: User[] = [];

  // constructor() {
  //   this.loadUserDataFromDbAsync();
  // }

  async loadUserDataFromDbAsync() {
    const users = await getAllUsersCardNumbersAsync();

    await Promise.all(
      users.map(async (cardNumber) => {
        let account = await this.getSingleUserData(cardNumber);
        this.userData.push(account);
      })
    );
  }

  async getSingleUserData(key: IDBValidKey | IDBKeyRange) {
    let data = await getSingleUserFullInfoAsync(key);
    return data;
  }
}

export const userStore = new UserStore();
