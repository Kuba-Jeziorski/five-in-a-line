import { MouseEventHandler, useEffect, useState } from "react";
import { GridItem } from "./GridItem";
import { directions } from "../utils/directions";
import { GameState } from "../types";

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

const range = (length: number) => {
  return Array.from({ length }, (_, i) => i);
};

const coordinatesToSpotId = ({ x, y }: Coordinates) => {
  return `${x},${y}`;
};

export const GridArea = ({
  rowsNumber,
  columnsNumber,
  currentPlayer,
  switchTurn,
  gameStateFunction,
}: Props) => {
  const [occupiedSpots, setOccupiedSpots] = useState<Record<string, string>>(
    {}
  );
  const [gameWon, setGameWon] = useState(false);

  useEffect(() => {
    if (gameWon) {
      gameStateFunction("ended");
    }
  }, [gameWon, gameStateFunction]);

  const collectInDirection = (
    { x, y }: Coordinates,
    player: string,
    direction: ({ x, y }: Coordinates) => Coordinates
  ): number => {
    const pos = direction({ x, y });
    const key = `${pos.x},${pos.y}`;

    if (occupiedSpots[key] === player) {
      return 1 + collectInDirection({ x: pos.x, y: pos.y }, player, direction);
    }

    return 0;
  };

  const checkLine = (
    { x, y }: Coordinates,
    player: string,
    [d1, d2]: [Direction, Direction]
  ) => {
    return [d1, d2]
      .map((direction) => collectInDirection({ x, y }, player, direction))
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

    const spotId = coordinatesToSpotId({ x, y });

    setOccupiedSpots((prevOccupiedSpots) => {
      if (prevOccupiedSpots[spotId]) {
        return prevOccupiedSpots;
      } else {
        const updatedSpots = { ...prevOccupiedSpots, [spotId]: currentPlayer };

        return updatedSpots;
      }
    });

    const countVertical = checkLine({ x, y }, currentPlayer, [
      directions.N,
      directions.S,
    ]);
    const countHorizontal = checkLine({ x, y }, currentPlayer, [
      directions.W,
      directions.E,
    ]);
    const countDiagonalNW = checkLine({ x, y }, currentPlayer, [
      directions.NW,
      directions.SE,
    ]);
    const countDiagonalNE = checkLine({ x, y }, currentPlayer, [
      directions.NE,
      directions.SW,
    ]);

    const allCounts = [
      countVertical,
      countHorizontal,
      countDiagonalNW,
      countDiagonalNE,
    ];

    if (allCounts.some((count) => count === 5)) {
      setGameWon(true);
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
