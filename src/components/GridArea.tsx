import { MouseEventHandler, useEffect, useState } from "react";
import { GridItem } from "./GridItem";
import { directions } from "../utils/directions";
import { Coordinates, Direction, GridAreaProps, OccupiedSpots } from "../types";
import { ROWS } from "../constants";

export const range = (length: number) => {
  return Array.from({ length }, (_, i) => i);
};

export const coordinatesToSpotId = ({ x, y }: Coordinates) => {
  return `${x},${y}`;
};

export const spotIdToCoordinates = (spotId: string) => {
  const [x, y] = spotId.split(",");
  return { x: Number(x), y: Number(y) };
};

export const firstAvailableCell = (occupiedSpots: OccupiedSpots, x: number) => {
  const busySpots = Object.keys(occupiedSpots)
    .filter((spot) => spot.startsWith(`${x},`))
    .map(spotIdToCoordinates)
    .sort((a, b) => a.y - b.y);

  const firstBusyY = busySpots[0]?.y ?? null;

  if (firstBusyY === null) {
    return { x, y: ROWS - 1 };
  }

  if (firstBusyY === 0) {
    return null;
  }

  return { x, y: firstBusyY - 1 };
};

const collectInDirection = (
  occupiedSpots: OccupiedSpots,
  { x, y }: Coordinates,
  player: string,
  direction: ({ x, y }: Coordinates) => Coordinates
): number => {
  const pos = direction({ x, y });
  const key = `${pos.x},${pos.y}`;

  if (occupiedSpots[key] === player) {
    return (
      1 +
      collectInDirection(
        occupiedSpots,
        { x: pos.x, y: pos.y },
        player,
        direction
      )
    );
  }

  return 0;
};

export const GridArea = ({
  rowsNumber,
  columnsNumber,
  currentPlayer,
  switchTurn,
  gameStateFunction,
}: GridAreaProps) => {
  const [occupiedSpots, setOccupiedSpots] = useState<OccupiedSpots>({});
  const [gameWon, setGameWon] = useState(false);

  useEffect(() => {
    if (gameWon) {
      gameStateFunction("ended");
    }
  }, [gameWon, gameStateFunction]);

  console.log(range(5));

  const checkLine = (
    occupiedSpots: OccupiedSpots,
    { x, y }: Coordinates,
    player: string,
    [d1, d2]: Readonly<[Direction, Direction]>
  ) => {
    return [d1, d2]
      .map((direction) =>
        collectInDirection(occupiedSpots, { x, y }, player, direction)
      )
      .reduce((total, next) => total + next, 1);
  };

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
    const x = Number(target.getAttribute("data-column"));
    //@ts-expect-error
    const y = Number(target.getAttribute("data-row"));

    const validPosition = firstAvailableCell(occupiedSpots, x);

    if (validPosition === null) {
      return;
    }

    const spotId = coordinatesToSpotId(validPosition);

    const lines = [
      [directions.N, directions.S],
      [directions.W, directions.E],
      [directions.NW, directions.SE],
      [directions.NE, directions.SW],
    ] as const;

    setOccupiedSpots((prevOccupiedSpots) => {
      if (prevOccupiedSpots[spotId]) {
        return prevOccupiedSpots;
      } else {
        const updatedSpots = { ...prevOccupiedSpots, [spotId]: currentPlayer };

        return updatedSpots;
      }
    });

    if (
      lines.some(
        (line) => checkLine(occupiedSpots, { x, y }, currentPlayer, line) === 5
      )
    ) {
      setGameWon(true);
      return;
    }

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
