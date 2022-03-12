import { Button } from "@material-ui/core";
import { Formik, Form } from "formik";
import { InputFieldNumber } from "./InputFieldNumber";
import MainMenuHeader from "./MainMenuHeader";
import Receipt, { TransactionType } from "./PrintedReceipt";
import * as yup from "yup";
import { isPinValid } from "../validation/validatePIN";
import { isInputPinCorrect } from "../validation/validatePinCorrect";
import { useUserPin } from "../helpers/userPinHook";
import { InputFieldPassword } from "./InputFieldPassword";
import { throwError } from "../helpers/ToastMessages";
import { handleWrongPinInput } from "../errors/handleWrongPinInput";
import { useTranslation } from "react-i18next";
import Dispenser from "./Dispenser";

interface WithdrawFormProps {
  isWithdrawing: boolean;
  toggleWithdraw: React.Dispatch<React.SetStateAction<boolean>>;
  isComplete: boolean;
  handleWithdraw: (amount: string) => void;
  completeTransaction: React.Dispatch<React.SetStateAction<boolean>>;
}

const WithdrawForm: React.FC<WithdrawFormProps> = (props) => {
  const { userPinState, setPinState } = useUserPin();
  const {t} = useTranslation();

  const validateIsInputPinCorrect = async (pinInput?: string) => {
    let isPinInputCorrect;

    if (!userPinState.cardNumber) {
      throwError(t("invalid-card"))
      return;
    }

    if (!pinInput || !isPinValid(pinInput)) {
      throwError(t("invalid-pin"))
      return;
    }

    if (userPinState.pin && !isInputPinCorrect(pinInput, userPinState.pin)) {
      throwError(t("wrong-pin"))

      let pinStateOnError = await handleWrongPinInput(userPinState.cardNumber, userPinState)
      setPinState(pinStateOnError);
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
              <>
              <Receipt
                type={TransactionType.WITHDRAW}
                isSuccessful={props.isComplete ? true : false}
                amount={parseFloat(values.amount)}
              />
              <Dispenser amount={parseFloat(values.amount)} />
              </>
            )}
          </div>
        )}
      </Formik>
    </>
  );
};

export default WithdrawForm;
