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
  currentPlayer: PlayerId | null;
  switchTurn: () => void;
  gameStateFunction: (state: GameState) => void;
};

export type GridItemProps = {
  row: number;
  column: number;
  occupied: string | undefined;
};

export type CoordinateString = `${number},${number}`;

export type PlayerId = "1" | "2";

// export type OccupiedSpots = Record<CoordinateString, PlayerId>;
export type OccupiedSpots = Map<CoordinateString, PlayerId>;

export type Winner = { winner: string };
