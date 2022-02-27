import Receipt from "../../components/PrintedReceipt";
import { Link } from "react-router-dom";
import MainMenuHeader from "../../components/MainMenuHeader";

const StatusPage: React.FC = () => {
  return (
    <>
      <MainMenuHeader />
      <Receipt />
      <Link to="/MainMenu">
        <button>RETURN</button>
      </Link>
    </>
  );
};

export default StatusPage;
