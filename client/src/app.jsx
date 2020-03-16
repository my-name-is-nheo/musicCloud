import React from "react";
import ReactDOM from "react-dom";
import $ from "jquery";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected:
        "https://my-music-lists.s3.amazonaws.com/01+-+Bohemian+Rhapsody.mp3"
      // auto: true
    };
  }

  previous() {
    console.log("clicked previous button");

    // $.ajax({
    //   type: "GET",
    //   url: "http://localhost:4000/play",
    //   success: data => {
    //     console.log(data);
    //     console.log("successfully sent get request with previous button");
    //     this.setState("" + data);
    //     console.log(this.state.selected + " this is selected");
    //   }
    // });
  }
  play_pause() {
    console.log("clicked play/pause button");
    // this.setState({ auto: !this.state.auto });
    // console.log(this.state.auto);
    var myAudio = document.getElementById("myAudio");
    console.log(myAudio);

    function toggle() {
      return myAudio.paused ? myAudio.play() : myAudio.pause();
    }
    toggle();
  }
  next() {
    console.log("clicked next button");
  }

  shuffle() {
    console.log("clicked shuffle button");
    console.log("clicked previous button");
    $.ajax({
      type: "GET",
      url: "http://localhost:4000/shuffle",
      success: data => {
        console.log(data);
        console.log("successfully sent get request with previous button");
        this.setState({ selected: data[0].music_url });
      }
    });
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
        <audio
          id="myAudio"
          autoPlay="autoplay"
          src={this.state.selected}
          type="audio/mpeg"
        ></audio>
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
          <button
            className="playPause-button"
            onClick={this.play_pause.bind(this)}
          >
            Play/Pause
          </button>
        </div>
        <div id="next-div">
          {" "}
          <button className="next-button" onClick={this.next.bind(this)}>
            Next
          </button>
        </div>
        <div id="shuffle-div">
          {" "}
          <button className="shuffle-button" onClick={this.shuffle.bind(this)}>
            Shuffle
          </button>
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
