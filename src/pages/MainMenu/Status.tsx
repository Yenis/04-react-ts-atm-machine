import Receipt from "../../components/PrintedReceipt";
import { Link } from "react-router-dom";
import { useCurrentUser } from "../../data/currentUser";
import MainMenuHeader from "../../components/MainMenuHeader";

const StatusPage: React.FC = () => {
  const { userContext } = useCurrentUser()
  const currentUser = userContext;
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
