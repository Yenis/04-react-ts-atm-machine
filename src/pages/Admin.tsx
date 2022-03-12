import { Button } from "@material-ui/core";
import { Formik, Form } from "formik";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { transactionStore } from "../data/transactionStore";
import { InputFieldPassword } from "../components/InputFieldPassword";
import { Page } from "../helpers/Links";
import * as yup from "yup";
import { throwError } from "../helpers/ToastMessages";
import { useTranslation } from "react-i18next";

const AdminMenu: React.FC = () => {
  const [hasAccess, allowAccess] = useState(false);
  const navigateTo = useNavigate();
  const {t} = useTranslation();

  useEffect(() => {
    transactionStore.assignTotalCashAmountAsync();
    console.log(transactionStore.allUsersTotal);
  });

  const handleAdminPinInput = (inputValue: string) => {
    if (!inputValue) return;

    if (inputValue === transactionStore.allUsersTotal.toString()) {
      allowAccess(true);
    } else {
      throwError(t("invalid-pin"))
      navigateTo(Page.HOME)
    }
  }

  const validationSchema = yup.object({
    adminPin: yup.string().required(),
  });

  return (
    <Formik
      initialValues={{
        adminPin: "",
      }}
      validationSchema={validationSchema}
      onSubmit={(submitData, { setSubmitting }) => {
        setSubmitting(true);
          handleAdminPinInput(submitData.adminPin);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <div className="input-form">
          {!hasAccess && (
            <Form>
              <InputFieldPassword
                name="adminPin"
                placeholder="Enter Admin PIN"
              />
              <Button
                variant="contained"
                disabled={isSubmitting}
                fullWidth
                color="secondary"
                type="submit"
              >
                ADMIN LOGIN
              </Button>
              <div>
                <Button
                  variant="outlined"
                  fullWidth
                  onClick={() => navigateTo(Page.HOME)}
                >
                  RETURN
                </Button>
              </div>
            </Form>
          )}
          {hasAccess && (
            <div className="main-menu-header">
              <div>
                <h3>_admin_menu_</h3>
              </div>
              <div>
                <Button
                  variant="outlined"
                  fullWidth
                  onClick={() => navigateTo(Page.REGISTER)}
                >
                  REGISTER NEW USER
                </Button>
              </div>
              <div>
                <Button
                  variant="outlined"
                  fullWidth
                  onClick={() => navigateTo(Page.SERVICE)}
                >
                  SERVICE ATM
                </Button>
              </div>
              <div>
                <Button
                  variant="outlined"
                  fullWidth
                  onClick={() => navigateTo(Page.HOME)}
                >
                  RETURN
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </Formik>
  );
};

export default AdminMenu;
