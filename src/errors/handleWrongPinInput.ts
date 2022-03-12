import { saveUserPinStateAsync } from "../data/db_pins";
import { UserPin } from "../helpers/userPinHook";

export const handleWrongPinInput = async (cardNumber: string, pinData: UserPin) => {
    const pinState = {
      ...pinData,
      remainingPinAttempts: pinData.remainingPinAttempts - 1,
    };

    await saveUserPinStateAsync(cardNumber, pinState);
    return pinState;
  };