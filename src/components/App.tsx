import React, { useEffect, useState } from "react";
import HomePage from "../pages/Home";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterFrom";
import StatusPage from "../pages/MainMenu/Status";
import DepositPage from "../pages/MainMenu/Deposit";
import WithdrawPage from "../pages/MainMenu/Withdraw";

import { CurrentUserContext, emptyUser } from "../data/currentUser";
import { Routes, Route } from "react-router-dom";
import MainMenuPage from "../pages/Main";
import { loadUserDataFromIdbAsync } from "../data/allAccountIDs";
import AdminMenu from "../pages/Admin";
import AdminServicePage from "../pages/Service";

// enum ActivePage {
//   Login,
//   Register,
// }
//  {const [activePage, setActivePage] = useState<ActivePage>(ActivePage.Login);}

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState(emptyUser());

  useEffect(() => {
    loadUserDataFromIdbAsync();
  });

  const handleRegisterUser = () => {
    alert("Registration Successful");
  };

  const handleLoginUser = () => {
    alert("Login Successful");
    
  };

  const handleLogOutUser = () => {
    alert(`User ${currentUser.Username} has Logged Out`);
    setCurrentUser({ ...emptyUser() });
  };

  // const handleDeposit = (amount: number) => {
  //   currentUser.Balance = currentUser.Balance + amount;
  //   setCurrentUser({ ...currentUser });
  // };

  // const handleWithdraw = (amount: number) => {
  //   currentUser.Balance = currentUser.Balance - amount;
  //   setCurrentUser({ ...currentUser });
  // };



  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route
          path="LoginPage"
          element={
            <LoginForm
              setCurrentUser={setCurrentUser}
              loginUser={handleLoginUser}
            />
          }
        ></Route>
        <Route
          path="MainMenu"
          element={
            <MainMenuPage
              setCurrentUser={setCurrentUser}
              logOut={handleLogOutUser}
            />
          }
        ></Route>
        <Route path="MainMenu/StatusPage" element={<StatusPage />}></Route>
        <Route path="MainMenu/DepositPage" element={<DepositPage />}></Route>
        <Route path="MainMenu/WithdrawPage" element={<WithdrawPage />}></Route>
        <Route
          path="RegisterPage"
          element={
            <RegisterForm
              setCurrentUser={setCurrentUser}
              registerUser={handleRegisterUser}
            />
          }
        ></Route>
        <Route path="AdminPage" element={<AdminMenu />}></Route>
        <Route path="ServicePage" element={<AdminServicePage />}></Route>
      </Routes>
    </CurrentUserContext.Provider>
  );
};

export default App;
