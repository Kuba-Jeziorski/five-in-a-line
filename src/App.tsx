import React, { useState } from "react";
import { GridArea } from "./components/GridArea";
import { COLUMNS, ROWS } from "./constants";
import { GameState } from "./types";
import { gameStateToPlayerId } from "./utils/gameStateToPlayerId";

function App() {
  const [gameState, setGameState] = useState<GameState>("pending");

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

  const finshGame = () => {
    setGameState("ended");
  };

  const gameIsPending = gameState === "pending";
  const gameIsStarted =
    gameState === "player1-turn" || gameState === "player2-turn";
  const gameIsFinished = gameState === "ended";

  const currentPlayer = gameStateToPlayerId(gameState);

  return (
    <>
      {gameIsPending && <button onClick={startGame}>START</button>}

      {gameIsStarted && (
        <>
          <GridArea
            rowsNumber={ROWS}
            columnsNumber={COLUMNS}
            currentPlayer={currentPlayer}
            switchTurn={switchTurn}
          />
          <button onClick={finshGame}>FINISH</button>
        </>
      )}

      {gameIsFinished && <h1>END OF GAME</h1>}
    </>
  );
}

export default App;
