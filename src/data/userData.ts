import { openDB } from 'idb';
import { User } from './currentUser';

const accessIdbAsync = openDB('atm-store', 1, {
  upgrade(db) {
    db.createObjectStore('atm-users');
    db.createObjectStore('atm-user-transactions');
    db.createObjectStore('atm-user-balance');
  },
});

export async function getUserInfoAsync(card: IDBKeyRange | IDBValidKey) {
  const userInfo = await (await accessIdbAsync).get('atm-users', card); 
  const userBalance = await (await accessIdbAsync).get('atm-user-balance', card); 

  const user: User = {
    userName: userInfo.userName,
    cardNumber: userInfo.cardNumber,
    pin: userInfo.pin,
    balance: userBalance.balance
  }
  
  return user;
};

export async function getUserTransactionsAsync(card: IDBKeyRange | IDBValidKey) {
  return (await accessIdbAsync).get('atm-user-transactions', card);
};
export async function getUserBalanceAsync(card: IDBKeyRange | IDBValidKey) {
  return (await accessIdbAsync).get('atm-user-balance', card);
};

export async function saveUserInfoAsync(card: IDBKeyRange | IDBValidKey | undefined, data: any) {
  return (await accessIdbAsync).put('atm-users', data, card);
};
export async function saveUserTransactionAsync(card: IDBKeyRange | IDBValidKey | undefined, data: any) {
  return (await accessIdbAsync).put('atm-user-transactions', data, card);
};
export async function setUserBalanceAsync(card: IDBKeyRange | IDBValidKey | undefined, data: any) {
  return (await accessIdbAsync).put('atm-user-balance', data, card);
};

export async function getAllUsersInfoAsync() {
  return (await accessIdbAsync).getAllKeys('atm-users');
};
