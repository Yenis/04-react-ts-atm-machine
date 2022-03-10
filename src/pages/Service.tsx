import { Button } from "@material-ui/core";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { atmNumber, saveAtmStateAsync } from "../data/db_adminService";
import { transactionStore } from "../data/transactionStore";
import { useAtmState } from "../helpers/AdminServiceContext";
import { Page } from "../helpers/Links";

const AdminServicePage: React.FC = () => {
  const { isServicing, toggleService } = useAtmState();
  const navigateTo = useNavigate()
  
  useEffect(() => {
    console.log(transactionStore.allUsersTotal);
  })

  const handleServiceToggle = async () => {
    toggleService(!isServicing);
    await saveAtmStateAsync(atmNumber, !isServicing)
    navigateTo(Page.ADMIN)
  }

  return (
    <div>
      <div className="main-menu-header">
        <h3>_ADMIN_SERVICE_PAGE_</h3>
        <h4>_total_cash_inside_ : _{transactionStore.allUsersTotal}_</h4>
        {!isServicing && <Button
          variant="contained"
          color="secondary"
          fullWidth
          onClick={handleServiceToggle}
        >
          TURN OFF
        </Button>}
        {isServicing && <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleServiceToggle}
        >
          TURN ON
        </Button>}
      </div>
      <Link to={Page.ADMIN}>
        <Button variant="outlined" fullWidth>
          RETURN
        </Button>
      </Link>
    </div>
  );
};

export default AdminServicePage;
