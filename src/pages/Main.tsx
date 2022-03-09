import MainMenuButtons from "../components/MainMenuButtons";
import MainMenuHeader from "../components/MainMenuHeader";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import { noUser, useCurrentUser } from "../helpers/currentUserHook";

import { toast, ToastType } from "../helpers/ToastManager";
import { DEFAULT_ATT_NUM, useUserPin } from "../helpers/userPinHook";
import { Page } from "../helpers/Links";
import { saveUserPinStateAsync } from "../data/db_pins";

const MainMenuPage: React.FC = () => {

  const { currentUser, setCurrentUser } = useCurrentUser();
  const { userPinState, setPinState } = useUserPin();

  const handleLogOutUser = async () => {
    const pinData = { ...userPinState, availablePinAttempts: DEFAULT_ATT_NUM };
    await saveUserPinStateAsync(userPinState.cardNumber, pinData)
    setPinState(pinData)

    setCurrentUser({...noUser});
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
