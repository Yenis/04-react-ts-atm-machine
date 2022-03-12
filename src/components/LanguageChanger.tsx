import React from "react";
import { Button } from "@material-ui/core";
import { useTranslation } from 'react-i18next'

export const LanguageChanger: React.FC = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
  }

  return (
    <div style={{display: "flex"}}>
      <p style={{color: "darkblue", margin: "10px"}}><strong>{t("change-language")}</strong></p>  
      <Button style={{margin: "5px"}} size="small" variant="contained" color="primary" onClick={() => {changeLanguage("en")}}>EN</Button>
      <Button style={{margin: "5px"}} size="small" variant="contained" color="default" onClick={() => {changeLanguage("de")}}>DE</Button>
      <Button style={{margin: "5px"}} size="small" variant="contained" color="secondary" onClick={() => {changeLanguage("ba")}}>BA</Button>
    </div>
  );
};
