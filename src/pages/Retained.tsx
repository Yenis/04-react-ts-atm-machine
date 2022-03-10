import { useCurrentUser } from "../helpers/currentUserHook";

const RetainedCardPage: React.FC = () => {

  const { currentUser } = useCurrentUser();

  return (
    <div className="main-menu-header">
      <h2 style={{color: "red"}}>PIN wrongly entered 3 times for this user ({currentUser.userName})</h2>
      <h2 style={{color: "red"}}>the card will be permanently retained by the machine,</h2>
      <h2 style={{color: "red"}}>Please contact the bank to get it back.</h2>
    </div>
  );
};

export default RetainedCardPage;
