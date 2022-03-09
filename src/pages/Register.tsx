import { useNavigate } from "react-router-dom";
import { toast, ToastType } from "../helpers/ToastManager";

import RegisterForm from "../components/RegisterFrom";
import { isCardValid } from "../validation/validateCard";
import { isAlreadyRegistered } from "../validation/validateUnique";
import { useCurrentUser, User, defaultUser } from "../helpers/currentUserHook";
import { TransactionType } from "../components/PrintedReceipt";
import { isPinValid } from "../validation/validatePIN";
import { DEFAULT_ATT_NUM, UserPin } from "../helpers/userPinHook";
import { Button } from "@material-ui/core";
import { Page } from "../helpers/Links";
import { saveUserPinStateAsync } from "../data/db_pins";
import { saveUserTransactionAsync } from "../data/db_transactions";
import { saveUserInfoAsync } from "../data/db_users";


const RegisterPage: React.FC = () => {
  const navigateTo = useNavigate();

  const {setCurrentUser} = useCurrentUser();

  const handleRegisterUser = async (
    userName?: string,
    cardInput?: string,
    pinInput?: string
  ) => {
    if (!userName) userName = defaultUser.userName;
    if (!cardInput || !isCardValid(cardInput)) {
      toast.show({
        type: ToastType.ERROR,
        content: "Card Number is not Valid",
      });
      return;
    }

    if (!pinInput || !isPinValid(pinInput)) {
      toast.show({
        type: ToastType.ERROR,
        content: "Input PIN is not valid!",
      });
      return;
    } 

    if (await isAlreadyRegistered(cardInput)) return;

    let userInfo: User = {
      userName: userName,
      cardNumber: cardInput,
    };
    let userPinState: UserPin = {
      cardNumber: cardInput,
      pin: pinInput,
      availablePinAttempts: DEFAULT_ATT_NUM,
      hasAvailablePinAttempts: true
    };
    let userInitTransactionData = {
      cardNumber: cardInput,
      transactionType: TransactionType.INIT,
      amount: 0,
      date: new Date().toLocaleDateString(),
      time: `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
      balance: 0,
    };

    await saveUserInfoAsync(cardInput, userInfo);
    await saveUserPinStateAsync(cardInput, userPinState);
    await saveUserTransactionAsync(cardInput, userInitTransactionData);

    setCurrentUser(userInfo);
    toast.show({
      type: ToastType.SUCCESS,
      content: `Register User: ${userInfo.userName}, Card Number: ${userInfo.cardNumber}!`,
    });
    navigateTo(Page.MAIN);
  };

  return (
    <div>
      <div className="input-form">
        <h2>Please Provide your card number and PIN</h2>
        <div>
          <RegisterForm handleRegisterUser={handleRegisterUser} />
        </div>
      </div>
      <Button variant="outlined" fullWidth onClick={() => {navigateTo(Page.HOME)}}>
        RETURN
      </Button>
    </div>
  );
};

export default RegisterPage;
