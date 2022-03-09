import { createContext, useContext, useState } from "react";
import RetainedCardPage from "../pages/Retained";

export const DEFAULT_ATT_NUM = 3;

export interface UserPin {
  cardNumber: string | undefined;
  pin: string | undefined;
  availablePinAttempts: number;
  hasAvailablePinAttempts: boolean;
}

export const noPinData: UserPin = {
  cardNumber: undefined,
  pin: undefined,
  availablePinAttempts: DEFAULT_ATT_NUM,
  hasAvailablePinAttempts: true,
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
        {pin.availablePinAttempts > 0 && children}
        {pin.availablePinAttempts <= 0 && <RetainedCardPage />}
      </UserPinContext.Provider>
    );
  };

  return { userPinState, setPinState, UserPinProvider } as const;
};
