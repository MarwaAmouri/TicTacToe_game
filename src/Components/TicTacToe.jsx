import React, { Component } from 'react';
import Board from './Board';
import "./TicTacToe.css";
import oPlayer1 from '../man.png';
import xPlayer1 from '../man (1).png';
import xPlayer2 from '../cancel.png';
import oPlayer2 from '../letter-o.png';
import vs from '../vs.png';

class TicTacToe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cells: Array(9).fill(null),
      xIsNext: true,
      round: 1,
      xScore: 0,
      oScore: 0,
      timer: 0,
      isGameWon: false,
    };

    this.interval = null;
  }

  componentDidMount() {
    this.startTimer();
  }

  startTimer = () => {
    this.interval = setInterval(() => {
      this.setState((prevState) => ({
        timer: prevState.timer + 1,
      }));
    }, 1000);
  };

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  handleClick = (index) => {
    const { cells, xIsNext, round, isGameWon } = this.state;

    if (isGameWon || cells[index]) {
        return;
    }

    const newCells = [...cells];
    newCells[index] = xIsNext ? 'X' : 'O';

    const winner = this.calculateWinner(newCells);

    if (winner) {
        this.setState((prevState) => ({
          cells: newCells,
          xScore: winner === 'X' ? prevState.xScore + 1 : prevState.xScore,
          oScore: winner === 'O' ? prevState.oScore + 1 : prevState.oScore,
          isGameWon: true,
        }));
      } else {
        this.setState({
          cells: newCells,
          xIsNext: !xIsNext,
        });
      }
    };

    calculateWinner = (squares) => {
      const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];
  
      for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
          clearInterval(this.interval);
          return squares[a];
        } 
      }
  
      return null;
    };

    nextRound = () => {
      clearInterval(this.interval);
      this.setState((prevState) => ({
        cells: Array(9).fill(null),
        xIsNext: true,
        round: prevState.round + 1,
        timer: 0,
        isGameWon: false,
      }));
      this.startTimer();
    };

    restartGame = () => {
      clearInterval(this.interval);
      this.setState((prevState) => ({
        cells: Array(9).fill(null),
        xIsNext: true,
        round: 1,
        xScore: 0,
        oScore: 0,
        timer: 0,
        isGameWon: false,
      }));
      this.startTimer();
    };

  render() {
    const { cells, xIsNext, round, xScore, oScore, timer, isGameWon } = this.state;

    const winner = this.calculateWinner(cells);
    const status = winner ? `Winner: ${winner}` : `Next player: ${xIsNext ? 'X' : 'O'}`;
    
    return (
      <div className='container'>
        <div className='game-info'>
          <h4>Timer: {timer} second</h4>
          <h4>Round: {round}</h4>
          <h4>{status} </h4>
          <div className='btn'>
            <button className='next' onClick={this.nextRound}>Next</button>
            <button className='reset' onClick={this.restartGame}>Reset</button>
          </div>
        </div>
        <div className='board-container'>
          <div className='score-container'>
            <img src={xPlayer1} alt="" />
            <img className='x' src={xPlayer2} alt="" />
            <h2>{xScore}</h2>
            <img src={vs} alt="" />
            <h2>{oScore}</h2>
            <img className='o' src={oPlayer2} alt="" />
            <img src={oPlayer1} alt="" />
          </div>
          <Board
            cells={cells}
            onClick={(index) => this.handleClick(index)}
          />
        </div>
      </div>
    );
  }
}

export default TicTacToe;
