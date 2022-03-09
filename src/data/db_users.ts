import { openDB } from "idb";
import { User } from "../helpers/currentUserHook";
import { initializeUserInfoOnDbCreationAsync } from "../helpers/initializeSampleData";

const usersDB = "atm-users";
const usersStore = "atm-users-store";

const openAtmUsersStore = openDB(usersDB, 1, {
  upgrade(db) {
    db.createObjectStore(usersStore);
    initializeUserInfoOnDbCreationAsync();
  },
});

export const getUserInfoAsync = async (
  cardNumber: IDBKeyRange | IDBValidKey
): Promise<User> => {
  return (await openAtmUsersStore).get(usersStore, cardNumber);
};

export const saveUserInfoAsync = async (
  card: IDBKeyRange | IDBValidKey | undefined,
  data: User
) => {
  return (await openAtmUsersStore).put(usersStore, data, card);
};

export const getAllUsersCardNumbersAsync = async () => {
  return (await openAtmUsersStore).getAllKeys(usersStore);
};
