import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { TransactionType } from "../../components/PrintedReceipt";
import { toast, ToastType } from "../../helpers/ToastManager";
import { isTransactionValid } from "../../validation/validateAmount";
import { ActionType, useTransaction } from "../../helpers/transactionsHook";
import WithdrawForm from "../../components/WithdrawForm";
import { Button } from "@material-ui/core";
import { Page } from "../../helpers/Links";
import { saveUserTransactionAsync } from "../../data/db_transactions";

const WithdrawPage: React.FC = () => {

  const [isWithdrawing, toggleWithdraw] = useState(false);
  const [isComplete, completeTransaction] = useState(false);

  const { userTransactions, dispatch } = useTransaction();

  const navigateTo = useNavigate();

  const handleWithdraw = async (input: string) => {
    if (typeof userTransactions.balance === "undefined") return;
    if (!userTransactions.cardNumber) return;
    if (!input) return;
    if (parseFloat(input) < 0) {
      toast.show({
        type: ToastType.ERROR,
        content: `Cannot Withdraw Negative Value!`,
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
        type: ToastType.SUCCESS,
        content: `Withdrawn ${input} Imaginary Dolars`,
      });
      completeTransaction(true);
    } else {
      toast.show({
        type: ToastType.ERROR,
        content: `Cannot Withdraw More Cash than Available. Current Status is ${userTransactions.balance}`,
      });
      toggleWithdraw(false);
    }
  };

  return (
    <>
      <WithdrawForm
        isWithdrawing={isWithdrawing}
        toggleWithdraw={toggleWithdraw}
        isComplete={isComplete}
        completeTransaction={completeTransaction}
        handleWithdraw={handleWithdraw}
      />
      <Button variant="outlined" fullWidth onClick={() => navigateTo(Page.MAIN)}>RETURN</Button>
    </>
  );
};

export default WithdrawPage;
