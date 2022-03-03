import { Link, useNavigate } from "react-router-dom";
import { toast, ToastType } from "../helpers/ToastManager";

import LoginForm from "../components/LoginForm";
import { isCardValid } from "../validation/validateCard";
import { isPinValid } from "../validation/validatePIN";
import { useState } from "react";
import { User } from "../helpers/currentUserHook";
import { UserPin } from "../helpers/userPinHook";
import { saveUserPinStateAsync } from "../data/userData";
import {
  assignUserAccount,
  assignUserPinState,
} from "../helpers/assignUserAccount";

export interface LogRegProps {
  setCurrentUser: (arg0: User) => void;
  setPinState: (arg0: UserPin) => void
}

const LoginPage: React.FC<LogRegProps> = (props) => {
  const [cardInput, setCardInput] = useState("");
  const [pinInput, setPinInput] = useState("");

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
      <LoginForm
        cardInput={cardInput}
        setCardInput={setCardInput}
        pinInput={pinInput}
        setPinInput={setPinInput}
        handleLoginUser={handleLoginUser}
      />
      <div>
        <button
          onClick={(e) => {
            e.preventDefault();
            handleLoginUser(cardInput, pinInput);
          }}
        >
          LOGIN
        </button>
      </div>
      <div>
        <Link to="/">
          <button>RETURN</button>
        </Link>
      </div>
    </>
  );
};

export default LoginPage;
