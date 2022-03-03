import { createContext, useContext, useState } from "react";

export interface UserPin {
  cardNumber: string | undefined;
  pin: string | undefined;
  pinAttempts: number | 0;
}

export const noPinData: UserPin = {
  cardNumber: "-1",
  pin: "-1",
  pinAttempts: 3
};

const UserPinContext = createContext<UserPin>(noPinData);

export const useUserPin = () => {
  const [userPinState, setPinState] = useState(noPinData);
  const userPinContext = useContext(UserPinContext);

  const UserPinProvider = ({ children }: any) => {
    return (
      <UserPinContext.Provider value={userPinState}>
        {children}
      </UserPinContext.Provider>
    );
  };

  return { userPinState, setPinState, userPinContext, UserPinProvider } as const;
};
