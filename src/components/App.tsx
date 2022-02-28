import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { userStore } from "../data/allAccountIDs";
import { TopLayout as MainLayout, HomePage } from "../pages/Home";
import LoginPage from "../pages/Login";
import RegisterPage from "../pages/Register";
import MainMenuPage from "../pages/Main";
import StatusPage from "../pages/MainMenu/Status";
import DepositPage from "../pages/MainMenu/Deposit";
import WithdrawPage from "../pages/MainMenu/Withdraw";
import AdminMenu from "../pages/Admin";
import AdminServicePage from "../pages/Service";
import { ActionType, emptyUser, useCurrentUser } from "../data/currentUser";
import { toast, ToastType } from "../helpers/ToastManager";

const App: React.FC = () => {
  const { currentUser, dispatch, UserContextProvider } = useCurrentUser();

  useEffect(() => {
    userStore.loadUserDataFromDbAsync();
  }, []);

  const handleLogOutUser = () => {
    dispatch({ type: ActionType.EMPTY, payload: emptyUser });
    toast.show({
      title: ToastType.SUCCESS,
      content: `User: ${currentUser.userName} has Logged Out`,
      duration: 5000,
    });
  };

  return (
    <UserContextProvider>
      <MainLayout>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route
            path="LoginPage"
            element={<LoginPage dispatch={dispatch} />}
          ></Route>
          <Route
            path="MainMenu"
            element={<MainMenuPage handleLogOutUser={handleLogOutUser} />}
          ></Route>
          <Route path="MainMenu/StatusPage" element={<StatusPage />}></Route>
          <Route path="MainMenu/DepositPage" element={<DepositPage />}></Route>
          <Route
            path="MainMenu/WithdrawPage"
            element={<WithdrawPage />}
          ></Route>
          <Route
            path="RegisterPage"
            element={<RegisterPage dispatch={dispatch} />}
          ></Route>
          <Route path="AdminPage" element={<AdminMenu />}></Route>
          <Route path="ServicePage" element={<AdminServicePage />}></Route>
        </Routes>
      </MainLayout>
    </UserContextProvider>
  );
};

export default App;
