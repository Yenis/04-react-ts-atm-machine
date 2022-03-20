import { useCurrentUser } from "../../helpers/customHooks/currentUserHook";
import { useTranslation } from "react-i18next";

const MainMenuHeader: React.FC = () => {
  const { currentUser } = useCurrentUser();
  const { t } = useTranslation();

  return (
    <div className="main-display">
      {currentUser.userName && (
        <h3>{t("welcome")} {currentUser.userName}</h3>
      )}
      {currentUser.cardNumber && (
        <h3>{t("card-number")} {currentUser.cardNumber}</h3>
      )}
    </div>
  );
};

export default MainMenuHeader;
