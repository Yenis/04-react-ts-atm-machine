import React, { useEffect } from "react";
import { emptyUser, useCurrentUser } from "../helpers/currentUserHook";
import { useUserPin } from "../helpers/userPinHook";
import { userStore } from "../data/userStore";
import { toast, ToastType } from "../helpers/ToastManager";
import { Routes, Route } from "react-router-dom";
import { TopLayout as MainLayout, HomePage } from "../pages/Home";
import LoginPage from "../pages/Login";
import RegisterPage from "../pages/Register";
import MainMenuPage from "../pages/Main";
import StatusPage from "../pages/MainMenu/Status";
import DepositPage from "../pages/MainMenu/Deposit";
import WithdrawPage from "../pages/MainMenu/Withdraw";
import AdminMenu from "../pages/Admin";
import AdminServicePage from "../pages/Service";
import RetainedCardPage from "../pages/Retained";
import { saveUserPinStateAsync } from "../data/userData";

const App: React.FC = () => {
  const { currentUser, setCurrentUser, UserContextProvider } = useCurrentUser();
  const { userPinState, setPinState, UserPinProvider } = useUserPin();

  useEffect(() => {
    userStore.initializeRegisteredUsersAsync();
  }, []);

  const handleLogOutUser = async () => {
    setPinState({...userPinState, pinAttempts: 3})
    await saveUserPinStateAsync(userPinState.cardNumber, {...userPinState, pinAttempts: 3})

    setCurrentUser(emptyUser);
    toast.show({
      title: ToastType.SUCCESS,
      content: `User: ${currentUser.userName} has Logged Out`,
      duration: 5000,
    });
  };

  return (
    <UserContextProvider>
      <UserPinProvider>
        <MainLayout>
          {userPinState.pinAttempts && <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route
              path="LoginPage"
              element={<LoginPage setCurrentUser={setCurrentUser} setPinState={setPinState} />}
            ></Route>
            <Route
              path="MainMenu"
              element={<MainMenuPage handleLogOutUser={handleLogOutUser} />}
            ></Route>
            <Route path="MainMenu/StatusPage" element={<StatusPage />}></Route>
            <Route
              path="MainMenu/DepositPage"
              element={<DepositPage />}
            ></Route>
            <Route
              path="MainMenu/WithdrawPage"
              element={<WithdrawPage />}
            ></Route>
            <Route
              path="RegisterPage"
              element={<RegisterPage setCurrentUser={setCurrentUser} setPinState={setPinState} />}
            ></Route>
            <Route path="AdminPage" element={<AdminMenu />}></Route>
            <Route path="ServicePage" element={<AdminServicePage />}></Route>
          </Routes>}
          {!userPinState.pinAttempts && <RetainedCardPage/>}
        </MainLayout>
      </UserPinProvider>
    </UserContextProvider>
  );
};

export default App;
