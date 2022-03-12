import { useTranslation } from "react-i18next";
import { useCurrentUser } from "../helpers/customHooks/currentUserHook";

export const CurrentUser: React.FC = () => {
    const { currentUser } = useCurrentUser();
    const { t } = useTranslation();
  
    return (
      <div>
          {currentUser.userName && (
            <h3>
              {t("current-user")}: {currentUser.userName}
            </h3>
          )}
      </div>
    );
  };