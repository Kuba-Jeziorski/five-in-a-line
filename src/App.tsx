import React, { useEffect, useState } from "react";
import { GridArea } from "./components/GridArea";
import { COLUMNS, ROWS } from "./constants";
import { GameState } from "./types";
import { gameStateToPlayerId } from "./utils/gameStateToPlayerId";
import { StartComponent } from "./components/StartComponent";
import { FinishComponent } from "./components/FinishComponent";

function App() {
  const [gameState, setGameState] = useState<GameState>("pending");
  const [winner, setWinner] = useState("");

  useEffect(() => {
    if (gameState === "player1-turn") {
      setWinner((prev) => (prev = "Player1"));
    } else if (gameState === "player2-turn") {
      setWinner((prev) => (prev = "Player2"));
    } else {
      return;
    }
  }, [gameState, winner]);

  const startGame = () => {
    setGameState("player1-turn");
  };

  const switchTurn = () => {
    if (gameState === "player1-turn") {
      setGameState("player2-turn");
    }
    if (gameState === "player2-turn") {
      setGameState("player1-turn");
    }
  };

  const gameIsPending = gameState === "pending";
  const gameIsStarted =
    gameState === "player1-turn" || gameState === "player2-turn";
  const gameIsFinished = gameState === "ended";

  const currentPlayer = gameStateToPlayerId(gameState);

  return (
    <>
      {gameIsPending && (
        <StartComponent>
          <button onClick={startGame}>START</button>
        </StartComponent>
      )}

      {gameIsStarted && (
        <>
          <GridArea
            rowsNumber={ROWS}
            columnsNumber={COLUMNS}
            currentPlayer={currentPlayer}
            switchTurn={switchTurn}
            gameStateFunction={setGameState}
          />
        </>
      )}

      {gameIsFinished && <FinishComponent winner={winner} />}
    </>
  );
}

export default App;
