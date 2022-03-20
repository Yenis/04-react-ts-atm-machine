import React, { useEffect, useState } from "react";
import { getDateTimeUtc } from "../../helpers/getDateTimeUTC";
import AccessTimeIcon from '@mui/icons-material/AccessTime';

export const CurrentTime: React.FC = () => {

  const [time, setTime] = useState(new Date().toUTCString());

  useEffect(() => {
    let secondTimer = setInterval(() => {
      let dateTime = getDateTimeUtc().toUTCString();
      setTime(dateTime);
    }, 1000);

    return () => clearInterval(secondTimer);
  }, []);

  return (
    <div className="time-date-current">
      <h3><AccessTimeIcon /> {time}</h3>
    </div>
  );
};

