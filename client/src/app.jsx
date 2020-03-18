import React from "react";
import ReactDOM from "react-dom";
import $ from "jquery";
import HoverMenu from "./components/HoverMenu.jsx";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: "",
      playList: [],
      trackNumber: 0,
      displayList: false
    };
  }
  //=============================================================================================================================================================================
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
        // console.log(this.state.playList);
      }
    });
    var myAudio = document.getElementById("myAudio");
    myAudio.volume = 0.5;
  }
  //=============================================================================================================================================================================
  previous() {
    console.log("clicked previous button");
    console.log(this.state.trackNumber);
    console.log(this.state.playList);
    if (this.state.trackNumber === 0) {
      // compare playlist length to track number and reset.
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
  //=============================================================================================================================================================================

  play_pause() {
    console.log("clicked play/pause button");
    var myAudio = document.getElementById("myAudio"); // re-usability problem .. only one ID with audio so it should be fine.. for now.

    return myAudio.paused ? myAudio.play() : myAudio.pause();
  }
  //=============================================================================================================================================================================
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
    // console.log(myAudio.paused);
    console.log(this.state.selected);
    // myAudio.pause();
    console.log(myAudio.duration / 60);
    // myAudio.load();
    return myAudio.play();
  }
  //=============================================================================================================================================================================
  shuffle() {
    console.log("clicked shuffle button");
    var playList = this.state.playList;
    var shuffle = playList.sort(func);
    function func(a, b) {
      return 0.5 - Math.random();
    }
    console.log(shuffle);

    // var randomizer = Math.floor(Math.random() * this.state.playList.length);
    // console.log(randomizer);
    this.setState({
      playList: shuffle,
      selected: this.state.playList[this.state.trackNumber].music_url
    });
    // console.log(this.state.trackNumber);
    // console.log(this.state.playList);
    // console.log(this.state.selected);
    return myAudio.paused ? myAudio.play() : myAudio.pause();
  }
  //=============================================================================================================================================================================
  repeat() {
    console.log("clicked repeat button");
    if (!document.getElementById("myAudio").loop) {
      document.getElementById("myAudio").loop = true;
    } else {
      document.getElementById("myAudio").loop = false;
    }
  }
  //=============================================================================================================================================================================
  showList() {
    this.setState({ displayList: !this.state.displayList });
  }
  //=============================================================================================================================================================================
  initProgressBar() {
    var myAudio = document.getElementById("myAudio");
    var length = myAudio.duration;
    var current_time = myAudio.currentTime;

    function calculateTotalTime(length) {
      var minutes = Math.floor(length / 60);
      var secondNum = length - minutes * 60;
      var secondStr = secondNum.toString();
      var seconds = secondStr.substr(0, 2);
      var time = minutes + ":" + seconds;
      return;
    }
  }
  //=============================================================================================================================================================================
  volumeBar() {
    var volumeNumber = document.getElementById("vol-control");
    console.log(volumeNumber.value);
    var myAudio = document.getElementById("myAudio");
    console.log(myAudio.volume);
    myAudio.volume = volumeNumber.value / 100;
    // myAudio.volume = myAudio.volume;
    // console.log("After: " + myAudio.volume);
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
          <button className="repeat-button" onClick={this.repeat.bind(this)}>
            Repeat
          </button>
        </div>
        <span id="seek-container">
          <progress id="seek" value="0" max="1"></progress>
        </span>
        <small id="start-time"></small>
        <small id="end-time"></small>
        <input
          id="vol-control"
          type="range"
          min="0"
          max="100"
          step="1"
          onChange={this.volumeBar.bind(this)}
        ></input>
        <div id="playList-div">
          <button
            onClick={this.showList.bind(this)}
            className="playList-button"
          >
            PlayList
          </button>
          {this.state.displayList && (
            <div>
              {" "}
              <HoverMenu
                playList={this.state.playList}
                selected={this.state.selected}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default App;

ReactDOM.render(<App />, document.getElementById("app"));
