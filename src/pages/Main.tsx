import { MouseEventHandler } from "react";
import { Link } from "react-router-dom";
import { useCurrentUser} from "../data/currentUser";
import MainMenuButtons from "./MainMenu/MainButtons";
import MainMenuHeader from "./MainMenu/MainHeader";

interface MainMenuProps {
  setCurrentUser: (arg0: { CardNumber: string; Username: string; PIN: string; Balance: number; }) => void
  logOut: MouseEventHandler<HTMLButtonElement> | undefined
}

const MainMenuPage: React.FC<MainMenuProps> = (props) => {
  const currentUser = useCurrentUser()
  
  return (
    <div>
        <MainMenuHeader currentUser={currentUser}/>
        <MainMenuButtons />
        <br />
        <Link to="/">
        <button onClick={props.logOut}>LOGOUT</button>
      </Link>
    </div>
  );
};

export default MainMenuPage;
