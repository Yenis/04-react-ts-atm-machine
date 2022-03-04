import { useNavigate } from "react-router-dom";
import { toast, ToastType } from "../helpers/ToastManager";

import LoginForm from "../components/LoginForm";
import { isCardValid } from "../validation/validateCard";
import { isPinValid } from "../validation/validatePIN";
import { UserPin } from "../helpers/userPinHook";
import { User } from "../helpers/currentUserHook";
import { Button } from "@material-ui/core";
import {
  assignUserAccount,
  assignUserPinState,
} from "../helpers/assignUserAccount";
import { saveUserPinStateAsync } from "../data/userData";

export interface LogRegProps {
  setCurrentUser: (arg0: User) => void;
  setPinState: (arg0: UserPin) => void;
}

const LoginPage: React.FC<LogRegProps> = (props) => {
  const navigateTo = useNavigate();

  const handleLoginUser = async (cardInput?: string, pinInput?: string) => {
    if (!cardInput || !isCardValid(cardInput)) return;
    if (!pinInput || !isPinValid(pinInput)) return;

    let userInfo = await assignUserAccount(cardInput);
    let pinState = await assignUserPinState(cardInput);

    if (pinState.pin !== pinInput) {
      toast.show({
        title: ToastType.ERROR,
        content: "Provided PIN is wrong!",
        duration: 9000,
      });
      await saveUserPinStateAsync(cardInput, {
        ...pinState,
        pinAttempts: pinState.pinAttempts - 1,
      });
      props.setPinState({
        ...pinState,
        pinAttempts: pinState.pinAttempts - 1,
      });
      return;
    }

    props.setCurrentUser(userInfo);
    toast.show({
      title: ToastType.SUCCESS,
      content: `Login User: ${userInfo.userName}!`,
      duration: 5000,
    });
    navigateTo("/MainMenu");
  };

  return (
    <>
      <h2>Please Provide your card number and PIN</h2>
      <div>
        <LoginForm handleLoginUser={handleLoginUser} />
      </div>
      <Button onClick={() => {navigateTo("/")}}>
        RETURN
      </Button>
    </>
  );
};

export default LoginPage;
