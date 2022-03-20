import { useState } from "react";
import {
  ActionType,
  useTransaction,
} from "../../helpers/customHooks/transactionsHook";
import { TransactionType } from "../../components/MainMenu/PrintedReceipt";
import { isTransactionPossible } from "../../validation/validateAmount";
import WithdrawForm from "../../components/MainMenu/WithdrawForm";
import { Page } from "../../helpers/pageLinks";
import { saveUserTransactionAsync } from "../../data/db_transactions";
import {
  throwError,
  throwErrorCannotWithdrawOver,
  throwMessage,
  throwMessageTransactionSuccess,
} from "../../helpers/toastr/ToastMessages";
import { useTranslation } from "react-i18next";
import { ButtonReturnOut } from "../../components/VariousButtons";
import { useNavigation } from "../../helpers/customHooks/navigationHook";
import { getDateTimeUtc } from "../../helpers/getDateTimeUTC";
import { transactionStore } from "../../data/transactionStore";
import withAuth from "../../helpers/userAuthenticationHOC";

const WithdrawPage: React.FC = () => {
  const [isWithdrawing, toggleWithdraw] = useState(false);
  const [isComplete, completeTransaction] = useState(false);

  const { userTransactions, dispatch } = useTransaction();
  const navigateTo = useNavigation();
  const { t } = useTranslation();

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
        transactionTime: getDateTimeUtc(),
        balance: userTransactions.balance - parseFloat(input),
      });

      await transactionStore.assignTotalCashAmountAsync();

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
        <ButtonReturnOut onClick={() => navigateTo(Page.MAIN)}>
          {t("return")}
        </ButtonReturnOut>
      </div>
    </>
  );
};

export default withAuth(WithdrawPage);
