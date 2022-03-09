import React from "react";
import { TopLayout as MainLayout, HomePage } from "../pages/Home";
import { useCurrentUser } from "../helpers/currentUserHook";
import { useUserPin } from "../helpers/userPinHook";
import { Routes, Route } from "react-router-dom";
import { Page } from "../helpers/Links";
import LoginPage from "../pages/Login";
import RegisterPage from "../pages/Register";
import MainMenuPage from "../pages/Main";
import StatusPage from "../pages/MainMenu/Status";
import DepositPage from "../pages/MainMenu/Deposit";
import WithdrawPage from "../pages/MainMenu/Withdraw";
import AdminMenu from "../pages/Admin";
import AdminServicePage from "../pages/Service";


const App: React.FC = () => {
  const { UserContextProvider } = useCurrentUser();
  const { UserPinProvider } = useUserPin();

  return (
    <UserContextProvider>
      <UserPinProvider>
        <MainLayout>
            <Routes>
              <Route path={Page.HOME} element={<HomePage />}></Route>
              <Route path={Page.LOGIN} element={<LoginPage />}></Route>
              <Route path={Page.REGISTER} element={<RegisterPage />}></Route>
              <Route path={Page.MAIN} element={<MainMenuPage />}></Route>
              <Route path={Page.STATUS} element={<StatusPage />}></Route>
              <Route path={Page.DEPOSIT} element={<DepositPage />}></Route>
              <Route path={Page.WITHDRAW} element={<WithdrawPage />}></Route>
              <Route path={Page.SERVICE} element={<AdminServicePage />}></Route>
              <Route path={Page.ADMIN} element={<AdminMenu />}></Route>
            </Routes>
        </MainLayout>
      </UserPinProvider>
    </UserContextProvider>
  );
};

export default App;
