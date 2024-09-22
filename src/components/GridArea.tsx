import { MouseEventHandler, useEffect, useState } from "react";
import { GridItem } from "./GridItem";
import { directions } from "../utils/directions";
import {
  Coordinates,
  CoordinateString,
  Direction,
  GridAreaProps,
  OccupiedSpots,
  PlayerId,
} from "../types";
import { ROWS } from "../constants";

export const range = (length: number) => {
  if (length >= 0) {
    return Array.from({ length }, (_, i) => i);
  }
  throw new Error(`Length has to be more or equal to 0`);
};

export const coordinatesToSpotId = ({
  x,
  y,
}: Coordinates): CoordinateString => {
  if (x >= 0 && y >= 0) {
    return `${x},${y}` as CoordinateString;
  }
  throw new Error(`Coordinates are outside the playing field! (1)`);
};

export const spotIdToCoordinates = (spotId: CoordinateString) => {
  const [x, y] = spotId.split(",");
  if (Number(x) >= 0 && Number(y) >= 0) {
    return { x: Number(x), y: Number(y) };
  }
  throw new Error(`Coordinates are outside the playing field! (2)`);
};

export const firstAvailableCell = (occupiedSpots: OccupiedSpots, x: number) => {
  const keys = [...occupiedSpots.keys()];
  if (!keys.every((key) => key.match(/\d+,\d+/))) {
    throw new Error(`Some keys don't match the pattern.`);
  }
  const busySpots = keys
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
  try {
    const key = coordinatesToSpotId(pos);
    if (occupiedSpots.get(key) === player) {
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
  } catch (e) {
    console.log(e);
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
  const [occupiedSpots, setOccupiedSpots] = useState<OccupiedSpots>(new Map());
  const [gameWon, setGameWon] = useState(false);

  useEffect(() => {
    if (gameWon) {
      gameStateFunction("ended");
    }
  }, [gameWon, gameStateFunction]);

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
    // @ ts-expect-error

    const validPosition = firstAvailableCell(occupiedSpots, x);

    // @ ts-expect-error
    const y = validPosition?.y;

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
      if (prevOccupiedSpots.get(spotId)) {
        return prevOccupiedSpots;
      } else {
        const updatedSpots = new Map(prevOccupiedSpots);
        updatedSpots.set(spotId, currentPlayer);
        return updatedSpots;
      }
    });

    if (typeof y === "number") {
      if (
        lines.some(
          (line) =>
            checkLine(occupiedSpots, { x, y }, currentPlayer, line) === 5
        )
      ) {
        setGameWon(true);
        return;
      }
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
                occupied={occupiedSpots.get(
                  coordinatesToSpotId({ x: column, y: row })
                )}
              />
            );
          });
        })}
      </div>
    </>
  );
};
