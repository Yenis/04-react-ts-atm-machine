
import { Link } from "react-router-dom";
import { allAccountsData } from "../data/allAccountIDs";


const AdminServicePage: React.FC = () => {
  let total = 0;
  allAccountsData.forEach(account => {
    total = total + account.Balance
  })
  
  return (
    <div>
      <div>
      <h2>_ADMIN_SERVICE_PAGE_</h2>
        <br />
        <h3>_total_cash_inside_</h3>
        <br />
        <h2>{total}.00</h2>
        <br />
        <Link to="/AdminPage">
        <button>RETURN</button>
      </Link>
      </div>
    </div>
  );
};

export default AdminServicePage;
