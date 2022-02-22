import { createContext, useContext } from "react";

export interface User {
  CardNumber: string;
  Username: string;
  PIN: string;
  Balance: number | 0;
}

export const emptyUser = () => {
  const nothing: User = {
    CardNumber: 'NULL',
    Username: 'NULL',
    PIN: 'NULL',
    Balance: 0
  }
  return nothing;
} 

export const CurrentUserContext = createContext<User>(emptyUser());
export const useCurrentUser = () => useContext(CurrentUserContext);
