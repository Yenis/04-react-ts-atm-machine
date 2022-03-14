import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ButtonPrim, ButtonScnd } from "../components/ButtonsContained";
import { atmNumber, saveAtmStateAsync } from "../data/db_adminIsServicing";
import { transactionStore } from "../data/transactionStore";
import { useAtmState } from "../helpers/customHooks/adminServiceHook";
import { useNavigation } from "../helpers/customHooks/navigationHook";
import { centerText } from "../helpers/inlineStyles";
import { Page } from "../helpers/pageLinks";

const AdminServicePage: React.FC = () => {
  const { isServicing, toggleService } = useAtmState();
  const navigateTo = useNavigation();

  const { t } = useTranslation();

  useEffect(() => {
    console.log(transactionStore.allUsersTotal);
  });

  const handleServiceToggle = async () => {
    toggleService(!isServicing);
    await saveAtmStateAsync(atmNumber, !isServicing);
    navigateTo(Page.ADMIN);
  };

  return (
    <div className="status-page">
      <div>
        <h3 style={centerText}>{t("admin-service-page")}</h3>
        <h4 style={centerText}>
          {t("total-cash")} : _{transactionStore.allUsersTotal}_
        </h4>
        {!isServicing && (
          <ButtonScnd onClick={handleServiceToggle}>{t("turn-off")}</ButtonScnd>
        )}
        {isServicing && (
          <ButtonScnd onClick={handleServiceToggle}>{t("turn-on")}</ButtonScnd>
        )}
      </div>
      <Link to={Page.ADMIN}>
        <ButtonPrim>{t("return")}</ButtonPrim>
      </Link>
    </div>
  );
};

export default AdminServicePage;
