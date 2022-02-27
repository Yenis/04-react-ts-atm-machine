import { useState } from "react";
import MainMenuHeader from "./MainMenuHeader";
import Receipt, { TransactionType } from "./PrintedReceipt";

interface DepositFormProps {
  input: string | number | readonly string[] | undefined;
  setInput: (arg0: string) => void;
  handleDeposit: () => void;
}

const DepositForm: React.FC<DepositFormProps> = (props) => {
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
              props.handleDeposit();
              completeTransaction(true);
            }}
          >
            DEPOSIT
          </button>
        </>
      )}

      {isComplete && (
        <Receipt
          type={TransactionType.DEPOSIT}
          isSuccessful={isComplete ? true : false}
          amount={typeof props.input === "string" ? parseFloat(props.input) : 0}
        />
      )}
    </>
  );
};

export default DepositForm;
