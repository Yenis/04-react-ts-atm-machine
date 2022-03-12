import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { TransactionType } from "../../components/PrintedReceipt";
import { isTransactionValid } from "../../validation/validateAmount";
import { ActionType, useTransaction } from "../../helpers/transactionsHook";
import WithdrawForm from "../../components/WithdrawForm";
import { Button } from "@material-ui/core";
import { Page } from "../../helpers/Links";
import { saveUserTransactionAsync } from "../../data/db_transactions";
import { throwError, throwErrorCannotWithdrawOver, throwMessage, throwMessageTransactionSuccess, } from "../../helpers/ToastMessages";
import { useTranslation } from "react-i18next";

const WithdrawPage: React.FC = () => {

  const [isWithdrawing, toggleWithdraw] = useState(false);
  const [isComplete, completeTransaction] = useState(false);

  const { userTransactions, dispatch } = useTransaction();
  const {t} = useTranslation();

  const navigateTo = useNavigate();

  const handleWithdraw = async (input: string) => {
    if (typeof userTransactions.balance === "undefined") return;
    if (!userTransactions.cardNumber) return;
    if (!input) return;
    if (parseFloat(input) < 0) {
      throwError(t("cannot-withdraw-negative"))
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
      throwMessageTransactionSuccess(t("withdrawn-amount"), input);
      throwMessage(t("transaction-completed"))
      completeTransaction(true);

    } else {
      throwErrorCannotWithdrawOver(t("cannot-withdraw-over-amount"), userTransactions.balance);
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
