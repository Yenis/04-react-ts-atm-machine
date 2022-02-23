import { Link } from "react-router-dom";
import { useCurrentUser} from "../data/currentUser";
import { MouseEventHandler } from "react";
import MainMenuButtons from "../components/MainMenuButtons";
import MainMenuHeader from "../components/MainMenuHeader";

interface MainMenuProps {
  handleLogOutUser: MouseEventHandler<HTMLButtonElement> | undefined
}

const MainMenuPage: React.FC<MainMenuProps> = (props) => {
  const { userContext } = useCurrentUser()
  const currentUser = userContext;
  
  return (
    <div>
        <MainMenuHeader currentUser={currentUser}/>
        <MainMenuButtons />
        <br />
        <Link to="/">
        <button onClick={props.handleLogOutUser}>LOGOUT</button>
      </Link>
    </div>
  );
};

export default MainMenuPage;
