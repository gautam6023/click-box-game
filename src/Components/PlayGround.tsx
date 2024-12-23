import "./playground.css";
import PlayArea, { IBox } from "./game-components/PlayArea";
import { IClickData } from "../App";

interface IPlayGroundProps {
  boxes: IBox[];
  visibleBox?: number | null;
  onVisibleBoxClick: () => void;
  dataToRender: IClickData[];
}

const PlayGround = ({
  boxes,
  visibleBox,
  onVisibleBoxClick,
  dataToRender,
}: IPlayGroundProps) => {
  return (
    <>
      <div className="playground-container">
        <PlayArea
          boxes={boxes}
          visibleBox={visibleBox}
          onVisibleBoxClick={onVisibleBoxClick}
        />
      </div>
      <div className="game-stats">
        <div>
          <div>Mouse Clicks</div>
          <div>Reaction Time</div>
        </div>
        {dataToRender.map((el, idx) => {
          const isLast = idx === dataToRender.length - 1;
          const time = String(el.timestamp / 1000).padEnd(1);
          const clickNumber = dataToRender[idx + 1]?.clickNumber;
          const isPaused = dataToRender[idx + 1]?.isPaused;
          return (
            <>
              {!isPaused && !isLast && (
                <div>
                  <div>{clickNumber + 1}</div>
                  <div>{time}s </div>
                </div>
              )}
            </>
          );
        })}
      </div>
    </>
  );
};

export default PlayGround;
