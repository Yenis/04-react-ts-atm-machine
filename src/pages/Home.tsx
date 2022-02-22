import { Link } from "react-router-dom";

const HomePage: React.FC = () => {
  return (
    <>
      <div>
        <h1>Welcome to ATM</h1>
      </div>
      <div>
        <Link to="/LoginPage">
          <button>LOGIN</button>
        </Link>
      </div>
      <div>
        <Link to="/AdminPage">
          <button>ADMIN MENU</button>
        </Link>
      </div>
    </>
  );
};

export default HomePage;
