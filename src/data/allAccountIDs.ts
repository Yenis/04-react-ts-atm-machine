import { User } from "./currentUser";
import { getAllUsersInfoAsync, getUserInfoAsync } from "./userData";

export const allAccounts: User[] = [];

export async function loadUserDataFromDbAsync() {
  const users = await getAllUsersInfoAsync();
  users.forEach(async (cardNumber) => {
    let account = await getUser(cardNumber)
      allAccounts.push(account);
  });
}

async function getUser(key: IDBValidKey | IDBKeyRange) {
  let data = await getUserInfoAsync(key);
  return data;
}
