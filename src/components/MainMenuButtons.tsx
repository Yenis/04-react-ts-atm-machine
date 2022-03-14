import { useTranslation } from "react-i18next";
import { useNavigation } from "../helpers/customHooks/navigationHook";
import { Page } from "../helpers/pageLinks";
import { ButtonPrim } from "./ButtonsContained";

const MainMenuButtons: React.FC = () => {
  const navigateTo = useNavigation();
  const { t } = useTranslation();
  return (
    <div className="home-page-buttons" style={{display: "flex"}}>
      <ButtonPrim onClick={() => navigateTo(Page.STATUS)}>{t("status")}</ButtonPrim>
      <ButtonPrim onClick={() => navigateTo(Page.DEPOSIT)}>{t("deposit")}</ButtonPrim>
      <ButtonPrim onClick={() => navigateTo(Page.WITHDRAW)}>{t("withdraw")}</ButtonPrim>
    </div>
  );
};

export default MainMenuButtons;
