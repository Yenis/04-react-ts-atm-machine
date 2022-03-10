import MainMenuButtons from "../components/MainMenuButtons";
import MainMenuHeader from "../components/MainMenuHeader";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import { noUser, useCurrentUser } from "../helpers/currentUserHook";

import { toast, ToastType } from "../helpers/ToastManager";
import { resetPinAttempts, useUserPin } from "../helpers/userPinHook";
import { Page } from "../helpers/Links";
import { saveUserPinStateAsync } from "../data/db_pins";

const MainMenuPage: React.FC = () => {

  const { currentUser, setCurrentUser } = useCurrentUser();
  const { userPinState, setPinState } = useUserPin();

  const handleLogOutUser = async () => {

    resetPinAttempts(userPinState)
    await saveUserPinStateAsync(userPinState.cardNumber, userPinState)
    setPinState(userPinState)

    setCurrentUser(noUser);
    toast.show({
      type: ToastType.SUCCESS,
      content: `User: ${currentUser.userName} has Logged Out`
    });
  };
  return (
    <div>
      <MainMenuHeader />
      <MainMenuButtons />
      <div>
        <Link to={Page.HOME}>
          <Button variant="outlined" fullWidth onClick={handleLogOutUser}>LOGOUT</Button>
        </Link>
      </div>
    </div>
  );
};

export default MainMenuPage;
