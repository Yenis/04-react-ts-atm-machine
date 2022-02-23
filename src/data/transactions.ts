
import { User } from "./currentUser";
import { toast, ToastType } from "../helpers/ToastManager";
import {
  getUserInfoAsync,
  // getUserTransactionsAsync,
  getUserBalanceAsync,
  saveUserInfoAsync,
  saveUserTransactionAsync,
  setUserBalanceAsync,
} from "./userData";

export const getFullUserDataAsync = async (cardNumber: IDBKeyRange | IDBValidKey) => {
  let userInfo = await getUserInfoAsync(cardNumber);
  // let userTransactions = await getUserTransactionsAsync(cardNumber);
  let userBalance = await getUserBalanceAsync(cardNumber);

  const user: User = {
    userName: userInfo.userName,
    cardNumber: userInfo.cardNumber,
    pin: userInfo.pin,
    balance: userBalance.balance
  }
  
  return user;
};

const transactionData: any[] = []

export const saveTransactionResultsAsync = async (
  cardNumber: IDBKeyRange | IDBValidKey | undefined,
  userData: User,
  transactionInfo?: any
) => {
  transactionData.push(transactionInfo)
  await saveUserInfoAsync(cardNumber, {userName: userData.userName, cardNumber: userData.cardNumber, pin: userData.pin});
  await saveUserTransactionAsync(cardNumber, {transactionInfo: [...transactionData]});
  await setUserBalanceAsync(cardNumber, {balance: userData.balance});
  toast.show({
    title: ToastType.SUCCESS,
    content: 'Transaction Completed',
    duration: 9000,
  })
};


