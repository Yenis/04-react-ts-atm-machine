import { Formik, Form } from "formik";
import { Button } from "@material-ui/core";
import { InputField } from "../helpers/InputField";
import * as yup from "yup";
import { InputFieldPassword } from "../helpers/InputFieldPassword";

interface LoginFormProps {
  handleLoginUser: (cardInput: string, pinInput: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = (props) => {
  const validationSchema = yup.object({
    cardInput: yup.string().required().min(16).max(16),
    pinInput: yup.string().required().min(5).max(5),
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
      {({ isSubmitting }) => (
        <Form>
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
            <Button variant="contained" fullWidth disabled={isSubmitting} type="submit">
              LOGIN
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
