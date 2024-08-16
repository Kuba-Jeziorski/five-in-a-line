import React, { useState } from "react";
import { GridArea } from "./Components/GridArea";
import { COLUMNS, ROWS } from "./Constants";

function App() {
  // pending || started || finished
  const [gameState, useGameState] = useState("pending");
  const [currentPlayer, setCurrentPlayer] = useState(null);

  const startGame = () => {
    useGameState("started");
    setCurrentPlayer("player1");
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
        <>
          <GridArea
            rowsNumber={ROWS}
            columnsNumber={COLUMNS}
            currentPlayer={currentPlayer}
            setCurrentPlayer={setCurrentPlayer}
          />
          <button onClick={finshGame}>FINISH</button>
        </>
      )}

      {gameIsFinished && <h1>END OF GAME</h1>}
    </>
  );
}

export default App;
