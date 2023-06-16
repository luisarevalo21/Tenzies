import { useEffect, useState, useImperativeHandle, forwardRef } from "react";

// eslint-disable-next-line react/display-name
const Timer = forwardRef((props, ref) => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  // console.log(time);
  useImperativeHandle(ref, () => {
    return {
      stopTimer: stopTimer,
      resetTimer: resetTimer,
      startTimer: startTimer,
      totalTime: `${hours}:${minutes}:${seconds}:${millseconds}`,
    };
  });
  useEffect(() => {
    let intervalId;

    if (isRunning) {
      intervalId = setInterval(() => setTime(time + 1), 10);
    }

    return () => clearInterval(intervalId);
  }, [time, isRunning]);

  const stopTimer = () => {
    setIsRunning(false);
    // props.stopTriggered();
  };
  const startTimer = () => {
    setIsRunning(true);
  };
  const resetTimer = () => {
    setTime(0);
    setIsRunning(true);
  };

  const hours = Math.floor(time / 360000)
    .toString()
    .padStart(2, "0");
  //   console.log(hours);
  const minutes = Math.floor((time % 360000) / 6000)
    .toString()
    .padStart(2, "0");
  //   //   console.log(minutes);

  const seconds = Math.floor((time % 6000) / 100)
    .toString()
    .padStart(2, "0");
  //   console.log("seconds", seconds);
  const millseconds = Math.floor(time % 100)
    .toString()
    .padStart(2, "0");

  //   console.log(millseconds);
  // const totalTime = [hours, minutes, seconds, millseconds];

  return (
    <div className="timer">
      <p>
        Timer: {hours.toString().padStart(2, "0")}:{minutes.toString().padStart(2, "0")}:
        {seconds.toString().padStart(2, "0")}:{millseconds}
      </p>

      {/* <button onClick={stop}>Stop</button>
      <button onClick={reset}>Reset</button> */}
    </div>
  );
});

export default Timer;
