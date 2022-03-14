import PrintedReceipt from "../../components/PrintedReceipt";
import { Page } from "../../helpers/pageLinks";
import { useTranslation } from "react-i18next";
import { ButtonPrim } from "../../components/ButtonsContained";
import { useNavigation } from "../../helpers/customHooks/navigationHook";

const StatusPage: React.FC = () => {
  const navigateTo = useNavigation();
  const { t } = useTranslation();
  return (
    <div className="status-page">
      <PrintedReceipt />
      <ButtonPrim onClick={() => navigateTo(Page.MAIN)}>
        {t("return")}
      </ButtonPrim>
    </div>
  );
};

export default StatusPage;
