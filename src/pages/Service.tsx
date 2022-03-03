import { Link } from "react-router-dom";
import { transactionStore } from "../data/transactionStore";

const AdminServicePage: React.FC = () => {
  return (
    <div>
      <div>
        <h2>_ADMIN_SERVICE_PAGE_</h2>
        <br />
        <h3>_total_cash_inside_ : _{transactionStore.allUsersTotal}_</h3>
        <br />
        <Link to="/AdminPage">
          <button>RETURN</button>
        </Link>
      </div>
    </div>
  );
};

export default AdminServicePage;

let needsImplementation;
