export default function GameOver({ result, players, gameRestartFunction }) {
  let message;
  if (result === "X") message = `${players[0]} won the match`;
  else if (result === "O") message = `${players[1]} won the match`;
  else if (result === "Draw") message = `It's a draw`;

  return (
    <div id="game-over">
      <h2>Game Over</h2>
      <p>{message}</p>
      <p>
        <button onClick={gameRestartFunction}>Rematch</button>
      </p>
    </div>
  );
}
