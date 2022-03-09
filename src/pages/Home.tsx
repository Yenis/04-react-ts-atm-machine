import { useNavigate } from "react-router-dom";
import { useCurrentUser } from "../helpers/currentUserHook";
import React, { useEffect, useState } from "react";
import { Button } from "@material-ui/core";
import { Page } from "../helpers/Links";

export const TopLayout: React.FC = ({ children }: any) => {
  const { currentUser } = useCurrentUser();

  const [time, setTime] = useState(new Date().toLocaleString());
  useEffect(() => {
    let secondTimer = setInterval(() => {
      setTime(new Date().toLocaleString());
    }, 1000);

    return () => clearInterval(secondTimer);
  }, []);

  return (
    <div>
      <div className="main-menu-header">
        <h2>Welcome to ATM</h2>
        {currentUser.userName && <h3>Current User: {currentUser.userName}</h3>}
        <h3>{time}</h3>
      </div>
      <div>{children}</div>
    </div>
  );
};

export const HomePage: React.FC = () => {
  const navigateTo = useNavigate();

  return (
    <>
      <div>
        <Button variant="contained" fullWidth onClick={() => navigateTo(Page.LOGIN)}>
          LOGIN
        </Button>
      </div>
      <div>
        <Button variant="outlined" fullWidth onClick={() => navigateTo(Page.ADMIN)}>
          ADMIN MENU
        </Button>
      </div>
    </>
  );
};
