import { createContext, useContext, useState } from "react";
import { Page } from "../pageLinks";
import { useDisplay } from "./displayScreenHook";
import RetainedCardPage from "../../pages/Retained";

export const DEFAULT = 3;

export interface UserPin {
  cardNumber: string | undefined;
  pin: string | undefined;
  remainingPinAttempts: number;
}

export const noPinData: UserPin = {
  cardNumber: undefined,
  pin: undefined,
  remainingPinAttempts: DEFAULT,
};

export const resetPinAttempts = (user: UserPin) => {
  user.remainingPinAttempts = DEFAULT;
};

const UserPinContext = createContext({
  userPinState: noPinData,
  setPinState: (pinState: UserPin) => {},
});

export const useUserPin = () => {
  const [pin, setPin] = useState(noPinData);

  const { userPinState, setPinState } = useContext(UserPinContext);

  const { setActivePage, PageProvider } = useDisplay();

  const hasRemainingPinAttempts = (user: UserPin) => {
    if (user.remainingPinAttempts > 0) {
      return true;
    } else {
      setActivePage(Page.RETAINED)
      return false;
    }
  };

  const UserPinProvider = ({ children }: any) => {
    return (
      <PageProvider>
        <UserPinContext.Provider value={{ userPinState: pin, setPinState: setPin }}>
          {hasRemainingPinAttempts(pin) && children}
          {!hasRemainingPinAttempts(pin) && <RetainedCardPage />}
        </UserPinContext.Provider>
      </PageProvider>
    );
  };

  return { userPinState, setPinState, UserPinProvider } as const;
};
