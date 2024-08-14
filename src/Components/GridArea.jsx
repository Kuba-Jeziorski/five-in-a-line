import React from "react";

export const GridArea = ({ rowsNumber, columnsNumber, onPress }) => {
  const gridCreation = (rows, columns) => {
    let gridItems = [];

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        gridItems.push(
          <div
            className="gridItem"
            key={`${i}${j}`}
            row={i + 1}
            column={j + 1}
            occupied={null}
          >
            <div className="gridItemCircle"></div>
          </div>
        );
      }
    }
    return gridItems;
  };

  const gridItems = gridCreation(rowsNumber, columnsNumber);

  const gridOccupation = (event) => {
    const randomPlayer = Math.random() * 100 <= 50 ? "player1" : "player2";

    const { target } = event;
    const closestGridItem = target.closest(".gridItem");
    const closestGriditemoOccupation = closestGridItem.getAttribute("occupied");

    if (closestGriditemoOccupation === null) {
      closestGridItem.setAttribute("occupied", `${randomPlayer}`);
      closestGridItem.classList.add("occupied");
    }
  };

  return (
    <>
      <div className="gridContainer" onClick={gridOccupation}>
        {gridItems}
      </div>
      <button onClick={onPress}>FINISH</button>
    </>
  );
};
