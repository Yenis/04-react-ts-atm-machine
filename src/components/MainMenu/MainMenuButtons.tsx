import { Page } from "../../helpers/pageLinks";
import { useTranslation } from "react-i18next";
import { useNavigation } from "../../helpers/customHooks/navigationHook";
import { ButtonAccountStatus, ButtonDeposit, ButtonWithdraw } from "../VariousButtons";

const MainMenuButtons: React.FC = () => {
  const navigateTo = useNavigation();
  const { t } = useTranslation();

  return (
    <div className="home-page-buttons" style={{display: "flex"}}>
      <ButtonAccountStatus onClick={() => navigateTo(Page.STATUS)}>{t("status")}</ButtonAccountStatus>
      <ButtonDeposit onClick={() => navigateTo(Page.DEPOSIT)}>{t("deposit")}</ButtonDeposit>
      <ButtonWithdraw onClick={() => navigateTo(Page.WITHDRAW)}>{t("withdraw")}</ButtonWithdraw>
    </div>
  );
};

export default MainMenuButtons;
