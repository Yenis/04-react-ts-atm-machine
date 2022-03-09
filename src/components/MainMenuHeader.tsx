import { useCurrentUser } from "../helpers/currentUserHook";

const MainMenuHeader: React.FC = () => {
  const { currentUser } = useCurrentUser();

  return (
    <div className="main-menu-header">
      <h2>Welcome! {currentUser.userName}</h2>
      <h2>Card: {currentUser.cardNumber}</h2>
    </div>
  );
};

export default MainMenuHeader;
