import { Formik, Form } from "formik";
import { Button } from "@material-ui/core";
import { InputField } from "./InputField";
import * as yup from "yup";
import { InputFieldPassword } from "./InputFieldPassword";
import { useState } from "react";
import { useTranslation } from "react-i18next";

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
      .required(t("required-field")),
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
            <Button
              variant="contained"
              fullWidth
              disabled={isSubmitting}
              onClick={() => {
                if (values.cardInput) toggleInsertCard(true);
              }}
            >
              {t("insert-card")}
            </Button>
          )}
          {isCardInserted && (
            <div>
              <InputFieldPassword
                name="pinInput"
                placeholder={t("pin-length")}
              />
              <Button
                variant="contained"
                fullWidth
                disabled={isSubmitting}
                type="submit"
              >
                {t("login-button")}
              </Button>
            </div>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
