import MainMenuButtons from "../components/MainMenu/MainMenuButtons";
import { Link } from "react-router-dom";
import { noUser, useCurrentUser } from "../helpers/customHooks/currentUserHook";
import {
  resetPinAttempts,
  useUserPin,
} from "../helpers/customHooks/userPinHook";
import { Page } from "../helpers/pageLinks";
import { saveUserPinStateAsync } from "../data/db_pins";
import { throwMessageUserAccess } from "../helpers/toastr/ToastMessages";
import { useTranslation } from "react-i18next";
import { ButtonLogout } from "../components/VariousButtons";
import { useDisplay } from "../helpers/customHooks/displayScreenHook";
import withAuth from "../helpers/userAuthenticationHOC";

const MainMenuPage: React.FC = () => {
  const { currentUser, setCurrentUser } = useCurrentUser();
  const { userPinState, setPinState } = useUserPin();
  const { setActivePage } = useDisplay();
  const { t } = useTranslation();

  const handleLogOutUser = async () => {
    throwMessageUserAccess(t("logout-user"), currentUser);
    resetPinAttempts(userPinState);
    await saveUserPinStateAsync(userPinState.cardNumber, userPinState);
    setPinState(userPinState);
    setCurrentUser(noUser);
    setActivePage(Page.HOME);
  };

  return (
    <div>
      <MainMenuButtons />
      <div>
        <Link to={Page.HOME} style={{ textDecoration: 'none' }}>
          <ButtonLogout onClick={handleLogOutUser}>
            {t("logout")}
          </ButtonLogout>
        </Link>
      </div>
    </div>
  );
};

export default withAuth(MainMenuPage);
