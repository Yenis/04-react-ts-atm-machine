import { UserBalance } from "../helpers/customHooks/transactionsHook";
import { getUserTransactionsAsync } from "./db_transactions";
import { getAllUsersCardNumbersAsync } from "./db_users";

export class TransactionStore {
  usersTransactionData: UserBalance[] = [];
  allUsersTotal: number;

  constructor() {
    this.allUsersTotal = 0;
    this.assignTotalCashAmountAsync();
  }

  async assignTotalCashAmountAsync() {
    const users = await getAllUsersCardNumbersAsync();
    this.allUsersTotal = 0;

    await Promise.all(
      users.map(async (cardNumber) => {
        let account = await getUserTransactionsAsync(cardNumber);
        if (!account.balance) account.balance = 0;
        this.allUsersTotal += account.balance;
      })
    );
  }
}

export const transactionStore = new TransactionStore();
