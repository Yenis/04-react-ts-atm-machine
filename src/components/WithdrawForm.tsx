import MainMenuHeader from "./MainMenuHeader";
import Receipt, { TransactionType } from "./PrintedReceipt";

interface WithdrawFormProps {
  input: string | number | readonly string[] | undefined;
  setInput: (arg0: string) => void;
  handleWithdraw: () => void;
  isComplete: boolean,
  completeTransaction: (arg0: boolean) => void
}

const WithdrawForm: React.FC<WithdrawFormProps> = (props) => {

  return (
    <>
      {!props.isComplete && (
        <>
          <MainMenuHeader />
          <input
            type="number"
            value={props.input}
            min={0}
            placeholder="Enter Amount..."
            onChange={(e) => props.setInput(e.target.value)}
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              props.handleWithdraw();
            }}
          >
            WITHDRAW
          </button>
        </>
      )}

      {props.isComplete && (
        <Receipt
          type={TransactionType.WITHDRAW}
          isSuccessful={props.isComplete ? true : false}
          amount={typeof props.input === "string" ? parseFloat(props.input) : 0}
        />
      )}
    </>
  );
};

export default WithdrawForm;
