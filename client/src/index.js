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
            sequences: [],
        };
        this.togglePlayStop = this.togglePlayStop.bind(this);
        this.toggleActive = this.toggleActive.bind(this);
        this.getSequenceList = this.getSequenceList.bind(this);
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

    componentDidMount() {
        this.getSequenceList();
    }

    cellGridRow(i) {
        let row = new Array(numCols);
        for (let j = 0; j < numCols; j++) {
            row[j] = (
                <Cell
                    isActive={this.state.cellsAreActive[i][j]}
                    isHighlighted={
                        this.state.isPlaying && this.state.colIndex === j
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
                    Tone.start();
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
        this.setState(
            () => ({
                cellsAreActive: cellsAreActive,
            }),
            () => {
                fetch(`/sequence?sequence=${sequenceName}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        cellsAreActive: this.state.cellsAreActive,
                    }),
                });
            }
        );
    }

    async getSequenceList() {
        fetch("/sequences-list")
            .then((response) => response.json())
            .then((data) => {
                this.setState((prevState) => ({
                    sequences: data.sequences,
                }));
            });
    }

    sequenceListItem(text) {
        return (
            <div
                className="sequence-list-item"
                key={`sequence-list-item-${text}`}
            >
                <a href={`/chirp/?sequence=${text}`}>{text}</a>
            </div>
        );
    }

    createNewSequence() {
        console.log("hello");
        fetch(`/sequence?sequence=${sequenceName}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                window.location.href = `/chirp?sequence=${data.sequence_name}`;
            });
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
            <div className="app-container">
                <div><span role="img" aria-label="hatching-chick">🐣</span> Chirp, by Anthony Becker <a href="https://github.com/becker929/chirp">[GitHub]</a> <a href="https://www.linkedin.com/in/becker929/">[LinkedIn]</a> <a href="https://drive.google.com/file/d/1efEBdFdfWN8QjA-TqOuLGqQx9WHTDYQ8/view?usp=sharing">[Resume]</a></div>
                <br/>
                <div>{sequenceName}</div>
                <div>
                    {rows}
                    <div>
                        <button
                            className="control-button play-button"
                            onClick={this.togglePlayStop}
                        >
                            {this.state.isPlaying ? (
                                <span role="img" aria-label="stop">
                                    ⏹️
                                </span>
                            ) : (
                                <span role="img" aria-label="play">
                                    ▶️
                                </span>
                            )}
                        </button>
                        This is a shared space --- Please don't deface others'
                        art :-)
                    </div>
                </div>
                <div className="sequence-list-panel">
                    <div>
                        <b>Other Sequences</b>
                    </div>
                    <div>
                        <button
                            className="new-sequence-button"
                            onClick={this.createNewSequence}
                        >
                            create new sequence
                            <span
                                role="img"
                                aria-label="sparkle"
                                style={{ "margin-left": "4px" }}
                            >
                                ❇️
                            </span>
                        </button>
                    </div>
                    {this.state.sequences.map(this.sequenceListItem)}
                </div>
            </div>
        );
    }
}

const queryParams = new URLSearchParams(window.location.search);
const sequenceName = queryParams.get("sequence");
fetch(`/sequence?sequence=${sequenceName}`)
    .then((response) => response.json())
    .then((data) => {
        ReactDOM.render(
            <App cellsAreActive={data.cellsAreActive} />,
            document.getElementById("root")
        );
    });
