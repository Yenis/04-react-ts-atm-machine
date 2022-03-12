import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Button } from "@material-ui/core";
import { Page } from "../helpers/pageLinks";

const MainMenuButtons: React.FC = () => {
  const navigateTo = useNavigate();
  const { t } = useTranslation();
  return (
    <div style={{display: "flex"}}>
      <Button variant="outlined" fullWidth onClick={() => navigateTo(Page.STATUS)}>{t("status")}</Button>
      <Button variant="outlined" fullWidth onClick={() => navigateTo(Page.DEPOSIT)}>{t("deposit")}</Button>
      <Button variant="outlined" fullWidth onClick={() => navigateTo(Page.WITHDRAW)}>{t("withdraw")}</Button>
    </div>
  );
};

export default MainMenuButtons;
