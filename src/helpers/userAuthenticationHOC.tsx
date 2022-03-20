import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ButtonReturnOut } from "../components/VariousButtons";
import { useCurrentUser } from "./customHooks/currentUserHook";
import { Page } from "./pageLinks";
import { throwError } from "./toastr/ToastMessages";

const withAuth = (Component: FC<{}>) => () => {
  const { currentUser } = useCurrentUser();
  const { t } = useTranslation();

  if (currentUser.cardNumber) {
    return <Component />;
  } else {
    throwError(t("session-lost"));
    return (
      <Link to={Page.HOME} style={{ textDecoration: "none" }}>
        <ButtonReturnOut>{t("return")}</ButtonReturnOut>
      </Link>
    );
  }
};

export default withAuth;
