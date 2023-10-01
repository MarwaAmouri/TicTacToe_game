function Cell({ className, value, onClick }) {
    return ( 
        <button onClick={onClick} className={`cell ${className}`}>
            {value}
        </button>
    );
}

export default Cell;