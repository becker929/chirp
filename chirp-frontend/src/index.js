import React from "react";
import ReactDOM from "react-dom";
import * as Tone from "tone";
import "./index.css";

class Cell extends React.Component {
    constructor() {
        super();
        this.state = {
            isActive: false,
        };
        this.toggleActive = this.toggleActive.bind(this);
    }

    toggleActive() {
        this.setState((prevState) => ({
            isActive: !prevState.isActive,
        }));
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
            ></button>
        );
    }
}

const numCols = 12;
const numRows = 12;
class App extends React.Component {
    constructor() {
        super();
        this.state = {
            isPlaying: true,
        };
        this.togglePlayStop = this.togglePlayStop.bind(this);
        this.playNote = this.playNote.bind(this);
        this.synth = new Tone.Synth().toDestination();
    }

    cellGridRow() {
        let row = new Array(numCols).fill(<Cell />);
        return row;
    }

    playNote(note="A4") {
        Tone.Transport.start();
        this.synth.triggerAttackRelease(note, "8n");
    }

    togglePlayStop() {
        this.setState((prevState) => ({
            isPlaying: !prevState.isPlaying,
        }));
    }

    render() {
        return (
            <div>
                {new Array(numRows).fill(
                    <div className="cell-grid-row">{this.cellGridRow()}</div>
                )}
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
                    <button className="play-button"
                        onClick={() => this.playNote("A4")}
                    >
                        A
                    </button>
                    <button className="play-button"
                        onClick={() => this.playNote("C5")}
                    >
                        C
                    </button>
                    <button className="play-button"
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
