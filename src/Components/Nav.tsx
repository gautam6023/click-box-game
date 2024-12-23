import React from "react";

interface INavProps {
  onStart: () => void;
  onPause?: () => void;
  onReset?: () => void;
  timeDiff: number;
  setTimeDiff: React.Dispatch<React.SetStateAction<number>>;
  isGameStarted: boolean;
  isPaused: boolean;
}
const Nav = ({
  onPause,
  onReset,
  onStart,
  timeDiff,
  setTimeDiff,
  isGameStarted,
  isPaused,
}: INavProps) => {
  return (
    <div className="navbar">
      <input
        type="number"
        value={timeDiff}
        onChange={(e) => {
          setTimeDiff(Number(e.target.value));
        }}
        disabled={isGameStarted || isPaused}
      />
      <button disabled={isGameStarted} onClick={onStart}>
        Start
      </button>
      <button onClick={onPause} disabled={isPaused}>
        Pause
      </button>
      <button disabled={!isGameStarted} onClick={onReset}>
        Reset
      </button>
    </div>
  );
};

export default Nav;
