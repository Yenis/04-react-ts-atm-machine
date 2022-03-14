import MainMenuButtons from "../components/MainMenuButtons";
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
import { ButtonScnd } from "../components/ButtonsContained";

const MainMenuPage: React.FC = () => {
  const { currentUser, setCurrentUser } = useCurrentUser();
  const { userPinState, setPinState } = useUserPin();
  const { t } = useTranslation();

  const handleLogOutUser = async () => {
    resetPinAttempts(userPinState);
    await saveUserPinStateAsync(userPinState.cardNumber, userPinState);
    throwMessageUserAccess(t("logout-user"), currentUser);
    setPinState(userPinState);
    setCurrentUser(noUser);
  };
  return (
    <div>
      <MainMenuButtons />
      <div>
        <Link to={Page.HOME}>
          <ButtonScnd onClick={handleLogOutUser}>
            {t("logout")}
          </ButtonScnd>
        </Link>
      </div>
    </div>
  );
};

export default MainMenuPage;
