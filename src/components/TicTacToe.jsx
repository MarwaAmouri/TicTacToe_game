import { useState, useEffect } from "react";
import Board from "./Board";
import GameWinner from "./gameWinner";
import GameState from "./GameState";
import ResetGame from "./ResetGame";
import NextRound from "./NextRound";
import oPlayer1 from '../man.png';
import xPlayer1 from '../man (1).png';
import xPlayer2 from '../cancel.png';
import oPlayer2 from '../letter-o.png';
import vs from '../vs.png';

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

function TicTacToe() {
    const [cells, setCells] = useState(Array(9).fill(null));
    const [playerTurn, setPlayerTurn] = useState(PLAYER_X);
    const [strikeClass, setStrikeClass] = useState("");
    const [gameState, setGameState] = useState(GameState.inProgress);
    const [timer, setTimer] = useState(0);
    const [scores, setScores] = useState({ X: 0, O: 0 });
    
    const checkWinner = (cells, setStrikeClass, setGameState) => {
    for (const { pos, strikeClass } of WIN_CONDITIONS) {
        if(
            cells[pos[0]] !== null && 
            cells[pos[0]] === cells[pos[1]] &&
            cells[pos[0]] === cells[pos[2]]
        ) { 
            setTimer(0);
            setStrikeClass(strikeClass);
            if(cells[pos[0]] === PLAYER_X) {
                setGameState(GameState.playerXWins);
                setScores({ ...scores, X: scores.X + 1 });
            } else {
                setGameState(GameState.playerOWins);
                setScores({ ...scores, O: scores.O + 1 });
            }
            return;
        }
    }
}

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

    const handleNextRound = ()=> {
        setGameState(GameState.inProgress);
        setCells(Array(9).fill(null));
        setPlayerTurn(PLAYER_X);
        setStrikeClass(null);
        setScores({ X: 0, O: 0 });
        setTimer(0);
    }

    const handleReset = ()=> {
        setGameState(GameState.inProgress);
        setCells(Array(9).fill(null));
        setPlayerTurn(PLAYER_X);
        setStrikeClass(null);
        setTimer(0);
    }

    useEffect(() => {
        checkWinner(cells, setStrikeClass, setGameState);
    }, [cells]);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimer(timer + 1);
        }, 1000);
    
        return () => clearInterval(interval);
    }, [timer]);

    return ( 
        <div className="container">
            <div className="game-info">
                <h4>Timer: {timer}</h4>
                <h4>Next Player {playerTurn}</h4>
                <GameWinner gameState={gameState} />
                <div className="btn">
                    <ResetGame gameState={gameState} onReset={handleNextRound} />  
                    <NextRound gameState={gameState} onReset={handleReset} /> 
                </div>
            </div>
            <div className="board-container">
                <div className="score-container">
                    <img src={xPlayer1} alt="" />
                    <img className='x' src={xPlayer2} alt="" />
                    <h2>{scores.X}</h2>
                    <img src={vs} alt="" />
                    <h2>{scores.O}</h2>
                    <img className='o' src={oPlayer2} alt="" />
                    <img src={oPlayer1} alt="" />
                </div>
                <Board
                cells={cells}
                onCellClick={handleCellClick} 
                strikeClass={strikeClass}
                 />
            </div>
        </div>
     );
}

export default TicTacToe;