import { openDB } from "idb";
import { User } from "../helpers/customHooks/currentUserHook";
import { initializeUserInfoOnDbCreationAsync } from "../helpers/initializeSampleData";

enum UsersDB {
  DB = "atm-users",
  STORE = "atm-users-store"
}

const openAtmUsersStore = openDB(UsersDB.DB, 1, {
  upgrade(db) {
    db.createObjectStore(UsersDB.STORE);
    initializeUserInfoOnDbCreationAsync();
  },
});

export const getUserInfoAsync = async (
  cardNumber: IDBKeyRange | IDBValidKey
): Promise<User> => {
  return (await openAtmUsersStore).get(UsersDB.STORE, cardNumber);
};

export const saveUserInfoAsync = async (
  card: IDBKeyRange | IDBValidKey | undefined,
  data: User
) => {
  return (await openAtmUsersStore).put(UsersDB.STORE, data, card);
};

export const getAllUsersCardNumbersAsync = async () => {
  return (await openAtmUsersStore).getAllKeys(UsersDB.STORE);
};
