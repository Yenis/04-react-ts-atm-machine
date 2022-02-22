import { User } from "../data/currentUser";

interface ReceiptProps {
  type?: string;
  success?: string;
  amount?: number;
  currentUser: User;
}

const Receipt: React.FC<ReceiptProps> = (props) => {
  let today = new Date();

  return (
    <div>
      <h2>Printed Receipt: {today.toLocaleDateString()}</h2>
      <h2>
        Time:{`${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`}
      </h2>
      {props.type && <h3>Transaction Type: {props.type}</h3>}
      {props.success && <h3>Transaction Success: {props.success}</h3>}
      {props.amount && <h3>Amount: {props.amount}.00</h3>}

      {props.amount && props.type === "Deposit" && (
        <h3>
          Previous Balance: {props.currentUser.Balance - props.amount}
          .00
        </h3>
      )}
      {props.amount && props.type === "Withdraw" && (
        <h3>
          Previous Balance: {props.currentUser.Balance + props.amount}
          .00
        </h3>
      )}

      <h3>Current Balance: {props.currentUser.Balance}.00</h3>
    </div>
  );
};

export default Receipt;
