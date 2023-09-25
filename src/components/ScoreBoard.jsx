import GameState from "./GameState";
function ScoreBoard({ gameState }) {
    switch (gameState) {
        case GameState.inProgress:
            return <div className="game-over"></div>;
            case GameState.playerXWins:
                return <div className="game-over"> X Wins</div>;
            case GameState.playerOWins:
                return <div className="game-over"> O Wins</div>;
            default:
                return <div className="game-over"></div>;
    }
}

export default ScoreBoard;