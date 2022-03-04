import MainMenuButtons from "../components/MainMenuButtons";
import MainMenuHeader from "../components/MainMenuHeader";
import { MouseEventHandler } from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";

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
          <Button onClick={props.handleLogOutUser}>LOGOUT</Button>
        </Link>
      </div>
    </div>
  );
};

export default MainMenuPage;
