import { Button } from "@material-ui/core";
import { Formik, Form } from "formik";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { transactionStore } from "../data/transactionStore";
import { InputFieldPassword } from "../components/InputFieldPassword";
import { Page } from "../helpers/pageLinks";
import * as yup from "yup";
import { throwError } from "../helpers/toastr/ToastMessages";
import { useTranslation } from "react-i18next";

const AdminMenu: React.FC = () => {
  const [hasAccess, allowAccess] = useState(false);
  const navigateTo = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    transactionStore.assignTotalCashAmountAsync();
    console.log(transactionStore.allUsersTotal);
  });

  const handleAdminPinInput = (inputValue: string) => {
    if (!inputValue) return;

    if (inputValue === transactionStore.allUsersTotal.toString()) {
      allowAccess(true);
    } else {
      throwError(t("invalid-pin"));
      navigateTo(Page.HOME);
    }
  };

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
                placeholder={t("enter-admin-pin")}
              />
              <Button
                variant="contained"
                disabled={isSubmitting}
                fullWidth
                color="secondary"
                type="submit"
              >
                {t("admin-login")}
              </Button>
              <div>
                <Button
                  variant="outlined"
                  fullWidth
                  onClick={() => navigateTo(Page.HOME)}
                >
                  {t("return")}
                </Button>
              </div>
            </Form>
          )}
          {hasAccess && (
            <div className="main-menu-header">
              <div>
                <h3>{t("admin-menu")}</h3>
              </div>
              <div>
                <Button
                  variant="outlined"
                  fullWidth
                  onClick={() => navigateTo(Page.REGISTER)}
                >
                  {t("register-new-user")}
                </Button>
              </div>
              <div>
                <Button
                  variant="outlined"
                  fullWidth
                  onClick={() => navigateTo(Page.SERVICE)}
                >
                  {t("service-atm")}
                </Button>
              </div>
              <div>
                <Button
                  variant="outlined"
                  fullWidth
                  onClick={() => navigateTo(Page.HOME)}
                >
                  {t("return")}
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
