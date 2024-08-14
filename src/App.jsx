import React, { useState } from "react";
import { GridArea } from "./Components/GridArea";

const ROWS = 8;
const COLUMNS = 12;

function App() {
  // pending || started || finished
  const [gameState, useGameState] = useState("pending");

  const startGame = () => {
    useGameState("started");
  };

  const finshGame = () => {
    useGameState("finished");
  };

  const gameIsPending = gameState === "pending";
  const gameIsStarted = gameState === "started";
  const gameIsFinished = gameState === "finished";

  return (
    <>
      {gameIsPending && <button onClick={startGame}>START</button>}

      {gameIsStarted && (
        <GridArea
          rowsNumber={ROWS}
          columnsNumber={COLUMNS}
          onPress={finshGame}
        />
      )}

      {gameIsFinished && <h1>END OF GAME</h1>}
    </>
  );
}

export default App;
