import { User } from "../../data/currentUser";

interface HeaderProps {
  currentUser: User
}

const MainMenuHeader: React.FC<HeaderProps> = (props) => {
  return (
    <>
      <h1>Welcome to ATM</h1>
      <h1>User: {props.currentUser.Username}</h1>
      <h2>Card: {props.currentUser.CardNumber}</h2>
    </>
  );
};

export default MainMenuHeader;
