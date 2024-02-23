export default function Log({ moves, players }){
    return(
        <ol id="log">
            {moves.map(move => <li key={`${move[0]},${move[1]}`}>
                { move[2] === 'X' ? players[0] : players[1] } puts {move[2]} on square ({move[0]},{move[1]})
            </li>)}
        </ol>
    );
}