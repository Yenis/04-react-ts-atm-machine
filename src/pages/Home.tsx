import { useNavigate } from "react-router-dom";
import { useCurrentUser } from "../helpers/currentUserHook";
import React, { useEffect, useState } from "react";
import { Button } from "@material-ui/core";
import { Page } from "../helpers/Links";
import { useTranslation } from 'react-i18next'

export const TopLayout: React.FC = ({ children }: any) => {
  const { currentUser } = useCurrentUser();
  const { t, i18n } = useTranslation();

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
  }

  const [time, setTime] = useState(new Date().toLocaleString());
  useEffect(() => {
    let secondTimer = setInterval(() => {
      setTime(new Date().toLocaleString());
    }, 1000);

    return () => clearInterval(secondTimer);
  }, []);

  return (
    <div>
      <div className="main-menu-header">
        <h2>{t("welcome-to-atm")}</h2>
        {currentUser.userName && <h3>{t("current-user")}: {currentUser.userName}</h3>}
        <h3>{time}</h3>
        <div style={{display: "flex"}}>
        <p style={{margin: "10px"}}><strong>{t("change-language")}</strong></p>  
        <Button style={{margin: "5px"}} size="small" variant="contained" color="primary" onClick={() => {changeLanguage("en")}}>EN</Button>
        <Button style={{margin: "5px"}} size="small" variant="contained" color="default" onClick={() => {changeLanguage("de")}}>DE</Button>
        <Button style={{margin: "5px"}} size="small" variant="contained" color="secondary" onClick={() => {changeLanguage("ba")}}>BA</Button>
      </div>
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
        <Button variant="contained" fullWidth onClick={() => navigateTo(Page.LOGIN)}>
          {t("login-button")}
        </Button>
      </div>
      <div>
        <Button variant="outlined" fullWidth onClick={() => navigateTo(Page.ADMIN)}>
        {t("admin-menu-button")}
        </Button>
      </div>
    </>
  );
};
