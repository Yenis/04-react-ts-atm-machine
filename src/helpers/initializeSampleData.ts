import {
  sampleAccountPins,
  sampleAccounts,
  sampleTransactions,
} from "../data/nineSampleAccounts";
import { saveUserPinStateAsync } from "../data/db_pins";
import { saveUserTransactionAsync } from "../data/db_transactions";
import { saveUserInfoAsync } from "../data/db_users";
import { atmNumber, saveAtmStateAsync } from "../data/db_adminService";

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

export const initializeAtmStateAsync = async () => {
      await saveAtmStateAsync(atmNumber, false);
};