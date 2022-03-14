import { useState } from "react";
import { TransactionType } from "../../components/PrintedReceipt";
import { isTransactionPossible } from "../../validation/validateAmount";
import {
  ActionType,
  useTransaction,
} from "../../helpers/customHooks/transactionsHook";
import WithdrawForm from "../../components/WithdrawForm";
import { Page } from "../../helpers/pageLinks";
import { saveUserTransactionAsync } from "../../data/db_transactions";
import {
  throwError,
  throwErrorCannotWithdrawOver,
  throwMessage,
  throwMessageTransactionSuccess,
} from "../../helpers/toastr/ToastMessages";
import { useTranslation } from "react-i18next";
import { ButtonOutlined } from "../../components/ButtonsOutlined";
import { useNavigation } from "../../helpers/customHooks/navigationHook";

const WithdrawPage: React.FC = () => {
  const [isWithdrawing, toggleWithdraw] = useState(false);
  const [isComplete, completeTransaction] = useState(false);

  const { userTransactions, dispatch } = useTransaction();
  const { t } = useTranslation();

  const navigateTo = useNavigation();

  const handleWithdraw = async (input: string) => {
    if (typeof userTransactions.balance === "undefined") return;
    if (!userTransactions.cardNumber) return;
    if (!input) return;
    if (parseFloat(input) < 0) {
      throwError(t("cannot-withdraw-negative"));
      return;
    }

    if (isTransactionPossible(userTransactions.balance, parseFloat(input))) {
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
      throwMessage(t("transaction-completed"));
      completeTransaction(true);
    } else {
      throwErrorCannotWithdrawOver(
        t("cannot-withdraw-over-amount"),
        userTransactions.balance
      );
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
      <div className="home-page-buttons">
        <ButtonOutlined onClick={() => navigateTo(Page.MAIN)}>
          {t("return")}
        </ButtonOutlined>
      </div>
    </>
  );
};

export default WithdrawPage;
