import { openDB } from "idb";
import { toast, ToastType } from "../helpers/ToastManager";

const openAtmUsersStore = openDB("atm-users", 1, {
  upgrade(db) {
    db.createObjectStore("atm-users-store");
  },
});

const openAtmUserPinStore = openDB("atm-user-pin", 1, {
  upgrade(db) {
    db.createObjectStore("atm-user-pin-store");
  },
});

const openTransactionsStore = openDB("atm-user-transactions", 1, {
  upgrade(db) {
    db.createObjectStore("atm-transactions-store");
  },
});


export const getUserInfoAsync = async (
  cardNumber: IDBKeyRange | IDBValidKey
) => {
  return (await openAtmUsersStore).get("atm-users-store", cardNumber);
};

export const getUserPinStateAsync = async (
  cardNumber: IDBKeyRange | IDBValidKey
) => {
  return (await openAtmUserPinStore).get("atm-user-pin-store", cardNumber);
};

export const getUserTransactionsAsync = async (
  cardNumber: IDBKeyRange | IDBValidKey
) => {
  return (await openTransactionsStore).get(
    "atm-transactions-store",
    cardNumber
  );
};


export const saveUserInfoAsync = async (
  card: IDBKeyRange | IDBValidKey | undefined,
  data: any
) => {
  return (await openAtmUsersStore).put("atm-users-store", data, card);
};

export const saveUserPinStateAsync = async (
  card: IDBKeyRange | IDBValidKey | undefined,
  data: any
) => {
  return (await openAtmUserPinStore).put("atm-user-pin-store", data, card);
};

export const saveUserTransactionAsync = async (
  card: IDBKeyRange | IDBValidKey | undefined,
  data: any
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
