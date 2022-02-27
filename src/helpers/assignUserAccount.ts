import { User } from "../data/currentUser";
import { getSingleUserFullInfoAsync } from "../data/userData";

export async function assignUserAccount(cardNumber: string): Promise<User> {
  let user = await getSingleUserFullInfoAsync(cardNumber);
  console.log("Assigned User:", user);
  return user;
}
