import { openDB } from "idb";
import { User } from "../helpers/currentUserHook";
import { toast, ToastType } from "../helpers/ToastManager";
import { UserBalance } from "../helpers/transactionsHook";
import { UserPin } from "../helpers/userPinHook";
import { UserTransaction } from "./nineSampleAccounts";
import {
  initializeUserInfoOnDbCreationAsync,
  initializeUserPinsOnDbCreationAsync,
  initializeUserTransactionsOnDbCreationAsync,
} from "../helpers/initializeSampleData";

const openAtmUsersStore = openDB("atm-users", 1, {
  upgrade(db) {
    db.createObjectStore("atm-users-store");
    initializeUserInfoOnDbCreationAsync();
  },
});

const openAtmUserPinStore = openDB("atm-user-pin", 1, {
  upgrade(db) {
    db.createObjectStore("atm-user-pin-store");
    initializeUserPinsOnDbCreationAsync();
  },
});

const openTransactionsStore = openDB("atm-user-transactions", 1, {
  upgrade(db) {
    db.createObjectStore("atm-transactions-store");
    initializeUserTransactionsOnDbCreationAsync();
  },
});

export const getUserInfoAsync = async (
  cardNumber: IDBKeyRange | IDBValidKey
): Promise<User> => {
  return (await openAtmUsersStore).get("atm-users-store", cardNumber);
};

export const getUserPinStateAsync = async (
  cardNumber: IDBKeyRange | IDBValidKey
): Promise<UserPin> => {
  return (await openAtmUserPinStore).get("atm-user-pin-store", cardNumber);
};

export const getUserTransactionsAsync = async (
  cardNumber: IDBKeyRange | IDBValidKey
): Promise<UserBalance> => {
  return (await openTransactionsStore).get(
    "atm-transactions-store",
    cardNumber
  );
};

export const saveUserInfoAsync = async (
  card: IDBKeyRange | IDBValidKey | undefined,
  data: User
) => {
  return (await openAtmUsersStore).put("atm-users-store", data, card);
};

export const saveUserPinStateAsync = async (
  card: IDBKeyRange | IDBValidKey | undefined,
  data: UserPin
) => {
  return (await openAtmUserPinStore).put("atm-user-pin-store", data, card);
};

export const saveUserTransactionAsync = async (
  card: IDBKeyRange | IDBValidKey | undefined,
  data: UserTransaction
) => {
  toast.show({
    title: ToastType.SUCCESS,
    content: "Transaction Completed",
    duration: 5000,
  });
  return (await openTransactionsStore).put(
    "atm-transactions-store",
    data,
    card
  );
};

export const getAllUsersCardNumbersAsync = async () => {
  return (await openAtmUsersStore).getAllKeys("atm-users-store");
};
