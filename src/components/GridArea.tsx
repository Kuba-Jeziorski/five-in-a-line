import { MouseEventHandler, useEffect, useState } from "react";
import { GridItem } from "./GridItem";
import { directions } from "../utils/directions";
import { GameState } from "../types";
import { ROWS } from "../constants";

type Props = {
  rowsNumber: number;
  columnsNumber: number;
  currentPlayer: string | null;
  switchTurn: () => void;
  gameStateFunction: (state: GameState) => void;
};

type Coordinates = {
  x: number;
  y: number;
};

type Direction = ({ x, y }: Coordinates) => {
  x: number;
  y: number;
};

type OccupiedSpots = Record<string, string>;

const range = (length: number) => {
  return Array.from({ length }, (_, i) => i);
};

const coordinatesToSpotId = ({ x, y }: Coordinates) => {
  return `${x},${y}`;
};

const spotIdToCoordinates = (spotId: string) => {
  const [x, y] = spotId.split(",");
  return { x: Number(x), y: Number(y) };
};

const firstAvailableCell = (occupiedSpots: OccupiedSpots, x: number) => {
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
}: Props) => {
  const [occupiedSpots, setOccupiedSpots] = useState<OccupiedSpots>({});
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
    //@ts-expect-error
    const y = Number(target.getAttribute("data-row"));

    const validPosition = firstAvailableCell(occupiedSpots, x);

    if (validPosition === null) {
      return;
    }

    // const spotId = coordinatesToSpotId({ x, y });
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
