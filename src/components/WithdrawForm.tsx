import { Button } from "@material-ui/core";
import { Formik, Form } from "formik";
import { InputFieldNumber } from "../helpers/InputFieldNumber";
import MainMenuHeader from "./MainMenuHeader";
import Receipt, { TransactionType } from "./PrintedReceipt";
import * as yup from "yup";

interface WithdrawFormProps {
  isComplete: boolean;
  completeTransaction: React.Dispatch<React.SetStateAction<boolean>>
  handleWithdraw: (amount: string) => void;
}

const WithdrawForm: React.FC<WithdrawFormProps> = (props) => {

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
          props.handleWithdraw(submitData.amount);
          setSubmitting(false);
        }}
      >
        {({ values, isSubmitting }) => (
          <div className="input-form">
            {!props.isComplete && (
              <Form>
                <div>
                  <InputFieldNumber
                    name="amount"
                    placeholder="Enter Amount..."
                  />
                </div>
                <div>
                  <Button variant="contained" fullWidth disabled={isSubmitting} type="submit">
                    SUBMIT
                  </Button>
                </div>
              </Form>
            )}
            {props.isComplete && (
              <Receipt
                type={TransactionType.WITHDRAW}
                isSuccessful={props.isComplete ? true : false}
                amount={parseFloat(values.amount)}
              />
            )}
          </div>
        )}
      </Formik>
    </>
  );
};

export default WithdrawForm;
