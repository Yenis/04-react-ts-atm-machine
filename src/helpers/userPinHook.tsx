import { createContext, useContext, useState } from "react";
import RetainedCardPage from "../pages/Retained";

export const DEFAULT_ATT_NUM = 3;

export interface UserPin {
  cardNumber: string | undefined;
  pin: string | undefined;
  remainingPinAttempts: number;
}

export const noPinData: UserPin = {
  cardNumber: undefined,
  pin: undefined,
  remainingPinAttempts: DEFAULT_ATT_NUM,
};

export const hasRemainingPinAttempts = (user: UserPin) => {
  return user.remainingPinAttempts > 0;
};

export const resetPinAttempts = (user: UserPin) => {
  user.remainingPinAttempts = DEFAULT_ATT_NUM;
};

const UserPinContext = createContext({
  userPinState: noPinData,
  setPinState: (pinState: UserPin) => {},
});

export const useUserPin = () => {
  const [pin, setPin] = useState(noPinData);

  const { userPinState, setPinState } = useContext(UserPinContext);

  const UserPinProvider = ({ children }: any) => {
    return (
      <UserPinContext.Provider value={{ userPinState: pin, setPinState: setPin }}>
        {hasRemainingPinAttempts(pin) && children}
        {!hasRemainingPinAttempts(pin) && <RetainedCardPage />}
      </UserPinContext.Provider>
    );
  };

  return { userPinState, setPinState, UserPinProvider } as const;
};
