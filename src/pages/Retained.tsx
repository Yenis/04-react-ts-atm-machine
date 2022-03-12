import { useTranslation } from "react-i18next";
import { useCurrentUser } from "../helpers/customHooks/currentUserHook";

const RetainedCardPage: React.FC = () => {

  const { currentUser } = useCurrentUser();
  const { t } = useTranslation();

  return (
    <div className="main-menu-header">
      <h2 style={{color: "red"}}>{t("retained-card-1")} ({currentUser.userName})</h2>
      <h2 style={{color: "red"}}>{t("retained-card-2")}</h2>
      <h2 style={{color: "red"}}>{t("retained-card-3")}</h2>
    </div>
  );
};

export default RetainedCardPage;
