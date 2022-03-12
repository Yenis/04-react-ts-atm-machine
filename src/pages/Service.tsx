import { Button } from "@material-ui/core";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { atmNumber, saveAtmStateAsync } from "../data/db_adminIsServicing";
import { transactionStore } from "../data/transactionStore";
import { useAtmState } from "../helpers/customHooks/adminServiceHook";
import { Page } from "../helpers/pageLinks";

const AdminServicePage: React.FC = () => {
  const { isServicing, toggleService } = useAtmState();
  const navigateTo = useNavigate()

  const { t } = useTranslation();
  
  useEffect(() => {
    console.log(transactionStore.allUsersTotal);
  })

  const handleServiceToggle = async () => {
    toggleService(!isServicing);
    await saveAtmStateAsync(atmNumber, !isServicing)
    navigateTo(Page.ADMIN)
  }

  return (
    <div>
      <div className="main-menu-header">
        <h3>{t("admin-service-page")}</h3>
        <h4>{t("total-cash")} : _{transactionStore.allUsersTotal}_</h4>
        {!isServicing && <Button
          variant="contained"
          color="secondary"
          fullWidth
          onClick={handleServiceToggle}
        >
          {t("turn-off")}
        </Button>}
        {isServicing && <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleServiceToggle}
        >
          {t("turn-on")}
        </Button>}
      </div>
      <Link to={Page.ADMIN}>
        <Button variant="outlined" fullWidth>
          {t("return")}
        </Button>
      </Link>
    </div>
  );
};

export default AdminServicePage;
