import { Button } from "@material-ui/core";
import { Formik, Form } from "formik";
import { useState } from "react";
import { InputFieldNumber } from "../helpers/InputFieldNumber";
import MainMenuHeader from "./MainMenuHeader";
import Receipt, { TransactionType } from "./PrintedReceipt";
import * as yup from "yup";
import { useUserPin } from "../helpers/userPinHook";
import { saveUserPinStateAsync } from "../data/db_pins";
import { toast, ToastType } from "../helpers/ToastManager";
import { isPinValid } from "../validation/validatePIN";
import { isInputPinCorrect } from "../validation/validatePinCorrect";
import { InputFieldPassword } from "../helpers/InputFieldPassword";

interface DepositFormProps {
  handleDeposit: (amount: string) => void;
}

const DepositForm: React.FC<DepositFormProps> = (props) => {
  const { userPinState, setPinState } = useUserPin();

  const [isDepositing, toggleDeposit] = useState(false);
  const [isComplete, completeTransaction] = useState(false);

  const validateIsInputPinCorrect = async (pinInput?: string) => {
    let isPinInputCorrect;
    if (!pinInput || !isPinValid(pinInput)) {
      toast.show({
        type: ToastType.ERROR,
        content: "Input PIN is not valid!",
      });
      return;
    }

    if (userPinState.pin && !isInputPinCorrect(pinInput, userPinState.pin)) {
      toast.show({
        type: ToastType.ERROR,
        content: "Provided PIN is wrong!",
      });

      const newPinState = {
        ...userPinState,
        remainingPinAttempts: userPinState.remainingPinAttempts - 1,
      };

      await saveUserPinStateAsync(userPinState.cardNumber, newPinState);
      setPinState(newPinState);
      isPinInputCorrect = false;
    } else {
      isPinInputCorrect = true;
    }
    return isPinInputCorrect;
  };

  const validationSchema = yup.object({
    amount: yup.string().required(),
    pinInput: yup.string().min(5).max(5),
  });

  return (
    <>
      <MainMenuHeader />
      <Formik
        initialValues={{
          amount: "",
          pinInput: "",
        }}
        validationSchema={validationSchema}
        onSubmit={async (submitData, { setSubmitting }) => {
          setSubmitting(true);
          if (await validateIsInputPinCorrect(submitData.pinInput)) {
            props.handleDeposit(submitData.amount);
            completeTransaction(true);
          }
          setSubmitting(false);
        }}
      >
        {({ values, isSubmitting }) => (
          <div className="input-form">
            {!isComplete && (
              <Form>
                <InputFieldNumber name="amount" placeholder="Enter Amount..." />
                {!isDepositing && (
                  <Button
                    variant="contained"
                    disabled={isSubmitting}
                    fullWidth
                    onClick={() => {
                      if (values.amount) toggleDeposit(true);
                    }}
                  >
                    SUBMIT
                  </Button>
                )}
                {isDepositing && (
                  <div>
                    <InputFieldPassword name="pinInput" placeholder="ENTER PIN" />
                    <Button
                      variant="contained"
                      color="primary"
                      disabled={isSubmitting}
                      fullWidth
                      type="submit"
                    >
                      DEPOSIT {values.amount}
                    </Button>
                  </div>
                )}
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
