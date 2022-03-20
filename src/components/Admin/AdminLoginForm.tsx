import { Formik, Form } from "formik";
import { InputFieldPassword } from "../InputFieldPassword";
import { ButtonAdminLogin } from "../VariousButtons";
import { useTranslation } from "react-i18next";
import * as yup from "yup";

interface AdminLoginProps {
    handleAdminPinInput: (pinInput: string) => void
}

const AdminLoginForm: React.FC<AdminLoginProps> = (props) => {
  const { t } = useTranslation();

  const validationSchema = yup.object({
    adminPin: yup.string().required(t("required-field")),
  });

  return (
    <Formik
      initialValues={{
        adminPin: "",
      }}
      validationSchema={validationSchema}

      onSubmit={(submitData, { setSubmitting }) => {
        setSubmitting(true);
          props.handleAdminPinInput(submitData.adminPin);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <div className="input-form">
            <Form>
              <InputFieldPassword
                name="adminPin"
                placeholder={t("enter-admin-pin")}
              />
              <ButtonAdminLogin
                disabled={isSubmitting}
                type="submit"
              >
                {t("admin-login")}
              </ButtonAdminLogin>
            </Form>
        </div>
      )}
    </Formik>
  );
};

export default AdminLoginForm;
