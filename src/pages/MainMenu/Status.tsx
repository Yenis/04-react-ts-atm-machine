import { Link } from "react-router-dom";
import Receipt from "../../components/PrintedReceipt";
import { useCurrentUser } from "../../data/currentUser";
import MainMenuHeader from "./MainHeader";

const StatusPage: React.FC = () => {
  const currentUser = useCurrentUser();
  return (
    <>
      <MainMenuHeader currentUser={currentUser} />
      <Receipt currentUser={currentUser} />
      <Link to="/MainMenu">
        <button>RETURN</button>
      </Link>
    </>
  );
};

export default StatusPage;
