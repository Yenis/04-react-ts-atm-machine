import { Button } from "@material-ui/core";
import { Formik, Form } from "formik";
import { useRef } from "react";
import { InputFieldNumber } from "../helpers/InputFieldNumber";
import MainMenuHeader from "./MainMenuHeader";
import Receipt, { TransactionType } from "./PrintedReceipt";
import * as yup from "yup";

interface WithdrawFormProps {
  isComplete: boolean;
  completeTransaction: (arg0: boolean) => void;
  handleWithdraw: (arg0: string) => void;
}

const WithdrawForm: React.FC<WithdrawFormProps> = (props) => {
  const input = useRef("0");

  const validationSchema = yup.object({
    amount: yup.string().required(),
  });

  return (
    <>
      {!props.isComplete && (
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
              props.handleWithdraw(submitData.amount);
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
      {props.isComplete && (
        <Receipt
          type={TransactionType.WITHDRAW}
          isSuccessful={props.isComplete ? true : false}
          amount={parseFloat(input.current)}
        />
      )}
    </>
  );
};

export default WithdrawForm;
