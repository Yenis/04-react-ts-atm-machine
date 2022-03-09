import { useTransaction } from "../helpers/transactionsHook";

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

const Receipt: React.FC<ReceiptProps> = (props) => {
  const { userTransactions } = useTransaction();

  return (
    <div className="printed-receipt">
      <h2>Printed Receipt: {new Date().toLocaleDateString()}</h2>

      <h2>
        Time:
        {`${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`}
      </h2>

      {props.isSuccessful && (
        <h3>Transaction Success: {props.isSuccessful ? "true" : "false"}</h3>
      )}

      {props.amount && <h3>Amount: {props.amount}</h3>}

      {props.type === TransactionType.DEPOSIT &&
        typeof props.amount !== "undefined" &&
        typeof userTransactions.balance !== "undefined" && (
          <h3>Previous balance: {userTransactions.balance - props.amount}</h3>
        )}

      {props.type === TransactionType.WITHDRAW &&
        typeof props.amount !== "undefined" &&
        typeof userTransactions.balance !== "undefined" && (
          <h3>Previous balance: {userTransactions.balance + props.amount}</h3>
        )}

      <h3>Current balance: {userTransactions.balance}</h3>
    </div>
  );
};

export default Receipt;
