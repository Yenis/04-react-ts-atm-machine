import React from "react";
import { Page } from "../helpers/pageLinks";
import { useTranslation } from "react-i18next";
import { ButtonAdminMenu, ButtonLogin } from "../components/VariousButtons";
import { useNavigation } from "../helpers/customHooks/navigationHook";

const HomePage: React.FC = () => {
  const navigateTo = useNavigation();
  const { t } = useTranslation();

  return (
    <>
      <div className="home-page-buttons">
        <ButtonLogin  onClick={() => navigateTo(Page.LOGIN)}>
          {t("login-button")}
        </ButtonLogin>
      </div>
      <div className="home-page-buttons">
        <ButtonAdminMenu onClick={() => navigateTo(Page.ADMIN_LOGIN)}>
          {t("admin-menu-button")}
        </ButtonAdminMenu>
      </div>
    </>
  );
};

export default HomePage;