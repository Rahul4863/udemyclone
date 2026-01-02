const GameWidget = ({ board, moveTile, shuffleBoard, message }) => (
    <div className="col-md-3">
        <div className="widget-box text-center">
            <h6>Try your Logical Brain...</h6>

            <div className="num-box mt-2">
                {board.map((num, index) => (
                    <div
                        key={index}
                        className={`num-tile ${num === null ? "blank-tile" : ""}`}
                        onClick={() => moveTile(index)}
                    >
                        {num}
                    </div>
                ))}
            </div>

            <a className="mt-2 d-block" href="#" onClick={shuffleBoard}>
                Reload
            </a>

            {message && <p className="text-success fw-bold mt-2">{message}</p>}
        </div>
    </div>
);

export default GameWidget;
