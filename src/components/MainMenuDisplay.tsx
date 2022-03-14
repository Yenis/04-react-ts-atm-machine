import { useCurrentUser } from "../helpers/customHooks/currentUserHook";
import { useTranslation } from "react-i18next";
import { useDisplay } from "../helpers/customHooks/displayScreenHook";
import { Page } from "../helpers/pageLinks";

const MainDisplay: React.FC = () => {
  const { currentUser } = useCurrentUser();
  const { activePage } = useDisplay();
  const { t } = useTranslation();

  return (
    <div className="main-display">
        {activePage === Page.HOME && <h2>{t("welcome-to-atm")}</h2>}
        {activePage === Page.PIN && <h2>{t("enter-pin")}</h2>}
        
        {activePage === Page.LOGIN && <h3>{t("please-provide-card")}</h3>}
        {activePage === Page.ADMIN && <h3>{t("enter-admin-pin")}</h3>}
        {activePage === Page.SERVICE && <h3>{t("admin-service-page")}</h3>} 
        {activePage === Page.REGISTER && <h3>{t("provide-registration-details")}</h3>}

        {activePage === Page.MAIN && <h2>{t("welcome")} {currentUser.userName}</h2>}
        {activePage === Page.MAIN && <h2>{t("card-number")} {currentUser.cardNumber}</h2>}

        {activePage === Page.STATUS && <h2>{t("status-page")}</h2>}
        {activePage === Page.DEPOSIT && <h2>{t("enter-deposit-amount")}</h2>}
        {activePage === Page.WITHDRAW && <h2>{t("enter-withdraw-amount")}</h2>}

        {activePage === Page.TRANSACTION && <h2>{t("transaction-completed")}</h2>}
    </div>
  );
};

export default MainDisplay;
