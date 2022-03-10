import { Button } from "@material-ui/core";
import { Formik, Form } from "formik";
import { InputFieldNumber } from "../helpers/InputFieldNumber";
import MainMenuHeader from "./MainMenuHeader";
import Receipt, { TransactionType } from "./PrintedReceipt";
import * as yup from "yup";
import { saveUserPinStateAsync } from "../data/db_pins";
import { toast, ToastType } from "../helpers/ToastManager";
import { isPinValid } from "../validation/validatePIN";
import { isInputPinCorrect } from "../validation/validatePinCorrect";
import { useUserPin } from "../helpers/userPinHook";
import { InputFieldPassword } from "../helpers/InputFieldPassword";

interface WithdrawFormProps {
  isWithdrawing: boolean;
  toggleWithdraw: React.Dispatch<React.SetStateAction<boolean>>;
  isComplete: boolean;
  handleWithdraw: (amount: string) => void;
  completeTransaction: React.Dispatch<React.SetStateAction<boolean>>;
}

const WithdrawForm: React.FC<WithdrawFormProps> = (props) => {
  const { userPinState, setPinState } = useUserPin();

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
            props.handleWithdraw(submitData.amount);
          }
          setSubmitting(false);
        }}
      >
        {({ values, isSubmitting }) => (
          <div className="input-form">
            {!props.isComplete && (
              <Form>
                <InputFieldNumber name="amount" placeholder="Enter Amount..." />
                {!props.isWithdrawing && (
                  <Button
                    variant="contained"
                    disabled={isSubmitting}
                    fullWidth
                    onClick={() => {
                      if (values.amount) props.toggleWithdraw(true);
                    }}
                  >
                    SUBMIT
                  </Button>
                )}
                {props.isWithdrawing && (
                  <div>
                    <InputFieldPassword name="pinInput" placeholder="ENTER PIN" />
                    <Button
                      variant="contained"
                      color="secondary"
                      disabled={isSubmitting}
                      fullWidth
                      type="submit"
                    >
                      WITHDRAW {values.amount}
                    </Button>
                  </div>
                )}
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
