import { Button } from "@material-ui/core";
import { Formik, Form } from "formik";
import { useState } from "react";
import { InputFieldNumber } from "../helpers/InputFieldNumber";
import MainMenuHeader from "./MainMenuHeader";
import Receipt, { TransactionType } from "./PrintedReceipt";
import * as yup from "yup";

interface DepositFormProps {
  handleDeposit: (amount: string) => void;
}

const DepositForm: React.FC<DepositFormProps> = (props) => {
  const [isComplete, completeTransaction] = useState(false);

  const validationSchema = yup.object({
    amount: yup.string().required(),
  });

  return (
    <>
      <MainMenuHeader />
      <Formik
        initialValues={{
          amount: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(submitData, { setSubmitting }) => {
          setSubmitting(true);
          props.handleDeposit(submitData.amount);
          completeTransaction(true);
          setSubmitting(false);
        }}
      >
        {({ values, isSubmitting }) => (
          <div className="input-form">
            {!isComplete && (
              <Form>
                <div>
                  <InputFieldNumber
                    name="amount"
                    placeholder="Enter Amount..."
                  />
                </div>
                <div>
                  <Button
                    variant="contained"
                    fullWidth
                    disabled={isSubmitting}
                    type="submit"
                  >
                    SUBMIT
                  </Button>
                </div>
              </Form>
            )}
            {isComplete && (
              <Receipt
                type={TransactionType.DEPOSIT}
                isSuccessful={isComplete ? true : false}
                amount={parseFloat(values.amount)}
              />
            )}
          </div>
        )}
      </Formik>
    </>
  );
};

export default DepositForm;
