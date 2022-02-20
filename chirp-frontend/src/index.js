import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Cell extends React.Component {
  render() {
    return (
      <button className="cell">
        {this.props.value}
      </button>
    );
  }
}

const numCols = 12;
const numRows = 12;

class CellGrid extends React.Component {
    cellGridRow() {
        let cells = new Array(numCols).fill(<Cell />);
        return cells
    }

    render() {
        return (
            <div>
                {new Array(numRows).fill(
                    <div className="cell-grid-row">
                        {this.cellGridRow()}
                    </div>)
                }
            </div>
        )
    }
}

function App() {
  return (
      <CellGrid />
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);


