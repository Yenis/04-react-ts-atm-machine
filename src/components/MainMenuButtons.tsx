import { Button } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { Page } from "../helpers/Links";

const MainMenuButtons: React.FC = () => {
  const navigateTo = useNavigate();
  return (
    <div style={{display: "flex"}}>
      <Button variant="outlined" fullWidth onClick={() => navigateTo(Page.STATUS)}>STATUS</Button>
      <Button variant="outlined" fullWidth onClick={() => navigateTo(Page.DEPOSIT)}>DEPOSIT</Button>
      <Button variant="outlined" fullWidth onClick={() => navigateTo(Page.WITHDRAW)}>WITHDRAW</Button>
    </div>
  );
};

export default MainMenuButtons;
