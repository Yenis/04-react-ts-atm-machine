
import { Link } from "react-router-dom";
import { allAccounts } from "../data/allAccountIDs";

const AdminServicePage: React.FC = () => {
  let total = 0;
  allAccounts.forEach(account => {
    if (account.balance) {
      total = total + account.balance
    }
  })
  
  return (
    <div>
      <div>
      <h2>_ADMIN_SERVICE_PAGE_</h2>
        <br />
        <h3>_total_cash_inside_ : _{total}.00_</h3>
        <br />
        <Link to="/AdminPage">
        <button>RETURN</button>
      </Link>
      </div>
    </div>
  );
};

export default AdminServicePage;
