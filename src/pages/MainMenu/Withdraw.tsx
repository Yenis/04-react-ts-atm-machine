import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { TransactionType } from "../../components/PrintedReceipt";
import { toast, ToastType } from "../../helpers/ToastManager";
import { isTransactionValid } from "../../validation/validateAmount";
import { saveUserTransactionAsync } from "../../data/userData";
import { ActionType, useTransaction } from "../../helpers/transactionsHook";
import WithdrawForm from "../../components/WithdrawForm";
import { Button } from "@material-ui/core";

const WithdrawPage: React.FC = () => {
  const [isComplete, completeTransaction] = useState(false);

  const { userTransactions, dispatch } = useTransaction();

  const navigateTo = useNavigate();

  const handleWithdraw = async (input: string) => {
    if (typeof userTransactions.balance === "undefined") return;
    if (!userTransactions.cardNumber) return;
    if (!input) return;
    if (parseFloat(input) < 0) {
      toast.show({
        title: ToastType.ERROR,
        content: `Cannot Withdraw Negative Value!`,
        duration: 3000,
      });
      return;
    }

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
        isComplete={isComplete}
        completeTransaction={completeTransaction}
        handleWithdraw={handleWithdraw}
      />
      <Button onClick={() => navigateTo("/MainMenu")}>RETURN</Button>
    </>
  );
};

export default WithdrawPage;
