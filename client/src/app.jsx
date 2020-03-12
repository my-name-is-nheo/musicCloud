import React from "react";
import ReactDOM from "react-dom";
import $ from "jquery";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="mini-player">
        <div>hello</div>
        <button>Previous</button>
        <button>Play/Pause</button>
        <button>Next</button>
        <button>Shuffle</button>
        <button>Repeat</button>
      </div>
    );
  }
}

export default App;

ReactDOM.render(<App />, document.getElementById("app"));
