import { Action, ActionType, useCurrentUser } from "../../data/currentUser";
import { useState } from "react";
import Receipt, {
  dateToday,
  timeNow,
  TransactionType,
} from "../../components/PrintedReceipt";
import MainMenuHeader from "../../components/MainMenuHeader";
import { hasEnoughMoney } from "../../validation/validateAmount";
import { Link } from "react-router-dom";
import { toast, ToastType } from "../../helpers/ToastManager";
import { saveTransactionResultsAsync } from "../../data/transactions";

interface WithdrawPageProps {
  setCurrentUser: (arg0: Action) => void
}

const WithdrawPage: React.FC<WithdrawPageProps> = (props) => {
  const [isComplete, completeTransaction] = useState(false);
  const [input, setInput] = useState("");

  const { userContext } = useCurrentUser();
  const currentUser = userContext;

  const handleWithdraw = async () => {
    if (!currentUser.cardNumber) return;
    if (!currentUser.balance) return;
    if (!input) return;

    if (hasEnoughMoney(currentUser.balance, parseFloat(input))) {
      currentUser.balance = currentUser.balance - parseFloat(input);
      props.setCurrentUser({ type: ActionType.WITHDRAW, payload: { ...currentUser } });
      
      await saveTransactionResultsAsync(
        currentUser.cardNumber,
        { ...currentUser },
        {
          transactionType: TransactionType.WITHDRAW,
          amount: parseFloat(input),
          date: dateToday.toLocaleDateString(),
          time: timeNow,
        }
      );
      toast.show({
        title: ToastType.SUCCESS,
        content: `Withdrawn ${input} Imaginary Dolars`,
        duration: 3000,
      });
      completeTransaction(true);
    } else {
      toast.show({
        title: ToastType.ERROR,
        content: `Cannot Withdraw More Cash than Available. Current Status is ${currentUser.balance}.00`,
        duration: 9000,
      });
    }
  };

  return (
    <>
      {!isComplete && (
        <>
          <MainMenuHeader currentUser={currentUser} />
          <input
            type="number"
            value={input}
            min={0}
            placeholder="Enter Amount..."
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              handleWithdraw();
            }}
          >
            WITHDRAW
          </button>
        </>
      )}

      {isComplete && (
        <Receipt
          type={TransactionType.WITHDRAW}
          isSuccessful={isComplete ? true : false}
          amount={parseFloat(input)}
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
