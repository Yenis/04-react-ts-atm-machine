import { Link } from "react-router-dom";
import { useState } from "react";
import { TransactionType } from "../../components/PrintedReceipt";
import { toast, ToastType } from "../../helpers/ToastManager";
import { saveUserTransactionAsync } from "../../data/userData";
import { ActionType, useTransaction } from "../../helpers/transactionsHook";
import DepositForm from "../../components/DepositForm";

const DepositPage: React.FC = () => {
  const [input, setInput] = useState("");

  const { userTransactions, dispatch } = useTransaction();

  const handleDeposit = async () => {
    if (typeof userTransactions.balance === "undefined") return;
    if (!userTransactions.cardNumber) return;
    if (!input) return;

    dispatch({
      type: ActionType.DEPOSIT,
      payload: {
        cardNumber: userTransactions.cardNumber,
        balance: parseFloat(input),
      },
    });

    await saveUserTransactionAsync(userTransactions.cardNumber, {
      cardNumber: userTransactions.cardNumber,
      transactionType: TransactionType.DEPOSIT,
      amount: parseFloat(input),
      date: new Date().toLocaleDateString(),
      time: `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
      balance: userTransactions.balance + parseFloat(input),
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
