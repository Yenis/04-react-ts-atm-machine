import { useEffect, useReducer } from "react";
import { assignUserBalance } from "./assignUserAccount";
import { useCurrentUser } from "./currentUserHook";

export interface UserBalance {
  cardNumber: string | undefined;
  balance: number | undefined;
}

export const noTransactionData: UserBalance = {
  cardNumber: "-1",
  balance: 0,
};

export enum ActionType {
    INIT,
    DEPOSIT,
    WITHDRAW,
  }
  
  export interface Action {
    type: ActionType;
    payload: UserBalance;
  }

export const useTransaction = () => {
  const { currentUser } = useCurrentUser();

  useEffect(() => {
    let assignCurrentUserBalance = async () => {
      if (!currentUser.cardNumber) return;
      let userTransactionData = await assignUserBalance(currentUser.cardNumber);

      if (!userTransactionData.balance) userTransactionData.balance = 0;
      dispatch({ type: ActionType.INIT, payload: userTransactionData });
    };
    assignCurrentUserBalance();
  }, [currentUser]);

  const [userTransactions, dispatch] = useReducer(
    transactionReducer,
    noTransactionData
  );

  return { userTransactions, dispatch } as const;
};

const transactionReducer = (state: UserBalance, action: Action) => {
  const { type, payload } = action;
  if (!state.balance) state.balance = 0;
  if (!payload.balance) payload.balance = 0;

  switch (type) {
    case ActionType.INIT:
      return {
        ...state,
        cardNumber: payload.cardNumber,
        balance: payload.balance,
      };
    case ActionType.DEPOSIT:
      return {
        ...state,
        cardNumber: payload.cardNumber,
        balance: state.balance + payload.balance,
      };
    case ActionType.WITHDRAW:
      return {
        ...state,
        cardNumber: payload.cardNumber,
        balance: state.balance - payload.balance,
      };
    default:
      return state;
  }
}
