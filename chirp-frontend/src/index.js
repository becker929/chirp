import React from "react";
import ReactDOM from "react-dom";
import * as Tone from "tone";
import "./index.css";

function Cell(props) {
    const className =
        "cell " +
        (props.isActive ? "cell-active" : "cell-inactive") +
        (props.isHighlighted ? " cell-highlighted" : "");
    return (
        <button className={className} onClick={props.onClick}>
            {props.value}
        </button>
    );
}

const numRows = 12;
const numCols = 12;
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            colIndex: 0,
            isPlaying: false,
            cellsAreActive: props.cellsAreActive,
        };
        this.togglePlayStop = this.togglePlayStop.bind(this);
        this.toggleActive = this.toggleActive.bind(this);
        this.synth = new Tone.PolySynth().toDestination();
        this.rowNotes = [
            "C4",
            "D4",
            "E4",
            "F4",
            "G4",
            "A4",
            "B4",
            "C5",
            "D5",
            "E5",
            "F5",
            "G5",
        ];
    }

    cellGridRow(i) {
        let row = new Array(numCols);
        for (let j = 0; j < numCols; j++) {
            row[j] = (
                <Cell
                    isActive={this.state.cellsAreActive[i][j]}
                    isHighlighted={
                        this.state.isPlaying && this.state.colIndex == j
                    }
                    onClick={() => this.toggleActive(i, j)}
                    value={String(i) + "-" + String(j)}
                    key={`cell-${i}-${j}`}
                />
            );
        }
        return row;
    }

    togglePlayStop() {
        console.log(this.state.cellsAreActive);
        this.setState(
            (prevState) => ({
                colIndex: -1,
                isPlaying: !prevState.isPlaying,
            }),
            () => {
                if (this.state.isPlaying) {
                    // transport must be started before it starts invoking events
                    Tone.Transport.start();
                    Tone.Transport.scheduleRepeat((time) => {
                        this.setState(
                            (prevState) => ({
                                colIndex: (prevState.colIndex + 1) % numCols,
                            }),
                            () => {
                                let notesToPlay = [];
                                for (let i = 0; i < numRows; i++) {
                                    if (
                                        this.state.cellsAreActive[i][
                                            this.state.colIndex
                                        ]
                                    ) {
                                        notesToPlay.push(this.rowNotes[i]);
                                    }
                                }
                                console.log(notesToPlay);
                                if (notesToPlay.length) {
                                    this.synth.triggerAttackRelease(
                                        notesToPlay,
                                        "8n",
                                        time
                                    );
                                }
                            }
                        );
                    }, "4n");
                } else {
                    Tone.Transport.cancel();
                    Tone.Transport.stop();
                }
            }
        );
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
                <div className="cell-grid-row" key={`cell-grid-row-${i}`}>
                    {this.cellGridRow(i)}
                </div>
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
            </div>
        );
    }
}

fetch("http://localhost:5000/test-data")
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        ReactDOM.render(
            <App cellsAreActive={data.cellsAreActive} />,
            document.getElementById("root")
        );
    });
