import { Link } from "react-router-dom";

const AdminMenu: React.FC = () => {
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
