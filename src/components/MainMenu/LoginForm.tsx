import { useState } from "react";
import { Formik, Form } from "formik";
import { InputField } from "../InputField";
import { InputFieldPassword } from "../InputFieldPassword";
import { ButtonInsertCard, ButtonLogin } from "../VariousButtons";
import { useTranslation } from "react-i18next";
import * as yup from "yup";

interface LoginFormProps {
  handleLoginUser: (cardInput: string, pinInput: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = (props) => {
  const [isCardInserted, toggleInsertCard] = useState(false);
  const { t } = useTranslation();

  const validationSchema = yup.object({
    cardInput: yup.string()
      .min(16, t("card-input-length"))
      .max(16, t("card-input-length"))
      .required(t("required-field")),
    pinInput: yup.string()
      .min(5, t("pin-input-length"))
      .max(5, t("pin-input-length"))
      .required(t("required-field"))
  });

  return (
    <Formik
      validateOnChange={true}
      initialValues={{
        cardInput: "",
        pinInput: "",
      }}
      validationSchema={validationSchema}

      onSubmit={(submitData, { setSubmitting }) => {
        setSubmitting(true);
        props.handleLoginUser(submitData.cardInput, submitData.pinInput);
        setSubmitting(false);
      }}
    >
      {({ values, isSubmitting }) => (
        <Form>
          <div>
            <InputField
              name="cardInput"   
              placeholder={t("card-length")}
            />
          </div>
          {!isCardInserted && (
            <ButtonInsertCard
              disabled={isSubmitting}
              onClick={() => {if (values.cardInput) toggleInsertCard(true)}}
            >
              {t("insert-card")}
            </ButtonInsertCard>
          )}
          {isCardInserted && (
            <div>
              <InputFieldPassword
                name="pinInput"
                placeholder={t("pin-length")}
              />
              <ButtonLogin
                disabled={isSubmitting}
                type="submit"
              >
                {t("login-button")}
              </ButtonLogin>
            </div>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
