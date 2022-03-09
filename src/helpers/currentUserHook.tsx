import { createContext, useContext, useMemo, useState } from "react";

export interface User {
  cardNumber: string | undefined;
  userName: string | undefined;
}

export const noUser: User = {
  cardNumber: undefined,
  userName: undefined,
};

export const defaultUser: User = {
  cardNumber: "0000000000000000",
  userName: "defaultUser"
}

const CurrentUserContext = createContext({
  currentUser: noUser,
  setCurrentUser: (user: User) => {},
});

export const useCurrentUser = () => {
  const [user, setUser] = useState(noUser);

  const currentLoggedInUser = useMemo(
    () => ({ currentUser: user, setCurrentUser: setUser }),
    [user]
  );

  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

  const UserContextProvider = ({ children }: any) => {
    return (
      <CurrentUserContext.Provider value={currentLoggedInUser}>
        {children}
      </CurrentUserContext.Provider>
    );
  };

  return { currentUser, setCurrentUser, UserContextProvider } as const;
};
