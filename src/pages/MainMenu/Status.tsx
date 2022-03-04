import { Button } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import Receipt from "../../components/PrintedReceipt";
import MainMenuHeader from "../../components/MainMenuHeader";

const StatusPage: React.FC = () => {
  const navigateTo = useNavigate();
  return (
    <div>
      <MainMenuHeader />
      <Receipt />
      <Button onClick={() => navigateTo("/MainMenu")}>RETURN</Button>
    </div>
  );
};

export default StatusPage;
