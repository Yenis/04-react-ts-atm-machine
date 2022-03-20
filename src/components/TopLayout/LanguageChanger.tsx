import React from "react";
import { useTranslation } from 'react-i18next'
import LanguageIcon from '@mui/icons-material/Language';
import { ButtonGroup } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import { ButtonLang } from "../VariousButtons";

const useStyles = makeStyles({
  root: {
    borderRadius: 15,
    margin: 3
  },
  deLang: {
    borderRadius: 15,
    margin: 3,
    backgroundColor: "lime"
  }
})

export const LanguageChanger: React.FC = () => {
  const { i18n } = useTranslation();
  const classes = useStyles();

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
  }

  return (
    <div style={{display: "flex"}}> 
      <ButtonGroup>
        <LanguageIcon fontSize="large" color="primary" style={{margin: "2px"}}/>
        <ButtonLang className={classes.root} color="primary" onClick={() => {changeLanguage("en")}}>EN</ButtonLang>
        <ButtonLang className={classes.deLang} color="default" onClick={() => {changeLanguage("de")}}>DE</ButtonLang>
        <ButtonLang className={classes.root} color="secondary" onClick={() => {changeLanguage("ba")}}>BA</ButtonLang>
      </ButtonGroup>
    </div>
  );
};
