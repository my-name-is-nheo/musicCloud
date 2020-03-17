import React from "react";
import ReactDOM from "react-dom";
import $ from "jquery";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: "",
      playList: [],
      trackNumber: 0
    };
  }

  componentDidMount() {
    $.ajax({
      type: "GET",
      url: "http://localhost:4000/getList",
      success: data => {
        console.log(" this is data from client ", data);
        this.setState({
          playList: data,
          selected: data[0].music_url
        });
        console.log(this.state.playList);
      }
    });
  }

  previous() {
    console.log("clicked previous button");
    console.log(this.state.trackNumber);
    console.log(this.state.playList);
    if (this.state.trackNumber === 0) {
      this.setState({ trackNumber: 16 });
    }

    this.setState({
      selected: this.state.playList[this.state.trackNumber - 1].music_url,
      trackNumber: this.state.trackNumber - 1
    });
    var myAudio = document.getElementById("myAudio");
    console.log(myAudio.paused);
    myAudio.pause();
    // myAudio.load();
    return myAudio.play();
  }

  play_pause() {
    console.log("clicked play/pause button");
    var myAudio = document.getElementById("myAudio"); // re-usability problem .. only one ID with audio so it should be fine.. for now.

    return myAudio.paused ? myAudio.play() : myAudio.pause();
  }
  next() {
    if (this.state.trackNumber === 16) {
      this.setState({ trackNumber: 0 });
    }
    console.log("clicked next button");
    console.log(this.state.trackNumber);
    this.setState({
      selected: this.state.playList[this.state.trackNumber + 1].music_url,
      trackNumber: this.state.trackNumber + 1
    });
    var myAudio = document.getElementById("myAudio");
    console.log(myAudio.paused);
    myAudio.pause();
    // myAudio.load();
    return myAudio.play();
    console.log(this.state.selected);
  }

  shuffle() {
    console.log("clicked shuffle button");
    var randomizer = Math.floor(Math.random() * this.state.playList.length);
    console.log(randomizer);
    this.setState({ selected: this.state.playList[randomizer].music_url });
    console.log(this.state.selected);
    return myAudio.paused ? myAudio.play() : myAudio.pause();
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
          src={this.state.selected}
          // type="audio/mpeg"
          preload="auto"
          autoPlay
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
          <button className="repeat-button" onClick={this.repeat.bind(this)}>
            Repeat
          </button>
        </div>
      </div>
    );
  }
}

export default App;

ReactDOM.render(<App />, document.getElementById("app"));
