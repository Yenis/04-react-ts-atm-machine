import { Button } from "@material-ui/core";
import { useNavigate } from "react-router-dom";

const MainMenuButtons: React.FC = () => {
  const navigateTo = useNavigate();
  return (
    <div>
      <Button onClick={() => navigateTo("StatusPage")}>STATUS</Button>
      <Button onClick={() => navigateTo("DepositPage")}>DEPOSIT</Button>
      <Button onClick={() => navigateTo("WithdrawPage")}>WITHDRAW</Button>
    </div>
  );
};

export default MainMenuButtons;
