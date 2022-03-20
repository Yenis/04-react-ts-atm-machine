import { Page } from "../../helpers/pageLinks";
import { useTranslation } from "react-i18next";
import { useNavigation } from "../../helpers/customHooks/navigationHook";
import { ButtonRegister, ButtonReturn, ButtonService } from "../VariousButtons";

interface AdminMenuProps {
    handleAdminLogout: () => void;
}

const AdminMenuButtons: React.FC<AdminMenuProps> = (props) => {
  const navigateTo = useNavigation();
  const { t } = useTranslation();

  return (
    <div className="main-menu-header">
    <div>
      <ButtonRegister onClick={() => navigateTo(Page.REGISTER)}>
        {t("register-new-user")}
      </ButtonRegister>
    </div>
    <div>
      <ButtonService onClick={() => navigateTo(Page.SERVICE)}>
        {t("service-atm")}
      </ButtonService>
    </div>
    <div>
      <ButtonReturn color="primary" onClick={props.handleAdminLogout}>
        {t("return")}
      </ButtonReturn>
    </div>
  </div>
  );
};

export default AdminMenuButtons;
