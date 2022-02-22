import { getUserIdbAsync } from "../data/Users";
import { User } from "../data/currentUser";

export async function assignUserAccount(cardNumber: string): Promise<User> {
  let user = await getUserIdbAsync(cardNumber);
  console.log("Assigned User:", user);
  return user;
}
