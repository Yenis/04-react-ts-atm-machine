import { User } from "../data/currentUser";

export let dateToday = new Date()
export let timeNow = `${dateToday.getHours()}:${dateToday.getMinutes()}:${dateToday.getSeconds()}`;

export enum TransactionType {
  WITHDRAW = 'WITHDRAW',
  DEPOSIT = 'DEPOSIT'
}

interface ReceiptProps {
  type?: TransactionType;
  isSuccessful?: boolean;
  amount?: number;
  currentUser: User;
}

const Receipt: React.FC<ReceiptProps> = (props) => {
  let today = dateToday;

  return (
    <div>
      <h2>Printed Receipt: {today.toLocaleDateString()}</h2>
      <h2>
        Time:{`${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`}
      </h2>
      {props.isSuccessful && <h3>Transaction Success: {props.isSuccessful ? "true" : "false"}</h3>}
      {props.amount && <h3>Amount: {props.amount}.00</h3>}

      {props.amount && props.type === TransactionType.DEPOSIT && typeof props.currentUser.balance !== "undefined" && (
        <h3>
          Previous balance: {props.currentUser.balance - props.amount}
          .00
        </h3>
      )}
      {props.amount && props.type === TransactionType.WITHDRAW && typeof props.currentUser.balance !== "undefined" &&  (
        <h3>
          Previous balance: {props.currentUser.balance + props.amount}
          .00
        </h3>
      )}

      <h3>Current balance: {props.currentUser.balance}.00</h3>
    </div>
  );
};

export default Receipt;
