import { useNavigate } from "react-router-dom";
import { toast, ToastType } from "../helpers/ToastManager";
import { LogRegProps } from "./Login";

import RegisterForm from "../components/RegisterFrom";
import { isAlreadyRegistered, isCardValid } from "../validation/validateCard";
import { isPinValid } from "../validation/validatePIN";
import { UserPin } from "../helpers/userPinHook";
import { User } from "../helpers/currentUserHook";
import { Button } from "@material-ui/core";
import {
  saveUserInfoAsync,
  saveUserPinStateAsync,
  saveUserTransactionAsync,
} from "../data/userData";

const RegisterPage: React.FC<LogRegProps> = (props) => {
  const navigateTo = useNavigate();

  const handleRegisterUser = async (
    userName?: string,
    cardInput?: string,
    pinInput?: string
  ) => {
    if (!userName) userName = "default";
    if (!cardInput || !isCardValid(cardInput)) return;
    if (!pinInput || !isPinValid(pinInput)) return;
    if (isAlreadyRegistered(cardInput)) return;

    let userInfo: User = {
      userName: userName,
      cardNumber: cardInput,
    };
    let userPinState: UserPin = {
      cardNumber: cardInput,
      pin: pinInput,
      pinAttempts: 3,
    };
    let userInitTransactionData = {
      cardNumber: cardInput,
      transactionType: "INITIAL",
      amount: 0,
      date: new Date().toLocaleDateString(),
      time: `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
      balance: 0,
    };

    await saveUserInfoAsync(cardInput, userInfo);
    await saveUserPinStateAsync(cardInput, userPinState);
    await saveUserTransactionAsync(cardInput, userInitTransactionData);

    props.setCurrentUser(userInfo);
    toast.show({
      title: ToastType.SUCCESS,
      content: `Register User: ${userInfo.userName}, Card Number: ${userInfo.cardNumber}!`,
      duration: 5000,
    });
    navigateTo("/MainMenu");
  };

  return (
    <>
      <h2>Please Provide your card number and PIN</h2>
      <div>
        <RegisterForm handleRegisterUser={handleRegisterUser} />
      </div>
      <Button onClick={() => {navigateTo("/")}}>
        RETURN
      </Button>
    </>
  );
};

export default RegisterPage;
