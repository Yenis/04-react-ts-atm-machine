import React from "react";
import { TopLayout as MainLayout } from "./TopLayout";
import { HomePage } from "../pages/Home";
import { useCurrentUser } from "../helpers/customHooks/currentUserHook";
import { useUserPin } from "../helpers/customHooks/userPinHook";
import { Routes, Route } from "react-router-dom";
import { Page } from "../helpers/pageLinks";
import LoginPage from "../pages/Login";
import RegisterPage from "../pages/Register";
import MainMenuPage from "../pages/Main";
import StatusPage from "../pages/MainMenu/Status";
import DepositPage from "../pages/MainMenu/Deposit";
import WithdrawPage from "../pages/MainMenu/Withdraw";
import AdminMenu from "../pages/Admin";
import AdminServicePage from "../pages/Service";
import { useAtmState } from "../helpers/customHooks/adminServiceHook";
import MainDisplay from "./MainMenuDisplay";
import { useDisplay } from "../helpers/customHooks/displayScreenHook";

const App: React.FC = () => {
  const { UserContextProvider } = useCurrentUser();
  const { UserPinProvider } = useUserPin();
  const { AtmStateProvider } = useAtmState();
  const { PageProvider } = useDisplay();

  return (
    <UserContextProvider>
      <UserPinProvider>
        <AtmStateProvider>
          <MainLayout>
            <PageProvider>
              <MainDisplay />
              <Routes>
                <Route path={Page.HOME} element={<HomePage />}></Route>
                <Route path={Page.ADMIN} element={<AdminMenu />}></Route>
                <Route path={Page.LOGIN} element={<LoginPage />}></Route>
                <Route path={Page.MAIN} element={<MainMenuPage />}></Route>
                <Route path={Page.STATUS} element={<StatusPage />}></Route>
                <Route path={Page.DEPOSIT} element={<DepositPage />}></Route>
                <Route path={Page.WITHDRAW} element={<WithdrawPage />}></Route>
                <Route path={Page.REGISTER} element={<RegisterPage />}></Route>
                <Route path={Page.SERVICE} element={<AdminServicePage />}></Route>
              </Routes>
            </PageProvider>
          </MainLayout>
        </AtmStateProvider>
      </UserPinProvider>
    </UserContextProvider>
  );
};

export default App;
