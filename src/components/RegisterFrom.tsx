import { Button } from "@material-ui/core";
import { Formik, Form } from "formik";
import { InputField } from "../helpers/InputField";
import { InputFieldPassword } from "../helpers/InputFieldPassword";
import * as yup from "yup";

interface RegisterFormProps {
  handleRegisterUser: (arg0: string, arg1: string, arg2: string) => void;
}

const RegisterForm: React.FC<RegisterFormProps> = (props) => {
  const validationSchema = yup.object({
    userName: yup.string(),
    cardInput: yup.string().required().min(16).max(16),
    pinInput: yup.string().required().min(5).max(5),
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
            <InputField name="userName" placeholder="User Name..." />
          </div>
          <div>
            <InputField
              name="cardInput"
              placeholder="16-digit Card Number..."
            />
          </div>
          <div>
            <InputFieldPassword name="pinInput" placeholder="5-digit PIN..." />
          </div>
          <div>
            <Button disabled={isSubmitting} type="submit">
              REGISTER
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default RegisterForm;
