import { useTranslation } from "react-i18next";
import { useCurrentUser } from "../helpers/customHooks/currentUserHook";

export const CurrentUser: React.FC = () => {
  const { currentUser } = useCurrentUser();
  const { t } = useTranslation();

  return (
    <div className="time-date-current">
      {currentUser.userName && (
        <>
          <h3>{t("current-user")}:</h3>
          <h3>{currentUser.userName}</h3>
        </>
      )}
    </div>
  );
};
