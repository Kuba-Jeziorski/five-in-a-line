import { GameState } from "../types";

export const gameStateToPlayerId = (state: GameState) => {
  if (state === "player1-turn") {
    return "1";
  }

  if (state === "player2-turn") {
    return "2";
  }

  return null;
};
