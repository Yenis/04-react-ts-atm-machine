export const isPinValid = (pinNumber: string) => {
    return RegExp(/^\d{5}$/).test(pinNumber);
  };

  