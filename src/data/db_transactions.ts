import { openDB } from "idb";
import { toast, ToastType } from "../helpers/ToastManager";
import { UserBalance } from "../helpers/transactionsHook";
import { UserTransaction } from "./nineSampleAccounts";
import { initializeUserTransactionsOnDbCreationAsync } from "../helpers/initializeSampleData";

const transactionsDB = "atm-user-transactions";
const transactionsStore = "atm-transactions-store";

const openTransactionsStore = openDB(transactionsDB, 1, {
  upgrade(db) {
    db.createObjectStore(transactionsStore);
    initializeUserTransactionsOnDbCreationAsync();
  },
});

export const getUserTransactionsAsync = async (
  cardNumber: IDBKeyRange | IDBValidKey
): Promise<UserBalance> => {
  return (await openTransactionsStore).get(
    transactionsStore,
    cardNumber
  );
};

export const saveUserTransactionAsync = async (
  card: IDBKeyRange | IDBValidKey | undefined,
  data: UserTransaction
) => {
  toast.show({
    type: ToastType.SUCCESS,
    content: "Transaction Completed",
  });
  return (await openTransactionsStore).put(
    transactionsStore,
    data,
    card
  );
};
