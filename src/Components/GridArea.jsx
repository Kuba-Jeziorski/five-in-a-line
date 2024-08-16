import React from "react";
import { GridItem } from "./GridItem";
import { COLUMNS, ROWS } from "../Constants";

export const GridArea = ({
  rowsNumber,
  columnsNumber,
  currentPlayer,
  setCurrentPlayer,
}) => {
  const gridCreation = (rows, columns) => {
    let gridItems = [];

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        gridItems.push(
          <GridItem
            key={`${i}${j}`}
            row={i}
            column={j}
            currentPlayer={currentPlayer}
          />
        );
      }
    }

    return gridItems;
  };

  const gridOccupation = (event) => {
    const { target } = event;
    const targetItemColumn = Number(
      target.closest(".gridItem").getAttribute("column")
    );

    const allGridItems = document.querySelectorAll(".gridItem");
    const reversedAllGridItems = [...allGridItems].reverse();

    for (const item of reversedAllGridItems) {
      const itemColumn = Number(item.getAttribute("column"));
      const itemNotOccupied = item.getAttribute("occupied") === null;
      const equalColumns = itemColumn === targetItemColumn;

      if (equalColumns && itemNotOccupied) {
        item.setAttribute("occupied", `${currentPlayer}`);
        break;
      }
    }

    setCurrentPlayer((p) => {
      return p === "player1" ? "player2" : "player1";
    });
  };

  const gridItems = gridCreation(rowsNumber, columnsNumber);

  return (
    <>
      <div className="gridContainer" onClick={gridOccupation}>
        {gridItems}
      </div>
    </>
  );
};
