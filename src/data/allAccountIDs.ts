import { User } from "./currentUser";
import { allCurrentUsersIdbAsync, getUserIdbAsync } from "./Users";

export const allUserKeys: any[] = [];
export const allAccountsData: User[] = [];

export async function loadUserDataFromIdbAsync() {
  const users = await allCurrentUsersIdbAsync();
  users.forEach((user) => {
    allUserKeys.push(user);
  });
  users.forEach((user) => {
    getUser(user).then((result) => {
      allAccountsData.push(result);
    });
  });
}

async function getUser(key: IDBValidKey | IDBKeyRange) {
  let data = await getUserIdbAsync(key);
  return data;
}
