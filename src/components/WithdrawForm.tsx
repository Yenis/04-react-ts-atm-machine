import { Formik, Form } from "formik";
import { InputFieldNumber } from "./InputFieldNumber";
import PrintedReceipt, { TransactionType } from "./PrintedReceipt";
import * as yup from "yup";
import { isPinValid } from "../validation/validatePIN";
import { isInputPinCorrect } from "../validation/validatePinCorrect";
import { useUserPin } from "../helpers/customHooks/userPinHook";
import { InputFieldPassword } from "./InputFieldPassword";
import { throwError } from "../helpers/toastr/ToastMessages";
import { handleWrongPinInput } from "../helpers/handleWrongPinInput";
import { useTranslation } from "react-i18next";
import Dispenser from "./Dispenser";
import { ButtonPrim } from "./ButtonsContained";

interface WithdrawFormProps {
  isWithdrawing: boolean;
  toggleWithdraw: React.Dispatch<React.SetStateAction<boolean>>;
  isComplete: boolean;
  handleWithdraw: (amount: string) => void;
  completeTransaction: React.Dispatch<React.SetStateAction<boolean>>;
}

const WithdrawForm: React.FC<WithdrawFormProps> = (props) => {
  const { userPinState, setPinState } = useUserPin();
  const { t } = useTranslation();

  const validateIsInputPinCorrect = async (pinInput?: string) => {
    let isPinInputCorrect;

    if (!userPinState.cardNumber) {
      throwError(t("invalid-card"));
      return;
    }

    if (!pinInput || !isPinValid(pinInput)) {
      throwError(t("invalid-pin"));
      return;
    }

    if (userPinState.pin && !isInputPinCorrect(pinInput, userPinState.pin)) {
      throwError(t("wrong-pin"));

      let pinStateOnError = await handleWrongPinInput(
        userPinState.cardNumber,
        userPinState
      );
      setPinState(pinStateOnError);
      isPinInputCorrect = false;
    } else {
      isPinInputCorrect = true;
    }
    return isPinInputCorrect;
  };

  const validationSchema = yup.object({
    amount: yup.string().required(t("required-field"))
  });

  return (
    <>
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
                <InputFieldNumber name="amount" placeholder={t("enter-amount")} />
                {!props.isWithdrawing && (
                  <ButtonPrim
                    disabled={isSubmitting}
                    onClick={() => {if (values.amount) props.toggleWithdraw(true)}}
                  >
                    {t("submit")}
                  </ButtonPrim>
                )}
                {props.isWithdrawing && (
                  <div>
                    <InputFieldPassword name="pinInput" placeholder={t("enter-pin")} />
                    <ButtonPrim
                      color="secondary"
                      disabled={isSubmitting}
                      type="submit"
                    >
                      {t("withdraw")} {values.amount}
                    </ButtonPrim>
                  </div>
                )}
              </Form>
            )}
            {props.isComplete && (
              <>
                <PrintedReceipt
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
