import { toast, ToastType } from "../helpers/ToastManager";

export const isPinValid = (pinInput: string) => {
  if(!RegExp(/^\d{5}$/).test(pinInput)) {
    toast.show({
      title: ToastType.ERROR,
      content: "Input PIN is not valid!",
      duration: 5000,
    });
    return false;
  }
  return true;
};

export const isPinInputCorrect = (pinInput: string, correctPin: string) => {
  if (pinInput !== correctPin) {
    toast.show({
      title: ToastType.ERROR,
      content: "Provided PIN is wrong!",
      duration: 5000,
    });
    return false;
  }
  return true;
};
