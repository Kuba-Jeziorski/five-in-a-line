import { MouseEventHandler, useState } from "react";
import { GridItem } from "./GridItem";
import { ROWS } from "../constants";

type Props = {
  rowsNumber: number;
  columnsNumber: number;
  currentPlayer: string | null;
  switchTurn: () => void;
};

const range = (length: number) => {
  return Array.from({ length }, (_, i) => i);
};
type Coordinates = {
  x: number;
  y: number;
};

const coordinatesToSpotId = ({ x, y }: Coordinates) => {
  return `${x},${y}`;
};

const minimalX = 0;
const minimalY = 0;
const maximalX = 11;
const maximalY = 8;

type OccupationObject = {
  [key: string]: string;
};

const isOccupiedWest = (
  spotId: string,
  occupiedSpots: OccupationObject,
  currentPlayer: string,
  occupationObj: OccupationObject
) => {
  let [x, y] = spotId.split(",");

  const xAsNumber = Number(x);
  const yAsNumber = Number(y);

  if (xAsNumber === maximalX) {
    return;
  }

  const westNeighborKey = `${xAsNumber + 1},${yAsNumber}`;

  if (!(spotId in occupationObj)) {
    occupationObj[spotId] = currentPlayer;
  }

  if (
    occupiedSpots[westNeighborKey] &&
    occupiedSpots[westNeighborKey] === currentPlayer
  ) {
    console.log(`Added element: "${spotId}": "${currentPlayer}"`);
    occupationObj[spotId] = currentPlayer;
  }
};

// const fiveHorizontally = () => {
//   return 1;
// };

export const GridArea = ({
  rowsNumber,
  columnsNumber,
  currentPlayer,
  switchTurn,
}: Props) => {
  const [occupiedSpots, setOccupiedSpots] = useState<Record<string, string>>(
    {}
  );

  const gridOccupation: MouseEventHandler<HTMLDivElement> = (event) => {
    const { target } = event;

    if (currentPlayer === null) {
      return;
    }
    //@ts-expect-error
    if (target.matches(".gridContainer")) {
      return;
    }

    //@ts-expect-error
    const x = target.getAttribute("data-column");
    //@ts-expect-error
    const y = target.getAttribute("data-row");

    const spotId = coordinatesToSpotId({ x, y });

    const occupationObj = {};

    setOccupiedSpots((prevOccupiedSpots) => {
      if (prevOccupiedSpots[spotId]) {
        return prevOccupiedSpots;
      } else {
        const updatedSpots = { ...prevOccupiedSpots, [spotId]: currentPlayer };
        // return { ...p, [spotId]: currentPlayer };
        isOccupiedWest(spotId, occupiedSpots, currentPlayer, occupationObj);

        return updatedSpots;
      }
    });

    switchTurn();
  };

  return (
    <>
      <div className="gridContainer" onClick={gridOccupation}>
        {range(rowsNumber).map((row) => {
          return range(columnsNumber).map((column) => {
            return (
              <GridItem
                key={`${row}-${column}`}
                row={row}
                column={column}
                occupied={
                  occupiedSpots[coordinatesToSpotId({ x: column, y: row })]
                }
              />
            );
          });
        })}
      </div>
    </>
  );
};
