import React from "react";
import { Page } from "../helpers/pageLinks";
import { useTranslation } from "react-i18next";
import { ButtonPrim, ButtonScnd } from "../components/ButtonsContained";
import { useNavigation } from "../helpers/customHooks/navigationHook";

export const HomePage: React.FC = () => {
  const navigateTo = useNavigation();
  const { t } = useTranslation();

  return (
    <>
      <div className="home-page-buttons">
        <ButtonPrim onClick={() => navigateTo(Page.LOGIN)}>
          {t("login-button")}
        </ButtonPrim>
      </div>
      <div className="home-page-buttons">
        <ButtonScnd onClick={() => navigateTo(Page.ADMIN)}>
          {t("admin-menu-button")}
        </ButtonScnd>
      </div>
    </>
  );
};
