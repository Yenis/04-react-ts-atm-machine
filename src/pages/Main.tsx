import { Link } from "react-router-dom";
import { ActionType, emptyUser, useCurrentUser } from "../data/currentUser";

import MainMenuButtons from "../components/MainMenuButtons";
import MainMenuHeader from "../components/MainMenuHeader";
import { toast, ToastType } from "../helpers/ToastManager";

const MainMenuPage: React.FC = () => {
  const { dispatch, userContext } = useCurrentUser();
  const currentUser = userContext;

  const handleLogOutUser = () => {
    dispatch({ type: ActionType.EMPTY, payload: emptyUser });
    toast.show({
      title: ToastType.SUCCESS,
      content: `User: ${currentUser.userName} has Logged Out`,
      duration: 5000,
    });
  };

  return (
    <div>
      <MainMenuHeader />
      <MainMenuButtons />
      <div>
        <Link to="/">
          <button onClick={handleLogOutUser}>LOGOUT</button>
        </Link>
      </div>
    </div>
  );
};

export default MainMenuPage;
