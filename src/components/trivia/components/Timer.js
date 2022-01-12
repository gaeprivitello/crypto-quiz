import React, { useEffect } from "react";
import LinearProgress from "@mui/material/LinearProgress";

export const Timer = ({ questionId, lifetimeSeconds, timeOut }) => {
  const [counter, setCounter] = React.useState(0);
  const intervalRef = React.useRef();

  useEffect(() => {
    setCounter(0);
  }, [questionId]);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCounter((time) => time + 1);
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    if (counter >= lifetimeSeconds) {
      timeOut();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [counter]);

  return (
    <LinearProgress
      variant="determinate"
      value={(counter * 100) / lifetimeSeconds}
    />
  );
};
