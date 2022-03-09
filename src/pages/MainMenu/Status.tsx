import { Button } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import Receipt from "../../components/PrintedReceipt";
import MainMenuHeader from "../../components/MainMenuHeader";
import { Page } from "../../helpers/Links";

const StatusPage: React.FC = () => {
  const navigateTo = useNavigate();
  return (
    <div>
      <MainMenuHeader />
      <Receipt />
      <Button variant="contained" fullWidth onClick={() => navigateTo(Page.MAIN)}>RETURN</Button>
    </div>
  );
};

export default StatusPage;
