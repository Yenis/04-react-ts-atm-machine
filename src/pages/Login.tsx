import { Link, useNavigate } from "react-router-dom";
import { Action, ActionType } from "../data/currentUser";

import LoginForm from "../components/LoginForm";
import { isCardValid } from "../validation/validateCard";
import { isPinValid } from "../validation/validatePIN";
import { assignUserAccount } from "../helpers/assignUserAccount";
import { toast, ToastType } from "../helpers/ToastManager";
import { useState } from "react";

interface LoginPageProps {
  dispatch: (arg0: Action) => void;
}

const LoginPage: React.FC<LoginPageProps> = (props) => {
  const [cardInput, setCardInput] = useState("");
  const [pinInput, setPinInput] = useState("");

  const navigateTo = useNavigate();

  const handleLoginUser = async (cardNumber?: string, pin?: string) => {
    if (!cardNumber || !isCardValid(cardNumber)) {
      toast.show({
        title: ToastType.ERROR,
        content: "Card Number is not Valid",
        duration: 3000,
      });
      return;
    }

    if (!pin || !isPinValid(pin)) {
      toast.show({
        title: ToastType.ERROR,
        content: "PIN is not Valid",
        duration: 3000,
      });
      return;
    }

    let userData = await assignUserAccount(cardNumber);

    props.dispatch({ type: ActionType.SET, payload: userData });

    toast.show({
      title: ToastType.SUCCESS,
      content: `Login User: ${userData.userName}!`,
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
