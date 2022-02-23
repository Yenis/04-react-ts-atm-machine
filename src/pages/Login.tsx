import { Link, useNavigate } from "react-router-dom";
import { Action, ActionType } from "../data/currentUser";

import LoginForm from "../components/LoginForm";
import { isCardValid } from "../validation/validateCard";
import { isPinValid } from "../validation/validatePIN";
import { assignUserAccount } from "../helpers/assignUserAccount";
import { toast, ToastType } from "../helpers/ToastManager"


interface LoginPageProps {
  setCurrentUser: (arg0: Action ) => void
}

// TODO - Implement isPinCorrect

const LoginPage: React.FC<LoginPageProps> = (props) => {

  const navigateTo = useNavigate();
  const handleLoginUser = async (cardNumber?: string, pin?: string) => {
    if (!cardNumber || !isCardValid(cardNumber)) {
      toast.show({
        title: ToastType.ERROR,
        content: "Card Number is not Valid",
        duration: 3000,
      })
      return;
    }
    if (!pin || !isPinValid(pin)) {
      toast.show({
        title: ToastType.ERROR,
        content: "PIN is not Valid",
        duration: 3000,
      })
      return;
    }
    let userData = await assignUserAccount(cardNumber);
    props.setCurrentUser({ type: ActionType.SET, payload: { ...userData } })
    toast.show({
      title: ToastType.SUCCESS,
      content: `Login User: ${userData.userName}!`,
      duration: 3000,
    })
    navigateTo("/MainMenu");
  };

  return (
    <>
      <h2>Please Provide your card number and PIN</h2>
      <LoginForm handleLoginUser={handleLoginUser} />
      <div>
        <Link to="/">
          <button>RETURN</button>
        </Link>
      </div>
    </>
  );
};

export default LoginPage;
