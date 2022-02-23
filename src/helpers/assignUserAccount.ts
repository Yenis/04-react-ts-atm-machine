import { User } from "../data/currentUser";
import { getFullUserDataAsync } from "../data/transactions";

export async function assignUserAccount(cardNumber: string): Promise<User> {
  let user = await getFullUserDataAsync(cardNumber);
  console.log("Assigned User:", user);
  return user;
}
