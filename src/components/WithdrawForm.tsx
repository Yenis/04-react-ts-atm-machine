import { useState } from "react";
import MainMenuHeader from "./MainMenuHeader";
import Receipt, { TransactionType } from "./PrintedReceipt";

interface WithdrawFormProps {
  input: string | number | readonly string[] | undefined;
  setInput: (arg0: string) => void;
  handleWithdraw: () => void;
}

const WithdrawForm: React.FC<WithdrawFormProps> = (props) => {
  const [isComplete, completeTransaction] = useState(false);

  return (
    <>
      {!isComplete && (
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
              completeTransaction(true);
            }}
          >
            WITHDRAW
          </button>
        </>
      )}

      {isComplete && (
        <Receipt
          type={TransactionType.WITHDRAW}
          isSuccessful={isComplete ? true : false}
          amount={typeof props.input === "string" ? parseFloat(props.input) : 0}
        />
      )}
    </>
  );
};

export default WithdrawForm;
