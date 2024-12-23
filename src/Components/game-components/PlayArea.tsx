import React, { useState } from "react";

export interface IBox {
  id: number;
  isVisible: boolean;
}

interface IPlayArea {
  boxes: IBox[];
  visibleBox?: number | null;
  onVisibleBoxClick: () => void;
}

const PlayArea = ({ boxes, visibleBox, onVisibleBoxClick }: IPlayArea) => {
  return (
    <div className="play-area-container">
      {boxes.map((el) => {
        return (
          <button
            key={el.id}
            className={`${visibleBox - 1 === el.id ? "active" : "box"}`}
            onClick={(e) => {
              e.stopPropagation();
              if (visibleBox - 1 === el.id) {
                onVisibleBoxClick();
              }
            }}
          ></button>
        );
      })}
    </div>
  );
};

export default PlayArea;
