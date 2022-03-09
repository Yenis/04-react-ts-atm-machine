import { Button } from "@material-ui/core";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { transactionStore } from "../data/transactionStore";
import { Page } from "../helpers/Links";

const AdminMenu: React.FC = () => {
  const navigateTo = useNavigate();

  useEffect(() => {
    transactionStore.assignTotalCashAmountAsync();
  });

  return (
    <div className="main-menu-header">
      <div>
        <h2>_admin_menu_</h2>
      </div>
      <div>
        <Button variant="outlined" fullWidth onClick={() => navigateTo(Page.REGISTER)}>
          REGISTER NEW USER
        </Button>
      </div>
      <div>
        <Button variant="outlined" fullWidth onClick={() => navigateTo(Page.SERVICE)}>SERVICE ATM</Button>
      </div>
      <div>
        <Button variant="outlined" fullWidth onClick={() => navigateTo(Page.HOME)}>RETURN</Button>
      </div>
    </div>
  );
};

export default AdminMenu;
