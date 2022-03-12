import { useCurrentUser } from "../helpers/customHooks/currentUserHook";
import { useTranslation } from "react-i18next";

const MainMenuHeader: React.FC = () => {
  const { currentUser } = useCurrentUser();
  const { t } = useTranslation();

  return (
    <div className="main-menu-header">
      <h2>{t("welcome")} {currentUser.userName}</h2>
      <h2>{t("card-number")} {currentUser.cardNumber}</h2>
    </div>
  );
};

export default MainMenuHeader;
