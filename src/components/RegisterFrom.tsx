import { Button } from "@material-ui/core";
import { Formik, Form } from "formik";
import { InputField } from "./InputField";
import { InputFieldPassword } from "./InputFieldPassword";
import * as yup from "yup";
import { useTranslation } from "react-i18next";

interface RegisterFormProps {
  handleRegisterUser: (
    userName: string,
    cardInput: string,
    pinInput: string
  ) => void;
}

const RegisterForm: React.FC<RegisterFormProps> = (props) => {
  const { t } = useTranslation();

  const validationSchema = yup.object({
    userName: yup.string().required(t("required-field")),
    cardInput: yup.string()
      .required(t("required-field"))
      .min(16, t("pin-input-length"))
      .max(16, t("pin-input-length")),
    pinInput: yup.string()
      .required(t("required-field"))
      .min(5, t("pin-input-length"))
      .max(5, t("pin-input-length")),
  });

  return (
    <Formik
      validateOnChange={true}
      initialValues={{
        userName: "",
        cardInput: "",
        pinInput: "",
      }}
      validationSchema={validationSchema}

      onSubmit={(submitData, { setSubmitting }) => {
        setSubmitting(true);
        props.handleRegisterUser(
          submitData.userName,
          submitData.cardInput,
          submitData.pinInput
        );
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <div>
            <InputField name="userName" placeholder={t("user-name")} />
          </div>
          <div>
            <InputField name="cardInput" placeholder={t("card-length")} />
          </div>
          <div>
            <InputFieldPassword name="pinInput" placeholder={t("pin-length")} />
          </div>
          <div>
            <Button
              variant="contained"
              fullWidth
              disabled={isSubmitting}
              type="submit"
            >
              {t("register")}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default RegisterForm;
