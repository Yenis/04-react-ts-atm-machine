import MainMenuButtons from "../components/MainMenuButtons";
import MainMenuHeader from "../components/MainMenuHeader";
import { MouseEventHandler } from "react";
import { Link } from "react-router-dom";

interface MainMenuProps {
  handleLogOutUser: MouseEventHandler<HTMLButtonElement> | undefined
}

const MainMenuPage: React.FC<MainMenuProps> = (props) => {
  return (
    <div>
      <MainMenuHeader />
      <MainMenuButtons />
      <div>
        <Link to="/">
          <button onClick={props.handleLogOutUser}>LOGOUT</button>
        </Link>
      </div>
    </div>
  );
};

export default MainMenuPage;
