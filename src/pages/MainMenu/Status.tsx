import { Button } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import PrintedReceipt from "../../components/PrintedReceipt";
import MainMenuHeader from "../../components/MainMenuHeader";
import { Page } from "../../helpers/pageLinks";
import { useTranslation } from "react-i18next";

const StatusPage: React.FC = () => {
  const navigateTo = useNavigate();
  const { t } = useTranslation();
  return (
    <div>
      <MainMenuHeader />
      <PrintedReceipt />
      <Button
        variant="contained"
        fullWidth
        onClick={() => navigateTo(Page.MAIN)}
      >
        {t("return")}
      </Button>
    </div>
  );
};

export default StatusPage;
