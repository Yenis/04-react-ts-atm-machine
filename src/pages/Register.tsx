import { useNavigate } from "react-router-dom";

import RegisterForm from "../components/RegisterFrom";
import { isCardValid } from "../validation/validateCard";
import { isAlreadyRegistered } from "../validation/validateUnique";
import { useCurrentUser } from "../helpers/customHooks/currentUserHook";
import { isPinValid } from "../validation/validatePIN";
import { Button } from "@material-ui/core";
import { Page } from "../helpers/pageLinks";
import { saveUserPinStateAsync } from "../data/db_pins";
import { saveUserTransactionAsync } from "../data/db_transactions";
import { saveUserInfoAsync } from "../data/db_users";
import {
  throwError,
  throwMessageUserAccess,
} from "../helpers/toastr/ToastMessages";
import { prepareUserTemplateForRegistration } from "../helpers/prepareRegisterData";
import { useTranslation } from "react-i18next";

const RegisterPage: React.FC = () => {
  const { setCurrentUser } = useCurrentUser();
  const { t } = useTranslation();
  const navigateTo = useNavigate();

  const handleRegisterUser = async (
    userName?: string,
    cardInput?: string,
    pinInput?: string
  ) => {
    if (!userName) {
      throwError(t("username-required"));
      return;
    }
    if (!cardInput || !isCardValid(cardInput)) {
      throwError(t("invalid-card"));
      return;
    }

    if (!pinInput || !isPinValid(pinInput)) {
      throwError(t("invalid-pin"));
      return;
    }

    if (await isAlreadyRegistered(cardInput)) {
      throwError(t("user-already-exists"));
      return;
    }

    let { userInfo, userPinState, userInitTransactionData } =
      await prepareUserTemplateForRegistration(userName, cardInput, pinInput);

    await saveUserInfoAsync(cardInput, userInfo);
    await saveUserPinStateAsync(cardInput, userPinState);
    await saveUserTransactionAsync(cardInput, userInitTransactionData);

    throwMessageUserAccess(t("register-user"), userInfo);
    setCurrentUser(userInfo);
    navigateTo(Page.MAIN);
  };

  return (
    <div>
      <div className="input-form">
        <h2>{t("please-provide-card")}</h2>
        <div>
          <RegisterForm handleRegisterUser={handleRegisterUser} />
        </div>
      </div>
      <Button
        variant="outlined"
        fullWidth
        onClick={() => {navigateTo(Page.HOME)}}
      >
        {t("return")}
      </Button>
    </div>
  );
};

export default RegisterPage;
