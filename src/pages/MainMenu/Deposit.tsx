import { ActionType, useCurrentUser } from "../../data/currentUser";
import { useState } from "react";
import { TransactionType } from "../../components/PrintedReceipt";

import { Link } from "react-router-dom";
import { toast, ToastType } from "../../helpers/ToastManager";
import { saveUserTransactionAsync } from "../../data/userData";
import DepositForm from "../../components/DepositForm";

const DepositPage: React.FC = () => {
  const [input, setInput] = useState("");

  const { dispatch, userContext } = useCurrentUser();
  const currentUser = userContext;

  const handleDeposit = async () => {
    if (!currentUser.cardNumber) return;
    if (!currentUser.balance) return;
    if (!input) return;

    currentUser.balance = currentUser.balance + parseFloat(input);

    dispatch({ type: ActionType.DEPOSIT, payload: { ...currentUser } });

    await saveUserTransactionAsync(currentUser.cardNumber, {
      transactionType: TransactionType.DEPOSIT,
      amount: parseFloat(input),
      date: new Date().toLocaleDateString(),
      time: `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
      balance: currentUser.balance,
    });

    toast.show({
      title: ToastType.SUCCESS,
      content: `Deposited ${input} Imaginary Dolars`,
      duration: 3000,
    });
  };

  return (
    <>
      <DepositForm
        input={input}
        setInput={setInput}
        handleDeposit={handleDeposit}
      />
      <div>
        <Link to="/MainMenu">
          <button>RETURN</button>
        </Link>
      </div>
    </>
  );
};

export default DepositPage;
