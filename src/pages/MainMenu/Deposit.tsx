import { useNavigate } from "react-router-dom";
import { TransactionType } from "../../components/PrintedReceipt";
import {
  ActionType,
  useTransaction,
} from "../../helpers/customHooks/transactionsHook";
import DepositForm from "../../components/DepositForm";
import { Button } from "@material-ui/core";
import { Page } from "../../helpers/pageLinks";
import { saveUserTransactionAsync } from "../../data/db_transactions";
import {
  throwError,
  throwMessage,
  throwMessageTransactionSuccess,
} from "../../helpers/toastr/ToastMessages";
import { useTranslation } from "react-i18next";

const DepositPage: React.FC = () => {
  const { userTransactions, dispatch } = useTransaction();
  const navigateTo = useNavigate();
  const { t } = useTranslation();

  const handleDeposit = async (input: string) => {
    if (typeof userTransactions.balance === "undefined") return;
    if (!userTransactions.cardNumber) return;
    if (!input) return;
    if (parseFloat(input) < 0) {
      throwError(t("cannot-deposit-negative"));
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

    throwMessageTransactionSuccess(t("deposited-amount"), input);
    throwMessage(t("transaction-completed"));
  };

  return (
    <>
      <DepositForm handleDeposit={handleDeposit} />
      <Button
        variant="outlined"
        fullWidth
        onClick={() => navigateTo(Page.MAIN)}
      >
        {t("return")}
      </Button>
    </>
  );
};

export default DepositPage;
