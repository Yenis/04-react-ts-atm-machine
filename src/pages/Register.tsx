import { Link, useNavigate } from "react-router-dom";
import { Action, ActionType } from "../data/currentUser";
import { toast, ToastType } from "../helpers/ToastManager";

import RegisterForm from "../components/RegisterFrom";
import { isCardValid } from "../validation/validateCard";
import { isPinValid } from "../validation/validatePIN";
import { useState } from "react";

interface RegisterPageProps {
  dispatch: (arg0: Action) => void;
}

const RegisterPage: React.FC<RegisterPageProps> = (props) => {
  const [userName, setUserName] = useState("");
  const [cardInput, setCardInput] = useState("");
  const [pinInput, setPinInput] = useState("");

  const navigateTo = useNavigate();

  const handleRegisterUser = async (
    userName?: string,
    cardNumber?: string,
    pin?: string
  ) => {
    if (!userName) {
      toast.show({
        title: ToastType.ERROR,
        content: "User Name not provided, fall back to defaultUser",
        duration: 3000,
      });
      userName = "defaultUser";
    }
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
        content: "Pin Number is not Valid",
        duration: 3000,
      });
      return;
    }

    let userData = {
      userName: userName,
      cardNumber: cardNumber,
      pin: pin,
      balance: 0,
    };

    props.dispatch({ type: ActionType.SET, payload: userData });

    toast.show({
      title: ToastType.SUCCESS,
      content: `Register User: ${userData.userName}, Card Number: ${userData.cardNumber}!`,
      duration: 5000,
    });

    navigateTo("/MainMenu");
  };

  return (
    <>
      <h2>Please Provide your card number and PIN</h2>
      <RegisterForm
        userName={userName}
        setUserName={setUserName}
        cardInput={cardInput}
        setCardInput={setCardInput}
        pinInput={pinInput}
        setPinInput={setPinInput}
        handleRegisterUser={handleRegisterUser}
      />
      <div>
        <button
          onClick={(e) => {
            e.preventDefault();
            handleRegisterUser(userName, cardInput, pinInput);
          }}
        >
          REGISTER USER
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

export default RegisterPage;
