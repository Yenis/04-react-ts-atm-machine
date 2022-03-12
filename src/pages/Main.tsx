import MainMenuButtons from "../components/MainMenuButtons";
import MainMenuHeader from "../components/MainMenuHeader";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import { noUser, useCurrentUser } from "../helpers/currentUserHook";
import { resetPinAttempts, useUserPin } from "../helpers/userPinHook";
import { Page } from "../helpers/Links";
import { saveUserPinStateAsync } from "../data/db_pins";
import { throwMessageUserAccess } from "../helpers/ToastMessages";
import { useTranslation } from "react-i18next";

const MainMenuPage: React.FC = () => {

  const { currentUser, setCurrentUser } = useCurrentUser();
  const { userPinState, setPinState } = useUserPin();
  const {t} = useTranslation()

  const handleLogOutUser = async () => {

    resetPinAttempts(userPinState)
    await saveUserPinStateAsync(userPinState.cardNumber, userPinState)
    throwMessageUserAccess(t("logout-user"), currentUser);
    setPinState(userPinState);
    setCurrentUser(noUser);
    
  };
  return (
    <div>
      <MainMenuHeader />
      <MainMenuButtons />
      <div>
        <Link to={Page.HOME}>
          <Button variant="outlined" fullWidth onClick={handleLogOutUser}>{t("logout")}</Button>
        </Link>
      </div>
    </div>
  );
};

export default MainMenuPage;
