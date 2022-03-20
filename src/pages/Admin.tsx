import { Page } from "../helpers/pageLinks";
import { useNavigation } from "../helpers/customHooks/navigationHook";
import { noUser, useCurrentUser } from "../helpers/customHooks/currentUserHook";
import { useDisplay } from "../helpers/customHooks/displayScreenHook";
import AdminMenuButtons from "../components/Admin/AdminMenuButtons";
import withAuth from "../helpers/userAuthenticationHOC";
import { noPinData, useUserPin } from "../helpers/customHooks/userPinHook";

const AdminMenu: React.FC = () => {
  const { setCurrentUser } = useCurrentUser();
  const { setActivePage } = useDisplay();
  const { setPinState } = useUserPin();

  const navigateTo = useNavigation();

  const handleAdminLogout = () => {
    setCurrentUser(noUser);
    setPinState(noPinData);
    navigateTo(Page.HOME);
    setActivePage(Page.HOME);
  };

  return (
    <div className="input-form">
      <AdminMenuButtons handleAdminLogout={handleAdminLogout} />
    </div>
  );
};

export default withAuth(AdminMenu);
