import React, { useEffect, useState } from "react";

export const CurrentTime: React.FC = () => {

  const [time, setTime] = useState(new Date().toLocaleString());

  useEffect(() => {
    let secondTimer = setInterval(() => {
      setTime(new Date().toLocaleString());
    }, 1000);

    return () => clearInterval(secondTimer);
  }, []);

  return (
    <div className="time-date-current">
      <h3>{time}</h3>
    </div>
  );
};
