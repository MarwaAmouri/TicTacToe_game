import GameState from "./GameState";
function GameWinner({ gameState }) {
    switch (gameState) {
        case GameState.inProgress:
            return <div></div>;
            case GameState.playerXWins:
                return <h4> X Wins</h4>;
            case GameState.playerOWins:
                return <h4>O Wins</h4>;
            default:
                return <div></div>;
    }
}

export default GameWinner;