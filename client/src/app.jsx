import React from "react";
import ReactDOM from "react-dom";
import $ from "jquery";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  previous() {
    console.log("clicked previous button");
    $.ajax({
      type: "GET",
      url: "http://localhost:4000/play",
      success: () => {
        console.log("successfully sent get request with previous button");
      }
    });
  }
  play_pause() {
    console.log("clicked play/pause button");
  }

  next() {
    console.log("clicked next button");
  }

  shuffle() {
    console.log("clicked shuffle button");
  }
  repeat() {
    console.log("clicked repeat button");
  }

  render() {
    // const styles = {
    //   main: {
    //     display: "flex"
    //   }
    // };
    return (
      <div id="mini-player">
        <div id="previous-div">
          {" "}
          <button
            className="previous-button"
            onClick={this.previous.bind(this)}
          >
            Previous
          </button>
        </div>
        <div id="play-pause-div">
          {" "}
          <button className="playPause-button">Play/Pause</button>
        </div>
        <div id="next-div">
          {" "}
          <button className="next-button">Next</button>
        </div>
        <div id="shuffle-div">
          {" "}
          <button className="shuffle-button">Shuffle</button>
        </div>

        <div id="repeat-div">
          {" "}
          <button className="repeat-button">Repeat</button>
        </div>
      </div>
    );
  }
}

export default App;

ReactDOM.render(<App />, document.getElementById("app"));
