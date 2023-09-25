import Cell from "./Cell";
import Strike from "./Strike";

function Board({ cells, onCellClick, playerTurn, strikeClass }) {
    return (
        <div className="board">
            <Cell 
                onClick={()=> onCellClick(0)} 
                value={cells[0]} 
                className='right-border bottom-border' 
            />
            <Cell
                onClick={()=> onCellClick(1)} 
                value={cells[1]} 
                className='right-border bottom-border' 
            />
            <Cell
                onClick={()=> onCellClick(2)} 
                value={cells[2]} 
                className='bottom-border'
            />
            <Cell 
                onClick={()=> onCellClick(3)} 
                value={cells[3]}
                className='right-border bottom-border' 
            />
            <Cell 
                onClick={()=> onCellClick(4)}
                value={cells[4]} 
                className='right-border bottom-border' 
            />
            <Cell 
                onClick={()=> onCellClick(5)} 
                value={cells[5]} className='bottom-border' />
                <Cell onClick={()=> onCellClick(6)} value={cells[6]} 
                className='right-border' 
            />
            <Cell 
                onClick={()=> onCellClick(7)} 
                value={cells[7]} 
                className='right-border'
            />
            <Cell 
                onClick={()=> onCellClick(8)} 
                value={cells[8]} 
            />
            <Strike strikeClass={strikeClass} />
        </div>
      );
}

export default Board;