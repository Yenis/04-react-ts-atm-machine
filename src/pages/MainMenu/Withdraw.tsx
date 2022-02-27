import { ActionType, useCurrentUser } from "../../data/currentUser";
import { useState } from "react";
import { TransactionType } from "../../components/PrintedReceipt";
import { hasEnoughMoney } from "../../validation/validateAmount";
import { Link } from "react-router-dom";
import { toast, ToastType } from "../../helpers/ToastManager";
import { saveUserTransactionAsync } from "../../data/userData";
import WithdrawForm from "../../components/WithdrawForm";

const WithdrawPage: React.FC = () => {
  const [input, setInput] = useState("");

  const { dispatch, userContext } = useCurrentUser();
  const currentUser = userContext;

  const handleWithdraw = async () => {
    if (!currentUser.cardNumber) return;
    if (!currentUser.balance) return;
    if (!input) return;

    if (hasEnoughMoney(currentUser.balance, parseFloat(input))) {
      currentUser.balance = currentUser.balance - parseFloat(input);

      dispatch({ type: ActionType.WITHDRAW, payload: { ...currentUser } });

      await saveUserTransactionAsync(currentUser.cardNumber, {
        transactionType: TransactionType.WITHDRAW,
        amount: parseFloat(input),
        date: new Date().toLocaleDateString(),
        time: `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
        balance: currentUser.balance,
      });

      toast.show({
        title: ToastType.SUCCESS,
        content: `Withdrawn ${input} Imaginary Dolars`,
        duration: 3000,
      });
    } else {
      toast.show({
        title: ToastType.ERROR,
        content: `Cannot Withdraw More Cash than Available. Current Status is ${currentUser.balance}`,
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
