
export const isPinValid = (pinInput: string) => {
  return RegExp(/^\d{5}$/).test(pinInput);
};
