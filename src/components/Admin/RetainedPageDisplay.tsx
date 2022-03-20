import { useCurrentUser } from "../../helpers/customHooks/currentUserHook";
import { useTranslation } from "react-i18next";

const RetainedPageDisplay: React.FC = () => {
  const { currentUser } = useCurrentUser();
  const { t } = useTranslation();

  return (
    <div className="main-display">
        <h3>{t("retained-card-1")} ({currentUser.userName})</h3>
        <h3>{t("retained-card-2")}</h3> 
        <h3>{t("retained-card-3")}</h3>
    </div>
  );
};

export default RetainedPageDisplay;
