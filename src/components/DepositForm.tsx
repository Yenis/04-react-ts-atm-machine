import { Button } from "@material-ui/core";
import { Formik, Form } from "formik";
import { useRef, useState } from "react";
import { InputFieldNumber } from "../helpers/InputFieldNumber";
import MainMenuHeader from "./MainMenuHeader";
import Receipt, { TransactionType } from "./PrintedReceipt";
import * as yup from "yup";

interface DepositFormProps {
  handleDeposit: (arg0: string) => void;
}

const DepositForm: React.FC<DepositFormProps> = (props) => {

  const input = useRef("0");
  const [isComplete, completeTransaction] = useState(false);

  const validationSchema = yup.object({
    amount: yup.string().required(),
  });

  return (
    <>
      {!isComplete && (
        <>
          <MainMenuHeader />
          <Formik
            initialValues={{
              amount: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(submitData, { setSubmitting }) => {
              setSubmitting(true);
              input.current = submitData.amount;
              props.handleDeposit(submitData.amount);
              if (parseFloat(input.current) > 0) 
                completeTransaction(true);
              setSubmitting(false);
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <div>
                  <InputFieldNumber
                    name="amount"
                    placeholder="Enter Amount..."
                  />
                </div>
                <div>
                  <Button disabled={isSubmitting} type="submit">
                    SUBMIT
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </>
      )}
      {isComplete && (
        <Receipt
          type={TransactionType.DEPOSIT}
          isSuccessful={isComplete ? true : false}
          amount={parseFloat(input.current)}
        />
      )}
    </>
  );
};

export default DepositForm;
