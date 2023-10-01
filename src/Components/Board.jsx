import React, { Component } from "react";
import Cell from "./Cell";
import "./Board.css";
export default class Board extends Component {
   render() {
      return (
         <div className="board">
            <Cell 
                value={this.props.cells[0]}
                onClick={() => this.props.onClick(0)}
                className="right-border bottom-border"
            />
            <Cell
                value={this.props.cells[1]}
                onClick={() => this.props.onClick(1)}
                className="right-border bottom-border" 
            />
            <Cell 
                value={this.props.cells[2]}
                onClick={() => this.props.onClick(2)}
                className="bottom-border"
            />
            <Cell 
                value={this.props.cells[3]}
                onClick={() => this.props.onClick(3)}
                className="right-border bottom-border" 
            />
            <Cell 
                value={this.props.cells[4]}
                onClick={() => this.props.onClick(4)}
                className="right-border bottom-border" 
            />
            <Cell 
                value={this.props.cells[5]}
                onClick={() => this.props.onClick(5)}
                className="bottom-border"
            />
            <Cell 
                value={this.props.cells[6]}
                onClick={() => this.props.onClick(6)}
                className="right-border" 
            />
            <Cell 
                value={this.props.cells[7]}
                onClick={() => this.props.onClick(7)}
                className="right-border"
            />
            <Cell 
                value={this.props.cells[8]}
                onClick={() => this.props.onClick(8)} 
            />
         </div>
      );
   }
}
