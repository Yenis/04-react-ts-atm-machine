import {
  ActionType,
  useTransaction,
} from "../../helpers/customHooks/transactionsHook";
import { TransactionType } from "../../components/MainMenu/PrintedReceipt";
import DepositForm from "../../components/MainMenu/DepositForm";
import { Page } from "../../helpers/pageLinks";
import { saveUserTransactionAsync } from "../../data/db_transactions";
import {
  throwError,
  throwMessage,
  throwMessageTransactionSuccess,
} from "../../helpers/toastr/ToastMessages";
import { useTranslation } from "react-i18next";
import { ButtonReturnOut } from "../../components/VariousButtons";
import { useNavigation } from "../../helpers/customHooks/navigationHook";
import { getDateTimeUtc } from "../../helpers/getDateTimeUTC";
import { transactionStore } from "../../data/transactionStore";
import withAuth from "../../helpers/userAuthenticationHOC";

const DepositPage: React.FC = () => {
  const { userTransactions, dispatch } = useTransaction();
  const navigateTo = useNavigation();
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
      transactionTime: getDateTimeUtc(),
      balance: userTransactions.balance + parseFloat(input),
    });

    await transactionStore.assignTotalCashAmountAsync();

    throwMessageTransactionSuccess(t("deposited-amount"), input);
    throwMessage(t("transaction-completed"));
  };

  return (
    <>
      <DepositForm handleDeposit={handleDeposit} />
      <div className="home-page-buttons">
        <ButtonReturnOut onClick={() => navigateTo(Page.MAIN)}>
          {t("return")}
        </ButtonReturnOut>
      </div>
    </>
  );
};

export default withAuth(DepositPage);
