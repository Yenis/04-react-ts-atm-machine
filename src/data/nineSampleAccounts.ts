import { User } from "../helpers/currentUserHook";
import { UserBalance } from "../helpers/transactionsHook";
import { UserPin } from "../helpers/userPinHook";

export interface UserTransaction extends UserBalance {
  transactionType: string,
  amount: number,
  date: string,
  time: string,
}

const dateToday = new Date().toLocaleDateString();
const timeNow = `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`;

export const sampleAccounts: User[] = [
  {
    cardNumber: "1111111111111111",
    userName: "Sample User 1",
  },
  {
    cardNumber: "2222222222222222",
    userName: "Sample User 2",
  },
  {
    cardNumber: "3333333333333333",
    userName: "Sample User 3",
  },
  {
    cardNumber: "4444444444444444",
    userName: "Sample User 4",
  },
  {
    cardNumber: "5555555555555555",
    userName: "Sample User 5",
  },
  {
    cardNumber: "6666666666666666",
    userName: "Sample User 6",
  },
  {
    cardNumber: "7777777777777777",
    userName: "Sample User 7",
  },
  {
    cardNumber: "8888888888888888",
    userName: "Sample User 8",
  },
  {
    cardNumber: "9999999999999999",
    userName: "Sample User 9",
  },
];

export const sampleAccountPins: UserPin[] = [
  {
    cardNumber: "1111111111111111",
    pin: "11111",
    availablePinAttempts: 1,
    hasAvailablePinAttempts: true
  },
  {
    cardNumber: "2222222222222222",
    pin: "22222",
    availablePinAttempts: 2,
    hasAvailablePinAttempts: true
  },
  {
    cardNumber: "3333333333333333",
    pin: "33333",
    availablePinAttempts: 3,
    hasAvailablePinAttempts: true
  },
  {
    cardNumber: "4444444444444444",
    pin: "44444",
    availablePinAttempts: 4,
    hasAvailablePinAttempts: true
  },
  {
    cardNumber: "5555555555555555",
    pin: "55555",
    availablePinAttempts: 5,
    hasAvailablePinAttempts: true
  },
  {
    cardNumber: "6666666666666666",
    pin: "66666",
    availablePinAttempts: 6,
    hasAvailablePinAttempts: true
  },
  {
    cardNumber: "7777777777777777",
    pin: "77777",
    availablePinAttempts: 7,
    hasAvailablePinAttempts: true
  },
  {
    cardNumber: "8888888888888888",
    pin: "88888",
    availablePinAttempts: 8,
    hasAvailablePinAttempts: true
  },
  {
    cardNumber: "9999999999999999",
    pin: "99999",
    availablePinAttempts: 9,
    hasAvailablePinAttempts: true
  },
];

export const sampleTransactions: UserTransaction[] = [
  {
    cardNumber: "1111111111111111",
    transactionType: "TEST",
    amount: 0,
    date: dateToday,
    time: timeNow,
    balance: 0,
  },
  {
    cardNumber: "2222222222222222",
    transactionType: "TEST",
    amount: 0,
    date: dateToday,
    time: timeNow,
    balance: 1000,
  },
  {
    cardNumber: "3333333333333333",
    transactionType: "TEST",
    amount: 0,
    date: dateToday,
    time: timeNow,
    balance: 5000,
  },
  {
    cardNumber: "4444444444444444",
    transactionType: "TEST",
    amount: 0,
    date: dateToday,
    time: timeNow,
    balance: 12345,
  },
  {
    cardNumber: "5555555555555555",
    transactionType: "TEST",
    amount: 0,
    date: dateToday,
    time: timeNow,
    balance: 55555,
  },
  {
    cardNumber: "6666666666666666",
    transactionType: "TEST",
    amount: 0,
    date: dateToday,
    time: timeNow,
    balance: 66666,
  },
  {
    cardNumber: "7777777777777777",
    transactionType: "TEST",
    amount: 0,
    date: dateToday,
    time: timeNow,
    balance: 70000,
  },
  {
    cardNumber: "8888888888888888",
    transactionType: "TEST",
    amount: 0,
    date: dateToday,
    time: timeNow,
    balance: 100000,
  },
  {
    cardNumber: "9999999999999999",
    transactionType: "TEST",
    amount: 0,
    date: dateToday,
    time: timeNow,
    balance: 15000000,
  },
];
