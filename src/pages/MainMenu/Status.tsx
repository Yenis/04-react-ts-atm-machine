import PrintedReceipt from "../../components/MainMenu/PrintedReceipt";
import { Page } from "../../helpers/pageLinks";
import { useTranslation } from "react-i18next";
import { ButtonReturn } from "../../components/VariousButtons";
import { useNavigation } from "../../helpers/customHooks/navigationHook";
import React from "react";
import withAuth from "../../helpers/userAuthenticationHOC";

const StatusPage: React.FC = () => {
  const navigateTo = useNavigation();
  const { t } = useTranslation();
  return (
    <div className="status-page">
      <PrintedReceipt />
      
      <ButtonReturn onClick={() => navigateTo(Page.MAIN)}>
        {t("return")}
      </ButtonReturn>
    </div>
  );
};

export default withAuth(StatusPage);
