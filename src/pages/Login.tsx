import LoginForm from "../components/LoginForm";
import { isCardValid } from "../validation/validateCard";
import { isPinValid } from "../validation/validatePIN";
import { useUserPin } from "../helpers/customHooks/userPinHook";
import { useCurrentUser } from "../helpers/customHooks/currentUserHook";
import { Page } from "../helpers/pageLinks";
import { isInputPinCorrect } from "../validation/validatePinCorrect";
import {
  throwError,
  throwMessageUserAccess,
} from "../helpers/toastr/ToastMessages";
import { handleWrongPinInput } from "../helpers/handleWrongPinInput";
import { useTranslation } from "react-i18next";
import { getUserInfoAsync } from "../data/db_users";
import { getUserPinStateAsync } from "../data/db_pins";
import { ButtonOutlined } from "../components/ButtonsOutlined";
import { useNavigation } from "../helpers/customHooks/navigationHook";

const LoginPage: React.FC = () => {
  const { setCurrentUser } = useCurrentUser();
  const { setPinState } = useUserPin();
  const navigateTo = useNavigation();
  const { t } = useTranslation();

  const handleLoginUser = async (cardInput?: string, pinInput?: string) => {
    if (!cardInput || !isCardValid(cardInput)) {
      throwError(t("invalid-card"));
      return;
    }

    if (!pinInput || !isPinValid(pinInput)) {
      throwError(t("invalid-pin"));
      return;
    }

    let userInfo = await getUserInfoAsync(cardInput);
    let pinInfo = await getUserPinStateAsync(cardInput);

    if (pinInfo.pin && !isInputPinCorrect(pinInput, pinInfo.pin)) {
      throwError(t("wrong-pin"));

      let pinStateOnError = await handleWrongPinInput(cardInput, pinInfo);
      setPinState(pinStateOnError);
      return;
    }

    throwMessageUserAccess(t("login-user"), userInfo);
    setPinState(pinInfo);
    setCurrentUser(userInfo);
    navigateTo(Page.MAIN);
  };

  return (
    <div>
      <div className="input-form">
        <LoginForm handleLoginUser={handleLoginUser} />
      </div>
      <ButtonOutlined onClick={() => navigateTo(Page.HOME)}>
        {t("return")}
      </ButtonOutlined>
    </div>
  );
};

export default LoginPage;
