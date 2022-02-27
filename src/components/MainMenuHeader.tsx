import { useCurrentUser } from "../data/currentUser";

const MainMenuHeader: React.FC = () => {
  const { userContext } = useCurrentUser()
  const currentUser = userContext;
  
  return (
    <>
      <h1>Welcome! {currentUser.userName}</h1>
      <h2>Card: {currentUser.cardNumber}</h2>
    </>
  );
};

export default MainMenuHeader;
