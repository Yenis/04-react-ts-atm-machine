import { Formik, Form } from "formik";
import { useEffect, useState } from "react";
import { transactionStore } from "../data/transactionStore";
import { InputFieldPassword } from "../components/InputFieldPassword";
import { Page } from "../helpers/pageLinks";
import * as yup from "yup";
import { throwError } from "../helpers/toastr/ToastMessages";
import { useTranslation } from "react-i18next";
import { ButtonPrim, ButtonScnd } from "../components/ButtonsContained";
import { useNavigation } from "../helpers/customHooks/navigationHook";

const AdminMenu: React.FC = () => {
  const [hasAccess, allowAccess] = useState(false);
  
  const navigateTo = useNavigation();
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
              <ButtonPrim
                disabled={isSubmitting}
                type="submit"
              >
                {t("admin-login")}
              </ButtonPrim>
              <div>
                <ButtonScnd onClick={() => navigateTo(Page.HOME)}>
                  {t("return")}
                </ButtonScnd>
              </div>
            </Form>
          )}
          {hasAccess && (
            <div className="main-menu-header">
              <div>
                <h3>{t("admin-menu")}</h3>
              </div>
              <div>
                <ButtonPrim onClick={() => navigateTo(Page.REGISTER)}>
                  {t("register-new-user")}
                </ButtonPrim>
              </div>
              <div>
                <ButtonPrim onClick={() => navigateTo(Page.SERVICE)}>
                  {t("service-atm")}
                </ButtonPrim>
              </div>
              <div>
                <ButtonPrim onClick={() => navigateTo(Page.HOME)}>
                  {t("return")}
                </ButtonPrim>
              </div>
            </div>
          )}
        </div>
      )}
    </Formik>
  );
};

export default AdminMenu;
