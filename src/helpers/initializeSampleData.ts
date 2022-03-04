import {
  sampleAccountPins,
  sampleAccounts,
  sampleTransactions,
} from "../data/nineSampleAccounts";
import {
  saveUserInfoAsync,
  saveUserPinStateAsync,
  saveUserTransactionAsync,
} from "../data/userData";

export const initializeUserInfoOnDbCreationAsync = async () => {
  await Promise.all(
    sampleAccounts.map(async (account) => {
      await saveUserInfoAsync(account.cardNumber, account);
    })
  );
};

export const initializeUserPinsOnDbCreationAsync = async () => {
  await Promise.all(
    sampleAccountPins.map(async (account) => {
      await saveUserPinStateAsync(account.cardNumber, account);
    })
  );
};

export const initializeUserTransactionsOnDbCreationAsync = async () => {
  await Promise.all(
    sampleTransactions.map(async (account) => {
      await saveUserTransactionAsync(account.cardNumber, account);
    })
  );
};
