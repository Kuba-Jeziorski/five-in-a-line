import { GameState } from "../types";
import { gameStateToPlayerId } from "../utils/gameStateToPlayerId";

test("Properly changes 'player1-turn' to '1' ", () => {
  expect(gameStateToPlayerId("player1-turn")).toBe("1");
});

test("Properly changes 'player2-turn' to '2' ", () => {
  expect(gameStateToPlayerId("player2-turn")).toBe("2");
});

test("Returns null for other present values in GameState type", () => {
  expect(gameStateToPlayerId("pending")).toBeNull();
  expect(gameStateToPlayerId("ended")).toBeNull();
});
