import { useEffect } from "react";
import { Link } from "react-router-dom";
import { loadUserDataFromIdbAsync } from "../data/allAccountIDs";

const AdminMenu: React.FC = () => {
  useEffect(() => {
    loadUserDataFromIdbAsync();
  }, []);

  return (
    <>
      <div>
        <h1>_admin_menu</h1>
      </div>
      <div>
        <Link to="/RegisterPage">
          <button>REGISTER NEW USER</button>
        </Link>
      </div>
      <div>
        <Link to="/ServicePage">
          <button>SERVICE ATM</button>
        </Link>
      </div>
      <div>
      <Link to="/">
        <button>RETURN</button>
      </Link>
      </div>
    </>
  );
};

export default AdminMenu;
