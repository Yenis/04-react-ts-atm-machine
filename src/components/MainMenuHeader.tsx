import { User } from "../data/currentUser";

interface HeaderProps {
  currentUser: User
}

const MainMenuHeader: React.FC<HeaderProps> = (props) => {
  return (
    <>
      <h1>Welcome! {props.currentUser.userName}</h1>
      <h2>Card: {props.currentUser.cardNumber}</h2>
    </>
  );
};

export default MainMenuHeader;
