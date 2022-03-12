import { User } from "../customHooks/currentUserHook";
import { toast, ToastType } from "./ToastManager";

export const throwError = (errorMessage: string) => {
  toast.show({
    type: ToastType.ERROR,
    content: errorMessage,
  });
};

export const throwMessage = (message: string) => {
  toast.show({
    type: ToastType.ERROR,
    content: message,
  });
};

export const throwMessageUserAccess = (message: string, user: User) => {
  toast.show({
    type: ToastType.SUCCESS,
    content: `${message} ${user.userName}`,
  });
};

export const throwMessageTransactionSuccess = (message: string, amount: string) => {
  toast.show({
    type: ToastType.SUCCESS,
    content: `${message} ${amount}`,
  });
};

export const throwMessageTransactionCompleted = () => {
  toast.show({
    type: ToastType.SUCCESS,
    content: "Transaction Completed",
  });
};

export const throwErrorCannotWithdrawOver = (message: string, current: number) => {
  toast.show({
    type: ToastType.ERROR,
    content: `${message} ${current}`,
  });
};
