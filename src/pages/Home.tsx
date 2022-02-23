import { Link } from "react-router-dom";
import { useCurrentUser } from "../data/currentUser";
import React, { useEffect, useState } from "react";

export const TopLayout: React.FC = () => {
  const { userContext } = useCurrentUser();
  const currentUser = userContext;

  const [time, setTime] = useState(new Date().toLocaleString());
  useEffect(() => {
    let secTimer = setInterval(() => {
      setTime(new Date().toLocaleString());
    }, 1000);

    return () => clearInterval(secTimer);
  }, []);

  return (
    <div>
      <h2>Welcome to ATM</h2>
      <h3>
        Current User: {currentUser.userName ? currentUser.userName : "N/A"}
      </h3>
      <h3>{time}</h3>
    </div>
  );
};

export const HomePage: React.FC = () => {
  return (
    <>
      <div>
        <Link to="/LoginPage">
          <button>LOGIN</button>
        </Link>
      </div>
      <div>
        <Link to="/AdminPage">
          <button>ADMIN MENU</button>
        </Link>
      </div>
    </>
  );
};
