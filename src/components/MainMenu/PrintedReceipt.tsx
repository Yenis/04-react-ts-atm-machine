import { useTranslation } from "react-i18next";
import { useTransaction } from "../../helpers/customHooks/transactionsHook";

export enum TransactionType {
  WITHDRAW = "WITHDRAW",
  DEPOSIT = "DEPOSIT",
  INIT = "INIT"
}

interface ReceiptProps {
  type?: TransactionType;
  isSuccessful?: boolean;
  amount?: number;
}

const PrintedReceipt: React.FC<ReceiptProps> = (props) => {
  const { userTransactions } = useTransaction();
  const { t } = useTranslation();

  return (
    <div className="printed-receipt">
      <h2>{t("printed-receipt")} {new Date().toLocaleDateString()}</h2>
      
      <h2>{t("time")}</h2>
      <h2>{`${new Date().toUTCString()}`}</h2>

      {props.isSuccessful && (
        <h3>{t("transaction-success")} {props.isSuccessful ? "true" : "false"}</h3>
      )}

      {props.amount && <h3>{t("amount")} {props.amount}</h3>}

      {props.type === TransactionType.DEPOSIT &&
        typeof props.amount !== "undefined" &&
        typeof userTransactions.balance !== "undefined" && (
          <h3>{t("previous-balance")} {userTransactions.balance - props.amount}</h3>
        )}

      {props.type === TransactionType.WITHDRAW &&
        typeof props.amount !== "undefined" &&
        typeof userTransactions.balance !== "undefined" && (
          <h3>{t("previous-balance")} {userTransactions.balance + props.amount}</h3>
        )}

      <h3>{t("current-balance")} {userTransactions.balance}</h3>
    </div>
  );
};

export default PrintedReceipt;
