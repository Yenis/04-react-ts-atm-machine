import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { transactionStore } from "../data/transactionStore";
import { Page } from "../helpers/Links";

const AdminServicePage: React.FC = () => {
  return (
    <div>
      <div className="main-menu-header">
        <h2>_ADMIN_SERVICE_PAGE_</h2>
        <h3>_total_cash_inside_ : _{transactionStore.allUsersTotal}_</h3>
      </div>
      <Link to={Page.ADMIN}>
        <Button variant="outlined" fullWidth>RETURN</Button>
      </Link>
    </div>
  );
};

export default AdminServicePage;

let needsImplementation;
