export type Coordinates = {
  x: number;
  y: number;
};

export type Direction = ({ x, y }: Coordinates) => {
  x: number;
  y: number;
};

export type GameState = "pending" | "player1-turn" | "player2-turn" | "ended";

export type GridAreaProps = {
  rowsNumber: number;
  columnsNumber: number;
  currentPlayer: string | null;
  switchTurn: () => void;
  gameStateFunction: (state: GameState) => void;
};

export type GridItemProps = {
  row: number;
  column: number;
  occupied: string | null;
};

export type OccupiedSpots = Record<string, string>;
