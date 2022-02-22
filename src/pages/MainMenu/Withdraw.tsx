import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useCurrentUser } from "../../data/currentUser";
import { hasEnoughMoney } from "../../validation/validateCard";
import Receipt from "../../components/PrintedReceipt";
import MainMenuHeader from "./MainHeader";
import { saveTransactionResultIdbAsync } from "../../helpers/saveTransactionResult";

interface WithdrawPageProps {}

const WithdrawPage: React.FC<WithdrawPageProps> = (props) => {
  const [isWithdrawn, completeTransaction] = useState(false);
  const inputRef = useRef() as React.MutableRefObject<any>;
  const currentUser = useCurrentUser();

  const handleWithdraw = () => {
    if (inputRef.current.value) {
      if (
        hasEnoughMoney(currentUser.Balance, parseFloat(inputRef.current.value))
      ) {
        alert(`Withdrawn ${inputRef.current.value} Imaginary Dolars`);
        currentUser.Balance =
          currentUser.Balance - parseFloat(inputRef.current.value);
          saveTransactionResultIdbAsync(currentUser.CardNumber, { ...currentUser });
        completeTransaction(true);
      } else {
        alert(
          `Cannot Withdraw More Cash than Available. Current Status is ${currentUser.Balance}.00    `
        );
        inputRef.current.value = null;
      }
    }
  };

  return (
    <>
      {!isWithdrawn && (
        <>
          <MainMenuHeader currentUser={currentUser} />
          <input
            type="number"
            ref={inputRef}
            min={0}
            placeholder="Enter Amount..."
          />
          <button onClick={handleWithdraw}>WITHDRAW</button>
        </>
      )}

      {isWithdrawn && (
        <Receipt
          type="Withdraw"
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

export default WithdrawPage;
