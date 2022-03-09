
import { User } from "./currentUserHook";
import { UserPin } from "./userPinHook";
import { UserBalance } from "./transactionsHook";
import { getUserPinStateAsync } from "../data/db_pins";
import { getUserTransactionsAsync } from "../data/db_transactions";
import { getUserInfoAsync } from "../data/db_users";

export async function assignUserAccount(cardNumber: string): Promise<User> {
  let userData = await getUserInfoAsync(cardNumber);
  console.log("Assigned User:", userData);
  return userData;
}

export async function assignUserPinState(cardNumber: string): Promise<UserPin> {
  let pinState = await getUserPinStateAsync(cardNumber);
  console.log("Assigned Pin Data:", pinState);
  return pinState;
}

export async function assignUserBalance(
  cardNumber: string
): Promise<UserBalance> {
  let transactionData = await getUserTransactionsAsync(cardNumber);
  console.log("Assigned Transaction Data:", transactionData);
  return transactionData;
}