import RegisterForm from "../components/Admin/RegisterFrom";
import { isCardValid } from "../validation/validateCard";
import { isAlreadyRegistered } from "../validation/validateUnique";
import { isPinValid } from "../validation/validatePIN";
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
import { ButtonReturnOut } from "../components/VariousButtons";
import { useNavigation } from "../helpers/customHooks/navigationHook";
import withAuth from "../helpers/userAuthenticationHOC";

const RegisterPage: React.FC = () => {
  const navigateTo = useNavigation();
  const { t } = useTranslation();

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
    navigateTo(Page.HOME);
  };

  return (
    <div>
      <div className="input-form">
        <h3>{t("please-provide-card")}</h3>
        <div>
          <RegisterForm handleRegisterUser={handleRegisterUser} />
        </div>
      </div>
      <ButtonReturnOut onClick={() => navigateTo(Page.ADMIN)}>
        {t("return")}
      </ButtonReturnOut>
    </div>
  );
};

export default withAuth(RegisterPage);
