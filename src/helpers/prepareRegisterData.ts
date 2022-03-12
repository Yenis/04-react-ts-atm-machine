import { TransactionType } from "../components/PrintedReceipt";
import { User } from "./customHooks/currentUserHook";
import { UserPin, DEFAULT as DEFAULT_PIN_ATTEMPTS } from "./customHooks/userPinHook";

export const prepareUserTemplateForRegistration = async (
  userName: string,
  cardInput: string,
  pinInput: string
) => {
  const userInfo: User = {
    userName: userName,
    cardNumber: cardInput,
  };
  const userPinState: UserPin = {
    cardNumber: cardInput,
    pin: pinInput,
    remainingPinAttempts: DEFAULT_PIN_ATTEMPTS,
  };
  const userInitTransactionData = {
    cardNumber: cardInput,
    transactionType: TransactionType.INIT,
    amount: 0,
    date: new Date().toLocaleDateString(),
    time: `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
    balance: 0,
  };

  return {userInfo, userPinState, userInitTransactionData} as const;
};
