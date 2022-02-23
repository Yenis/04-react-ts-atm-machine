import { Link } from "react-router-dom";

const MainMenuButtons: React.FC = () => {
  return (
    <>
      <Link to="StatusPage">
        <button>STATUS</button>
      </Link>
      <Link to="DepositPage">
        <button>DEPOSIT</button>
      </Link>
      <Link to="WithdrawPage">
        <button>WITHDRAW</button>
      </Link>
    </>
  );
};

export default MainMenuButtons;
