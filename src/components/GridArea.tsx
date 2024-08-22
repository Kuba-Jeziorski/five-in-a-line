import { MouseEventHandler } from "react";
import { GridItem } from "./GridItem";

type Props = {
  rowsNumber: number;
  columnsNumber: number;
  currentPlayer: string | null;
  switchTurn: () => void;
};

export const GridArea = ({
  rowsNumber,
  columnsNumber,
  currentPlayer,
  switchTurn,
}: Props) => {
  const gridCreation = (rows: number, columns: number) => {
    let gridItems = [];

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        gridItems.push(<GridItem key={`${i}${j}`} row={i} column={j} />);
      }
    }

    return gridItems;
  };

  const gridOccupation: MouseEventHandler<HTMLDivElement> = (event) => {
    const { target } = event;
    const targetItemColumn = Number(
      //@ts-expect-error
      target.closest(".gridItem").getAttribute("data-column")
    );

    const allGridItems = document.querySelectorAll(".gridItem");
    const reversedAllGridItems = [...allGridItems].reverse();

    for (const item of reversedAllGridItems) {
      const itemColumn = Number(item.getAttribute("data-column"));
      const itemNotOccupied = item.getAttribute("data-occupied") === null;
      const equalColumns = itemColumn === targetItemColumn;

      if (equalColumns && itemNotOccupied) {
        item.setAttribute("data-occupied", `${currentPlayer}`);
        break;
      }
    }

    switchTurn();
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
