import { Button } from "@material-ui/core";
import { createContext, useContext, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import AdminMenu from "../pages/Admin";
import RegisterPage from "../pages/Register";
import AdminServicePage from "../pages/Service";
import IsServicingPage from "../pages/ServicingReport";
import { Page } from "./Links";

const AtmStateContext = createContext({
  isServicing: false,
  toggleService: (service: boolean) => {},
});

export const useAtmState = () => {
  const [inService, toggleServiceAtm] = useState(false);

  const { isServicing, toggleService } = useContext(AtmStateContext);

  const AtmStateProvider = ({ children }: any) => {
    return (
      <AtmStateContext.Provider
        value={{ isServicing: inService, toggleService: toggleServiceAtm }}
      >
        {!inService && children}
        {inService && (
          <>
            <IsServicingPage />
            <Link to={Page.ADMIN}>
              <Button variant="outlined" color="secondary" fullWidth>
                ADMIN MENU
              </Button>
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
