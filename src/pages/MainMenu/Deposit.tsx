import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useCurrentUser } from "../../data/currentUser";
import Receipt from "../../components/PrintedReceipt";
import MainMenuHeader from "./MainHeader";
import { saveTransactionResultIdbAsync } from "../../helpers/saveTransactionResult";

interface DepositPageProps {}

const DepositPage: React.FC<DepositPageProps> = (props) => {
  const [isDeposited, completeTransaction] = useState(false);
  const inputRef = useRef() as React.MutableRefObject<any>;
  const currentUser = useCurrentUser();

  const handleDeposit = () => {
    if (inputRef.current.value) {
      alert(`Deposited ${inputRef.current.value} Imaginary Dolars`);
      currentUser.Balance =
        currentUser.Balance + parseFloat(inputRef.current.value);
      saveTransactionResultIdbAsync(currentUser.CardNumber, { ...currentUser });
      completeTransaction(true);
    }
  };

  return (
    <>
      {!isDeposited && (
        <>
          <MainMenuHeader currentUser={currentUser} />
          <input
            type="number"
            name="depositAmount"
            ref={inputRef}
            min={0}
            placeholder="Enter Amount..."
          />
          <button onClick={handleDeposit}>DEPOSIT</button>
        </>
      )}

      {isDeposited && (
        <Receipt
          type="Deposit"
          success={inputRef.current.value ? "true" : "false"}
          amount={parseFloat(inputRef.current.value)}
          currentUser={currentUser}
        />
      )}

      <div>
        <Link to="/MainMenu">
          <button>RETURN</button>
        </Link>
      </div>
    </>
  );
};

export default DepositPage;
