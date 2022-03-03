import {
  getAllUsersCardNumbersAsync,
  getUserTransactionsAsync,
} from "./userData";
import { UserBalance } from "../helpers/transactionsHook";

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
        this.allUsersTotal += account.balance;
      })
    );
  }
}

export const transactionStore = new TransactionStore();
