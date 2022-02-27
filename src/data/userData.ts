import { openDB } from "idb";
import { toast, ToastType } from "../helpers/ToastManager";
import { User } from "./currentUser";

const openAtmUsersStore = openDB("atm-users", 1, {
  upgrade(db) {
    db.createObjectStore("atm-users-store");
  },
});

const openTransactionsStore = openDB("atm-user-transactions", 1, {
  upgrade(db) {
    db.createObjectStore("atm-transactions-store");
  },
});

export const getSingleUserFullInfoAsync = async (
  cardNumber: IDBKeyRange | IDBValidKey
) => {
  const userInfo = await getUserInfoAsync(cardNumber);
  const userTransactions = await getUserTransactionsAsync(cardNumber);

  const userData: User = {
    userName: userInfo.userName,
    cardNumber: userInfo.cardNumber,
    pin: userInfo.pin,
    balance: userTransactions.balance,
  };

  return userData;
};

export const saveTransactionResultsAsync = async (
  cardNumber: IDBKeyRange | IDBValidKey,
  userData: User,
  transactionInfo?: any
) => {
  const transactionData = await getUserTransactionsAsync(cardNumber) || [];
  transactionData.push(transactionInfo);

  await saveUserInfoAsync(cardNumber, {
    userName: userData.userName,
    cardNumber: userData.cardNumber,
    pin: userData.pin,
  });
  
  await saveUserTransactionAsync(cardNumber, {
    transactionInfo: transactionData,
    balance: userData.balance,
  });

  toast.show({
    title: ToastType.SUCCESS,
    content: "Transaction Completed",
    duration: 5000,
  });
};

export const getUserInfoAsync = async (
  cardNumber: IDBKeyRange | IDBValidKey
) => {
  return (await openAtmUsersStore).get("atm-users-store", cardNumber);
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

export const saveUserTransactionAsync = async (
  card: IDBKeyRange | IDBValidKey | undefined,
  data: any
) => {
  return (await openTransactionsStore).put(
    "atm-transactions-store",
    data,
    card
  );
};

export const getAllUsersCardNumbersAsync = async () => {
  return (await openAtmUsersStore).getAllKeys("atm-users-store");
};
