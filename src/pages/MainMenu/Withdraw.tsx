import { Link } from "react-router-dom";
import { useState } from "react";
import { TransactionType } from "../../components/PrintedReceipt";
import { toast, ToastType } from "../../helpers/ToastManager";
import { isTransactionValid } from "../../validation/validateAmount";
import { saveUserTransactionAsync } from "../../data/userData";
import { ActionType, useTransaction } from "../../helpers/transactionsHook";
import WithdrawForm from "../../components/WithdrawForm";

const WithdrawPage: React.FC = () => {
  const [input, setInput] = useState("");
  const [isComplete, completeTransaction] = useState(false);

  const { userTransactions, dispatch } = useTransaction();

  const handleWithdraw = async () => {
    if (typeof userTransactions.balance === "undefined") return;
    if (!userTransactions.cardNumber) return;
    if (!input) return;

    if (isTransactionValid(userTransactions.balance, parseFloat(input))) {
      dispatch({
        type: ActionType.WITHDRAW,
        payload: {
          cardNumber: userTransactions.cardNumber,
          balance: parseFloat(input),
        },
      });

      await saveUserTransactionAsync(userTransactions.cardNumber, {
        cardNumber: userTransactions.cardNumber,
        transactionType: TransactionType.WITHDRAW,
        amount: parseFloat(input),
        date: new Date().toLocaleDateString(),
        time: `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
        balance: userTransactions.balance - parseFloat(input),
      });

      toast.show({
        title: ToastType.SUCCESS,
        content: `Withdrawn ${input} Imaginary Dolars`,
        duration: 3000,
      });
      completeTransaction(true);

    } else {
      toast.show({
        title: ToastType.ERROR,
        content: `Cannot Withdraw More Cash than Available. Current Status is ${userTransactions.balance}`,
        duration: 5000,
      });
    }
  };

  return (
    <>
      <WithdrawForm
        input={input}
        setInput={setInput}
        handleWithdraw={handleWithdraw}
        isComplete={isComplete}
        completeTransaction={completeTransaction}
      />

      <div>
        <Link to="/MainMenu">
          <button>RETURN</button>
        </Link>
      </div>
    </>
  );
};

export default WithdrawPage;
