import { User } from "../data/currentUser";
import { saveUserIdbAsync } from "../data/Users";

export async function saveTransactionResultIdbAsync(cardNumber: string, userData: User) {
    await saveUserIdbAsync(cardNumber, {...userData})
    alert('Transaction Completed')
  }