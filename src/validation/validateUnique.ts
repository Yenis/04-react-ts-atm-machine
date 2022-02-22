import { allCurrentUsersIdbAsync } from "../data/Users";

export async function isUnique(cardNumber: string | number) {
  const users: any[] = await allCurrentUsersIdbAsync();
  console.log(users);
  let unique = true;

  for (let i = 0; i < users.length; i++) {
    if (cardNumber === users[i]) {
      unique = false;
      alert("The provided Card Number is Already Registered!")
    }
  }
  console.log("Unique:", unique);
  return unique;
}
