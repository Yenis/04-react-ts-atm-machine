import { useNavigate } from "react-router-dom";
import { TransactionType } from "../../components/PrintedReceipt";
import { toast, ToastType } from "../../helpers/ToastManager";
import { saveUserTransactionAsync } from "../../data/userData";
import { ActionType, useTransaction } from "../../helpers/transactionsHook";
import DepositForm from "../../components/DepositForm";
import { Button } from "@material-ui/core";

const DepositPage: React.FC = () => {

  const navigateTo = useNavigate();

  const { userTransactions, dispatch } = useTransaction();

  const handleDeposit = async (input: string) => {
    if (typeof userTransactions.balance === "undefined") return;
    if (!userTransactions.cardNumber) return;
    if (!input) return;
    if (parseFloat(input) < 0) {
      toast.show({
        title: ToastType.ERROR,
        content: `Cannot Deposit Negative Value!`,
        duration: 3000,
      });
      return;
    }

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
      <DepositForm handleDeposit={handleDeposit} />
      <Button onClick={() => navigateTo("/MainMenu")}>RETURN</Button>
    </>
  );
};

export default DepositPage;
