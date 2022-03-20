import { useTranslation } from "react-i18next";
import { ButtonReturnOut } from "../components/VariousButtons";
import RetainedPageDisplay from "../components/Admin/RetainedPageDisplay";
import { TopLayout } from "../components/TopLayout/TopLayout";
import { noUser, useCurrentUser } from "../helpers/customHooks/currentUserHook";
import { useDisplay } from "../helpers/customHooks/displayScreenHook";
import { useNavigation } from "../helpers/customHooks/navigationHook";
import { noPinData, useUserPin } from "../helpers/customHooks/userPinHook";
import { Page } from "../helpers/pageLinks";

const RetainedCardPage: React.FC = () => {
  const { setActivePage, PageProvider } = useDisplay();
  const { setCurrentUser } = useCurrentUser();
  const { setPinState } = useUserPin();

  const navigateTo = useNavigation();
  const { t } = useTranslation();

  const handleReturn = () => {
    setCurrentUser(noUser);
    setPinState(noPinData);
    navigateTo(Page.HOME);
    setActivePage(Page.HOME);
  };

  return (
    <div className="main-menu-header">
      <TopLayout>
        <PageProvider>
          <RetainedPageDisplay />
            <ButtonReturnOut style={{ width: "36%", border: "solid", color: "#e0e0e0"}} onClick={handleReturn}>
              {t("return")}
            </ButtonReturnOut>
        </PageProvider>
      </TopLayout>
    </div>
  );
};

export default RetainedCardPage;
