import { useState, useEffect } from "react";
import Board from "./Board";
import ScoreBoard from "./ScoreBoard";
import GameState from "./GameState";
import ResetGame from "./ResetGame";

const PLAYER_X = "X";
const PLAYER_O = "O";

const WIN_CONDITIONS = [
    { pos:[0, 1, 2], strikeClass: "strike-row-1" },
    { pos:[3, 4, 5], strikeClass: "strike-row-2" },
    { pos:[6, 7, 8], strikeClass: "strike-row-3" },
    { pos:[0, 3, 6], strikeClass: "strike-column-1" },
    { pos:[1, 4, 7], strikeClass: "strike-column-2" },
    { pos:[2, 5, 8], strikeClass: "strike-column-3" },
    { pos:[0, 4, 8], strikeClass: "strike-diagonal-1" },
    { pos:[2, 4, 6], strikeClass: "strike-diagonal-2" }
]

function checkWinner(cells, setStrikeClass, setGameState) {
    for (const { pos, strikeClass } of WIN_CONDITIONS) {
        const cellValue1 = cells[pos[0]];
        const cellValue2 = cells[pos[1]];
        const cellValue3 = cells[pos[2]];

        if(
            cellValue1 !== null && 
            cellValue1 === cellValue2 &&
            cellValue1 === cellValue3
        ) {
            setStrikeClass(strikeClass);
            if(cellValue1 === PLAYER_X) {
                setGameState(GameState.playerXWins);
            } else {
                setGameState(GameState.playerOWins);
            }
            return;
        }
    }
}

function TicTacToe() {
    const [cells, setCells] = useState(Array(9).fill(null));
    const [playerTurn, setPlayerTurn] = useState(PLAYER_X);
    const [strikeClass, setStrikeClass] = useState("");
    const [gameState, setGameState] = useState(GameState.inProgress);


    const handleCellClick = (index) => {
        if (gameState !== GameState.inProgress) {
            return;
        }

        if (cells[index] !== null) {
            return;
        }

        let newCells = [...cells];
        newCells[index] = playerTurn;
        setCells(newCells);
        if (playerTurn === PLAYER_X) {
            setPlayerTurn(PLAYER_O);
        } else {
            setPlayerTurn(PLAYER_X);
        }
    };

    const handleReset = ()=> {
        setGameState(GameState.inProgress);
        setCells(Array(9).fill(null));
        setPlayerTurn(PLAYER_X);
        setStrikeClass(null);
    }

    useEffect(() => {
        checkWinner(cells, setStrikeClass, setGameState);
    }, [cells]);

    return ( 
        <div>
            <ScoreBoard gameState={gameState}/>
            <Board
                playerTurn={playerTurn}
                cells={cells}
                onCellClick={handleCellClick} 
                strikeClass={strikeClass}
            />
            <ResetGame gameState={gameState} onReset={handleReset} />
        </div>
     );
}

export default TicTacToe;