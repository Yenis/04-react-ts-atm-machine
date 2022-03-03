import { createContext, useContext, useState } from "react";

export interface User {
  cardNumber: string | undefined;
  userName: string | undefined;
}

export const emptyUser: User = {
  cardNumber: undefined,
  userName: undefined,
};

const CurrentUserContext = createContext<User>(emptyUser);

export const useCurrentUser = () => {
  const [currentUser, setCurrentUser] = useState(emptyUser);
  const userContext = useContext(CurrentUserContext);

  const UserContextProvider = ({ children }: any) => {
    return (
      <CurrentUserContext.Provider value={currentUser}>
        {children}
      </CurrentUserContext.Provider>
    );
  };

  return { currentUser, setCurrentUser, userContext, UserContextProvider } as const;
};
