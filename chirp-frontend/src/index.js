import React from "react";
import ReactDOM from "react-dom";
import * as Tone from "tone";
import "./index.css";

function Cell(props) {
    const className =
        "cell " + (props.isActive ? "cell-active" : "cell-inactive");
    return <button className={className} onClick={props.onClick}>{props.value}</button>;
}

const numRows = 12;
const numCols = 12;
class App extends React.Component {
    constructor() {
        super();
        const cellsAreActive = new Array(numRows);
        for (let i = 0; i < numRows; i++) {
            cellsAreActive[i] = new Array(numCols).fill(false);
        }
        this.state = {
            isPlaying: true,
            cellsAreActive: cellsAreActive,
        };
        this.togglePlayStop = this.togglePlayStop.bind(this);
        this.playNote = this.playNote.bind(this);
        this.toggleActive = this.toggleActive.bind(this);
        this.synth = new Tone.Synth().toDestination();
    }

    cellGridRow(i) {
        let row = new Array(numCols);
        for (let j = 0; j < numCols; j++) {
            row[j] = (
                <Cell
                    isActive={this.state.cellsAreActive[i][j]}
                    onClick={() => this.toggleActive(i, j)}
                    value={String(i) + "-" + String(j)}
                />
            );
        }
        return row;
    }

    playNote(note = "A4") {
        Tone.Transport.start();
        this.synth.triggerAttackRelease(note, "8n");
    }

    togglePlayStop() {
        this.setState((prevState) => ({
            isPlaying: !prevState.isPlaying,
        }));
    }

    toggleActive(i, j) {
        const cellsAreActive = this.state.cellsAreActive.slice();
        cellsAreActive[i][j] = !cellsAreActive[i][j];
        this.setState(() => ({
            cellsAreActive: cellsAreActive,
        }));
    }

    render() {
        let rows = new Array(numRows);
        for (let i = 0; i < numRows; i++) {
            rows[i] = (
                <div className="cell-grid-row">{this.cellGridRow(i)}</div>
            );
        }
        return (
            <div>
                {rows}
                <div>
                    <button
                        className="control-button play-button"
                        onClick={this.togglePlayStop}
                    >
                        {this.state.isPlaying ? "s" : "p"}
                    </button>
                    <button className="control-button speed-button">1</button>
                </div>
                <div>
                    <button
                        className="play-button"
                        onClick={() => this.playNote("A4")}
                    >
                        A
                    </button>
                    <button
                        className="play-button"
                        onClick={() => this.playNote("C5")}
                    >
                        C
                    </button>
                    <button
                        className="play-button"
                        onClick={() => this.playNote("E5")}
                    >
                        E
                    </button>
                </div>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("root"));
