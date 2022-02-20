import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

class Cell extends React.Component {
    constructor() {
        super();
        this.state = {
            isActive: false,
        };
        this.toggleActive = this.toggleActive.bind(this);
        this.mouseDown = this.mouseDown.bind(this);
    }

    toggleActive() {
        this.setState((prevState) => ({
            isActive: !prevState.isActive,
        }));
    }

    mouseDown() {
        console.log("mouseDown");
    }

    render() {
        return (
            <button
                className={
                    this.state.isActive
                        ? "cell cell-active"
                        : "cell cell-inactive"
                }
                onClick={this.toggleActive}
                onMouseDown={this.mouseDown}
            ></button>
        );
    }
}

const numCols = 12;
const numRows = 12;

class CellGrid extends React.Component {
    cellGridRow() {
        let cells = new Array(numCols).fill(<Cell />);
        return cells;
    }

    render() {
        return (
            <div>
                {new Array(numRows).fill(
                    <div className="cell-grid-row">{this.cellGridRow()}</div>
                )}
            </div>
        );
    }
}

function App() {
    return <CellGrid />;
}

ReactDOM.render(<App />, document.getElementById("root"));
