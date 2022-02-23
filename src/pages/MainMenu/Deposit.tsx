import { Action, ActionType, useCurrentUser } from "../../data/currentUser";
import { useState } from "react";
import Receipt, {
  dateToday,
  timeNow,
  TransactionType,
} from "../../components/PrintedReceipt";
import MainMenuHeader from "../../components/MainMenuHeader";
import { Link } from "react-router-dom";
import { toast, ToastType } from "../../helpers/ToastManager";
import { saveTransactionResultsAsync } from "../../data/transactions";

interface DepositPageProps {
  setCurrentUser: (arg0: Action) => void
}

const DepositPage: React.FC<DepositPageProps> = (props) => {
  const [isComplete, completeTransaction] = useState(false);
  const [input, setInput] = useState("");

  const { userContext } = useCurrentUser();
  const currentUser = userContext;

  const handleDeposit = async () => {
    if (!currentUser.cardNumber) return;
    if (!currentUser.balance) return;
    if (!input) return;

    currentUser.balance = currentUser.balance + parseFloat(input);
    props.setCurrentUser({ type: ActionType.DEPOSIT, payload: { ...currentUser } });

    await saveTransactionResultsAsync(
      currentUser.cardNumber,
      { ...currentUser },
      {
        transactionType: TransactionType.DEPOSIT,
        amount: parseFloat(input),
        date: dateToday.toLocaleDateString(),
        time: timeNow,
      }
    );
    toast.show({
      title: ToastType.SUCCESS,
      content: `Deposited ${input} Imaginary Dolars`,
      duration: 3000,
    });
    completeTransaction(true);
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
              handleDeposit();
            }}
          >
            DEPOSIT
          </button>
        </>
      )}

      {isComplete && (
        <Receipt
          type={TransactionType.DEPOSIT}
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

export default DepositPage;
