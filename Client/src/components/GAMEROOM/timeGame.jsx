import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "../STYLES/timer.modules.css";

function TimerGame({ seconds, percentage }) {

    return (
        <div>
      <CircularProgressbar
        className="contentTimer"
        value={percentage}
        text={seconds}
        styles={buildStyles({
          textColor: "rgba(255,255,255,.5)",
          pathColor: "rgba(255, 0, 0, 0.715)",
          trailColor: "rgba(255,255,255,.2)",
        })}
      />
    </div>
  );
}

export default TimerGame;
