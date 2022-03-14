import { createContext, useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, Route, Routes } from "react-router-dom";
import { ButtonScnd } from "../../components/ButtonsContained";
import AdminMenu from "../../pages/Admin";
import RegisterPage from "../../pages/Register";
import AdminServicePage from "../../pages/Service";
import ServicingReport from "../../pages/ServicingReport";
import { Page } from "../pageLinks";

const AtmStateContext = createContext({
  isServicing: false,
  toggleService: (service: boolean) => {},
});

export const useAtmState = () => {
  const [inService, toggleServiceAtm] = useState(false);
  const { isServicing, toggleService } = useContext(AtmStateContext);
  const { t } = useTranslation();

  const AtmStateProvider = ({ children }: any) => {
    return (
      <AtmStateContext.Provider
        value={{ isServicing: inService, toggleService: toggleServiceAtm }}
      >
        {!inService && children}

        {inService && (
          <>
            <ServicingReport />
            <Link to={Page.ADMIN}>
              <ButtonScnd>{t("admin-menu-button")}</ButtonScnd>
            </Link>
            <Routes>
              <Route path={Page.SERVICE} element={<AdminServicePage />}></Route>
              <Route path={Page.REGISTER} element={<RegisterPage />}></Route>
              <Route path={Page.ADMIN} element={<AdminMenu />}></Route>
            </Routes>
          </>
        )}
      </AtmStateContext.Provider>
    );
  };

  return { isServicing, toggleService, AtmStateProvider } as const;
};
