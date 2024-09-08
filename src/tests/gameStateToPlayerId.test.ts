import { GameState } from "../types";
import { gameStateToPlayerId } from "../utils/gameStateToPlayerId";

test("Properly changes 'player1-turn' to '1' ", () => {
  expect(gameStateToPlayerId("player1-turn")).toBe("1");
});

test("Properly changes 'player2-turn' to '2' ", () => {
  expect(gameStateToPlayerId("player2-turn")).toBe("2");
});

test("Returns null for 'player3-turn'", () => {
  expect(gameStateToPlayerId("player3-turn" as GameState)).toBeNull();
});

test("Returns null for other present values in GameState type", () => {
  expect(gameStateToPlayerId("pending")).toBeNull();
  expect(gameStateToPlayerId("ended")).toBeNull();
});

test("Returns null for undefined input", () => {
  expect(gameStateToPlayerId(undefined as unknown as GameState)).toBeNull();
});

test("Returns null for null input", () => {
  expect(gameStateToPlayerId(null as unknown as GameState)).toBeNull();
});
