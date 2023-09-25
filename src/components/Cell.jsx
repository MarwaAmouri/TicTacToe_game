function Cell({ className, value, onClick }) {
    const style = value === "X" ? "cell x" : "cell o";

    return ( 
        <button onClick={onClick} className={`cell style ${className}`}>
            {value}
        </button>
    );
}

export default Cell;