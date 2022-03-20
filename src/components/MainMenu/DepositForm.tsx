import { useState } from "react";
import { Formik, Form } from "formik";
import { InputFieldNumber } from "../InputFieldNumber";
import { InputFieldPassword } from "../InputFieldPassword";
import { ButtonDeposit, ButtonSubmit } from "../VariousButtons";
import PrintedReceipt, { TransactionType } from "./PrintedReceipt";
import { useUserPin } from "../../helpers/customHooks/userPinHook";
import { isPinValid } from "../../validation/validatePIN";
import { isInputPinCorrect } from "../../validation/validatePinCorrect";
import { handleWrongPinInput } from "../../helpers/handleWrongPinInput";
import { throwError } from "../../helpers/toastr/ToastMessages";
import { useTranslation } from "react-i18next";
import * as yup from "yup";

interface DepositFormProps {
  handleDeposit: (amount: string) => void;
}

const DepositForm: React.FC<DepositFormProps> = (props) => {
  const { userPinState, setPinState } = useUserPin();
  const { t } = useTranslation();

  const [isDepositing, toggleDeposit] = useState(false);
  const [isComplete, completeTransaction] = useState(false);

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
    amount: yup.string().required(t("required-field")),
    pinInput: yup.string()
      .min(5, t("pin-input-length"))
      .max(5, t("pin-input-length"))
      .required(t("required-field"))
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
                <InputFieldNumber name="amount" placeholder={t("enter-amount")} />
                {!isDepositing && (
                  <ButtonSubmit
                    disabled={isSubmitting}
                    onClick={() => {if (values.amount) toggleDeposit(true)}}
                  >
                    {t("submit")}
                  </ButtonSubmit>
                )}
                {isDepositing && (
                  <div>
                    <InputFieldPassword
                      name="pinInput"
                      placeholder={t("enter-pin")}
                    />
                    <ButtonDeposit
                      disabled={isSubmitting}
                      type="submit"
                    >
                      {t("deposit")} {values.amount}
                    </ButtonDeposit>
                  </div>
                )}
              </Form>
            )}
            {isComplete && (
              <PrintedReceipt
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
