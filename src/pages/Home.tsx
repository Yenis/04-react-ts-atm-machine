import { useNavigate } from "react-router-dom";
import React from "react";
import { Button } from "@material-ui/core";
import { Page } from "../helpers/pageLinks";
import { useTranslation } from "react-i18next";
import { CurrentTime } from "../components/CurrentTime";
import { LanguageChanger } from "../components/LanguageChanger";
import { CurrentUser } from "../components/CurrentUser";

export const TopLayout: React.FC = ({ children }: any) => {
  const { t } = useTranslation();

  return (
    <div>
      <div className="main-menu-header">
        <h2>{t("welcome-to-atm")}</h2>
        <CurrentUser />
        <CurrentTime />
        <LanguageChanger />
      </div>

      <div>{children}</div>
    </div>
  );
};

export const HomePage: React.FC = () => {
  const navigateTo = useNavigate();
  const { t } = useTranslation();

  return (
    <>
      <div>
        <Button
          variant="contained"
          fullWidth
          onClick={() => navigateTo(Page.LOGIN)}
        >
          {t("login-button")}
        </Button>
      </div>
      <div>
        <Button
          variant="outlined"
          fullWidth
          onClick={() => navigateTo(Page.ADMIN)}
        >
          {t("admin-menu-button")}
        </Button>
      </div>
    </>
  );
};
