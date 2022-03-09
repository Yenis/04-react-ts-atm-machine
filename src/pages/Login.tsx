import { useNavigate } from "react-router-dom";
import { toast, ToastType } from "../helpers/ToastManager";

import LoginForm from "../components/LoginForm";
import { isCardValid } from "../validation/validateCard";
import { isPinValid } from "../validation/validatePIN";
import { useUserPin } from "../helpers/userPinHook";
import { useCurrentUser } from "../helpers/currentUserHook";
import { Button } from "@material-ui/core";
import {
  assignUserAccount,
  assignUserPinState,
} from "../helpers/assignUserAccount";
import { Page } from "../helpers/Links";
import { saveUserPinStateAsync } from "../data/db_pins";

const LoginPage: React.FC = () => {
  const navigateTo = useNavigate();
  const { setCurrentUser } = useCurrentUser();
  const { setPinState } = useUserPin();

  const handleLoginUser = async (cardInput?: string, pinInput?: string) => {
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

    let userInfo = await assignUserAccount(cardInput);
    let pinData = await assignUserPinState(cardInput);

    if (pinData.pin !== pinInput) {
      toast.show({
        type: ToastType.ERROR,
        content: "Provided PIN is wrong!",
      });

      const pinState = {
        ...pinData,
        availablePinAttempts: pinData.availablePinAttempts - 1,
      };

      await saveUserPinStateAsync(cardInput, pinState);
      setPinState(pinState);
      return;
    }

    setPinState(pinData);
    setCurrentUser(userInfo);
    toast.show({
      type: ToastType.SUCCESS,
      content: `Login User: ${userInfo.userName}!`,
      duration: 5000,
    });
    navigateTo(Page.MAIN);
  };

  return (
    <div>
      <div className="input-form">
        <h3>Please Provide your card number and PIN</h3>
        <div>
          <LoginForm handleLoginUser={handleLoginUser} />
        </div>
      </div>
      <Button variant="outlined" fullWidth onClick={() => {navigateTo(Page.HOME)}}>
        RETURN
      </Button>
    </div>
  );
};

export default LoginPage;
