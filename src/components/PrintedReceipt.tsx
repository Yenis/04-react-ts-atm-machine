import { useCurrentUser } from "../data/currentUser";

export enum TransactionType {
  WITHDRAW = "WITHDRAW",
  DEPOSIT = "DEPOSIT",
}

interface ReceiptProps {
  type?: TransactionType;
  isSuccessful?: boolean;
  amount?: number;
}

const Receipt: React.FC<ReceiptProps> = (props) => {
  const { userContext } = useCurrentUser();
  const currentUser = userContext;

  return (
    <div>
      <h2>Printed Receipt: {new Date().toLocaleDateString()}</h2>

      <h2>
        Time:
        {`${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`}
      </h2>

      {props.isSuccessful && (
        <h3>Transaction Success: {props.isSuccessful ? "true" : "false"}</h3>
      )}

      {props.amount && <h3>Amount: {props.amount}</h3>}

      {props.amount &&
        props.type === TransactionType.DEPOSIT &&
        typeof currentUser.balance !== "undefined" && (
          <h3>Previous balance: {currentUser.balance - props.amount}</h3>
        )}

      {props.amount &&
        props.type === TransactionType.WITHDRAW &&
        typeof currentUser.balance !== "undefined" && (
          <h3>Previous balance: {currentUser.balance + props.amount}</h3>
        )}

      <h3>Current balance: {currentUser.balance}</h3>
    </div>
  );
};

export default Receipt;
