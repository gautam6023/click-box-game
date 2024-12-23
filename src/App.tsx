import { MutableRefObject, useEffect, useRef, useState } from "react";
import "./App.css";
import Nav from "./Components/Nav";
import PlayGround from "./Components/PlayGround";

export interface IClickData {
  timestamp: number;
  isPaused?: boolean;
  clickNumber?: number;
}

function App() {
  const [box, _] = useState(
    new Array(198).fill(0).map((el, idx) => {
      return { id: idx, isVisible: false };
    })
  );
  const [timeDiff, setTimeDiff] = useState<number>(3);
  const [visibleBox, setVisibleBox] = useState<number | null>(null);

  const [isGameStarted, setIsGameStarted] = useState(false);

  const getRandomBox = (totalBoxes: number) => {
    return Math.ceil(Math.random() * totalBoxes);
  };
  let timerRef = useRef<number | null>(null);

  const [gameStats, setGameStats] = useState<IClickData[]>([]);
  const [isPaused, setIsPaused] = useState(false);
  const countNumber = useRef(0);

  const initiateGame = () => {
    const newNumber = getRandomBox(box.length);
    setVisibleBox(newNumber);
    timerRef.current = setInterval(() => {
      const newNumber = getRandomBox(box.length);
      setVisibleBox(newNumber);
    }, timeDiff * 1000);
  };

  const startGame = () => {
    if (isGameStarted) return;
    if (timeDiff <= 0 || timeDiff > 10) {
      alert("Time difference should be between 1 to 10  seconds");
      return;
    }
    setIsGameStarted(true);
    initiateGame();
    setGameStats([...gameStats, { timestamp: Date.now() }]);
  };

  const onClickBox = () => {
    if (timerRef.current) {
      setGameStats([
        ...gameStats,
        { timestamp: Date.now(), clickNumber: countNumber.current++ },
      ]);
      clearInterval(timerRef.current);
      initiateGame();
    }
  };

  const handleOnPause = () => {
    setIsPaused(true);
    setIsGameStarted(false);
    if (timerRef.current) {
      setVisibleBox(null);
      clearInterval(timerRef.current);
    }
  };

  const handleStartGame = () => {
    if (isPaused) {
      setIsGameStarted(true);
      setIsPaused(false);
      initiateGame();
      setGameStats([
        ...gameStats,
        {
          timestamp: Date.now(),
          isPaused: true,
        },
      ]);
      return;
    }
    startGame();
  };

  let dataToRender = gameStats?.map((el, idx) => {
    return { ...el, timestamp: gameStats[idx + 1]?.timestamp - el.timestamp };
  });

  const handleOnReset = () => {
    setIsGameStarted(false);
    setGameStats([]);
    setTimeDiff(0);
    setVisibleBox(null);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    countNumber.current = 0;
  };

  return (
    <>
      {/* Header */}
      <Nav
        onStart={handleStartGame}
        isPaused={isPaused}
        timeDiff={timeDiff}
        isGameStarted={isGameStarted}
        setTimeDiff={setTimeDiff}
        onReset={handleOnReset}
        onPause={handleOnPause}
      />

      {/* PlayGround and Stats*/}
      <PlayGround
        boxes={box}
        visibleBox={visibleBox}
        onVisibleBoxClick={onClickBox}
        dataToRender={dataToRender}
      />
    </>
  );
}

export default App;
