import { openDB } from "idb";
import { UserBalance } from "../helpers/customHooks/transactionsHook";
import { UserTransaction } from "./nineSampleAccounts";
import { initializeUserTransactionsOnDbCreationAsync } from "../helpers/initializeSampleData";

enum TransactionsDB {
  DB = "atm-user-transactions",
  STORE = "atm-transactions-store"
}

const openTransactionsStore = openDB(TransactionsDB.DB, 1, {
  upgrade(db) {
    db.createObjectStore(TransactionsDB.STORE);
    initializeUserTransactionsOnDbCreationAsync();
  },
});

export const getUserTransactionsAsync = async (
  cardNumber: IDBKeyRange | IDBValidKey
): Promise<UserBalance> => {
  return (await openTransactionsStore).get(
    TransactionsDB.STORE,
    cardNumber
  );
};

export const saveUserTransactionAsync = async (
  card: IDBKeyRange | IDBValidKey | undefined,
  data: UserTransaction
) => {
  return (await openTransactionsStore).put(
    TransactionsDB.STORE,
    data,
    card
  );
};
