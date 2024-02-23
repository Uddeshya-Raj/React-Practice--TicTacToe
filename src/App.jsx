import { useState } from "react";
import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import Log from "./components/log";
import { WINNING_COMBINATIONS } from "./winning-combinations";
import GameOver from "./components/GameOver";

const board = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function App() {
  const [playerNames, changePlayerNames] = useState(["Player 1", "Player 2"]);
  const [movesList, setMovesList] = useState([]);
  let activePlayer = movesList[0] ? (movesList[0][2] === "X" ? "O" : "X") : "X"; // activePLayer is derived from previous state of movesList

  let newBorad = [...board.map((row) => [...row])];
  movesList.forEach((move) => {
    newBorad[move[0]][move[1]] = move[2];
  });

  let winner;

  WINNING_COMBINATIONS.forEach((combination) => {
    let sq1 = newBorad[combination[0].row][combination[0].column];
    let sq2 = newBorad[combination[1].row][combination[1].column];
    let sq3 = newBorad[combination[2].row][combination[2].column];
    if (sq1 !== null && sq1 === sq2 && sq1 === sq3) winner = sq1;
  });
  if((winner === undefined) && (movesList.length === 9)) winner = 'Draw';

  function handleSquareSelect(row, col) {
    // update movesList
    setMovesList((currMovesList) => {
      let currentPlayer = currMovesList[0]
        ? currMovesList[0][2] === "X"
          ? "O"
          : "X"
        : "X"; // currentPlayer is derived from current state of movesList
      let updatedMovesList = [
        [row, col, currentPlayer],
        ...currMovesList.map((move) => [...move]),
      ];
      return updatedMovesList;
    });
  }

  function handleRestart(){
    setMovesList([]);
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            name="Player 1"
            symbol="X"
            onNameChange={changePlayerNames}
            isActive={activePlayer === "X"}
          />
          <Player
            name="Player 2"
            symbol="O"
            onNameChange={changePlayerNames}
            isActive={activePlayer === "O"}
          />
        </ol>
        {(winner !== undefined) && <GameOver result={winner} players={playerNames} gameRestartFunction={handleRestart}/>}
        <GameBoard onSquareSelect={handleSquareSelect} board={newBorad} />
      </div>
      <Log moves={movesList} players={playerNames} />
    </main>
  );
}

export default App;
