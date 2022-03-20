import { useEffect } from "react";
import { transactionStore } from "../data/transactionStore";
import { Page } from "../helpers/pageLinks";
import { throwError } from "../helpers/toastr/ToastMessages";
import { useTranslation } from "react-i18next";
import { useNavigation } from "../helpers/customHooks/navigationHook";
import { admin, useCurrentUser } from "../helpers/customHooks/currentUserHook";
import AdminLoginForm from "../components/Admin/AdminLoginForm";
import { ButtonReturn } from "../components/VariousButtons";

const AdminLoginPage: React.FC = () => {
  const { setCurrentUser } = useCurrentUser();
  const navigateTo = useNavigation();
  const { t } = useTranslation();

  useEffect(() => {
    console.log(transactionStore.allUsersTotal);
  });

  const handleAdminPinInput = (inputValue: string) => {
    if (!inputValue) return;

    if (inputValue === transactionStore.allUsersTotal.toString()) {
      setCurrentUser(admin);
      navigateTo(Page.ADMIN);
    } else {
      throwError(t("invalid-pin"));
      navigateTo(Page.HOME);
    }
  };

  return (
    <div className="input-form">
      <AdminLoginForm handleAdminPinInput={handleAdminPinInput} />
      <ButtonReturn onClick={() => navigateTo(Page.HOME)}>
        {t("return")}
      </ButtonReturn>
    </div>
  );
};

export default AdminLoginPage;
