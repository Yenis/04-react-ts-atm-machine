import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ButtonPowerSetting, ButtonReturn } from "../components/VariousButtons";
import { atmNumber, saveAtmStateAsync } from "../data/db_adminIsServicing";
import { transactionStore } from "../data/transactionStore";
import { useAtmState } from "../helpers/customHooks/adminServiceHook";
import { useDisplay } from "../helpers/customHooks/displayScreenHook";
import { useNavigation } from "../helpers/customHooks/navigationHook";
import { centerText } from "../helpers/inlineStyles";
import { Page } from "../helpers/pageLinks";
import withAuth from "../helpers/userAuthenticationHOC";

const AdminServicePage: React.FC = () => {
  const { isServicing, setServiceState } = useAtmState();
  const { setActivePage } = useDisplay();

  const navigateTo = useNavigation();
  const { t } = useTranslation();

  const handleServiceToggleOff = async () => {
    setServiceState(false);
    await saveAtmStateAsync(atmNumber, false);
    navigateTo(Page.ADMIN);    
  };

  const handleServiceToggleOn = async () => {
    setServiceState(true);
    await saveAtmStateAsync(atmNumber, true);
    navigateTo(Page.ADMIN);
    setActivePage(Page.IN_SERVICE);
  };

  return (
    <div className="status-page">
      <div>
        <h3 style={centerText}>{t("admin-service-page")}</h3>
        <h4 style={centerText}>
          {t("total-cash")} : _{transactionStore.allUsersTotal}_
        </h4>
        {!isServicing && (
          <ButtonPowerSetting onClick={handleServiceToggleOn}>{t("turn-off")}</ButtonPowerSetting>
        )}
        {isServicing && (
          <ButtonPowerSetting onClick={handleServiceToggleOff}>{t("turn-on")}</ButtonPowerSetting>
        )}
      </div>
      <Link to={Page.ADMIN} style={{textDecoration: 'none'}}>
        <ButtonReturn color="primary">{t("return")}</ButtonReturn>
      </Link>
    </div>
  );
};

export default withAuth(AdminServicePage);
