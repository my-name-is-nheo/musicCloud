import React from "react";
import ReactDOM from "react-dom";
import $ from "jquery";
import HoverMenu from "./components/HoverMenu.jsx";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: "",
      playable: false, // set true/false based on loading of src
      playList: [],
      paused: true, // change to false if i want to autoplay on load
      trackNumber: 0,
      displayList: false,
      displayVolume: false,
      seekValue: 0
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
      }
    });
    var myAudio = document.getElementById("myAudio");
    myAudio.volume = 0.5; // default 0.5
    console.log(myAudio.paused);
    // myAudio.ontimeupdate = event => {
    //   console.log("The currentTime attribute has been updated. Again.");
    //   console.log(myAudio.currentTime);
    // };
  }
  //===============PREVIOUS BUTTON
  previous() {
    console.log("clicked previous button");
    console.log(this.state.trackNumber);
    console.log(this.state.playList);
    var trackNum;
    if (this.state.trackNumber === 0) {
      // compare playlist length to track number and reset.
      // this.setState({ trackNumber: this.state.playList.length - 1 });
      trackNum = this.state.playList.length - 1;
    } else {
      trackNum = this.state.trackNumber - 1;
    }

    this.changeAudioSource(this.state.playList[trackNum].music_url, trackNum);
    // this.setState({
    //   // selected: this.state.playList[this.state.trackNumber - 1].music_url,
    //   trackNumber: this.state.trackNumber - 1
    // });
    var myAudio = document.getElementById("myAudio");
    console.log(myAudio.paused);
    return myAudio.paused ? this.pauseAudio() : this.playAudio();
  }

  //=================HELPER FUNCTIONS

  playAudio() {
    var myAudio = document.getElementById("myAudio");
    console.log("audio is playing");
    if (this.state.playable) {
      return myAudio.play();
    } else {
      // setTimeout(this.playAudio.bind(this), 100); // finished loading, or try again
      this.playAudio();
    }
  }
  pauseAudio() {
    var myAudio = document.getElementById("myAudio");
    this.setState({ paused: true });
    console.log("audio is paused");
    return myAudio.pause();
  }

  changeAudioSource(src, trackNum) {
    if (trackNum === undefined) {
      trackNum = this.state.trackNumber;
    }
    this.setState({
      selected: src,
      playable: false,
      trackNumber: trackNum
    });
    console.log("changing audio source");
  }
  //=================EventHandler
  canPlay() {
    var myAudio = document.getElementById("myAudio");
    this.setState({ playable: true });
    if (!this.state.paused) {
      myAudio.play();
    }
    console.log("audio source finished loading");
  }
  //=================PLAY/PAUSE BUTTON

  play_pause() {
    console.log("clicked play/pause button");
    var myAudio = document.getElementById("myAudio"); // re-usability problem .. only one ID with audio so it should be fine.. for now.
    console.log("play/pause ", myAudio.paused);
    // console.log(myAudio.duration);

    this.setState({ paused: !this.state.paused });
    return myAudio.paused ? this.playAudio() : this.pauseAudio();
  }

  //=====================NEXT BUTTON
  next() {
    var trackNum;
    if (this.state.trackNumber === this.state.playList.length - 1) {
      trackNum = 0;
    } else {
      trackNum = this.state.trackNumber + 1;
    }
    console.log("clicked next button");
    console.log(this.state.trackNumber);
    this.changeAudioSource(this.state.playList[trackNum].music_url, trackNum);
    // this.setState({
    //   // selected: this.state.playList[this.state.trackNumber + 1].music_url,
    //   trackNumber: this.state.trackNumber + 1
    // });
    var myAudio = document.getElementById("myAudio");
    console.log(myAudio.duration / 60);
    // myAudio.load();
    console.log(myAudio.paused);
    return myAudio.paused ? this.pauseAudio() : this.playAudio();
  }
  //============SHUFFLE BUTTON
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
    this.changeAudioSource(
      this.state.playList[this.state.trackNumber].music_url
    );
    this.setState({
      playList: shuffle
      // selected: this.state.playList[this.state.trackNumber].music_url
    });
    // console.log(this.state.trackNumber);
    // console.log(this.state.playList);
    // console.log(this.state.selected);
    return myAudio.paused ? myAudio.play() : myAudio.pause();
  }
  //=====================REPEAT BUTTON
  repeat() {
    console.log("clicked repeat button");
    if (!document.getElementById("myAudio").loop) {
      document.getElementById("myAudio").loop = true;
    } else {
      document.getElementById("myAudio").loop = false;
    }
  }
  //=========================SHOW PLAYLIST
  showList() {
    this.setState({ displayList: !this.state.displayList });
  }
  //===================PROGRESS BAR
  timeUpdate() {
    var myAudio = document.getElementById("myAudio");
    var length = myAudio.duration;
    var currentTime = myAudio.currentTime;

    var minutes = Math.floor(length / 60),
      secondsInt = length - minutes * 60,
      secondsStr = secondsInt.toString(),
      seconds = secondsStr.substr(0, 2);

    if (seconds < 10) {
      seconds = seconds * 10;
    } else {
      seconds;
    }
    var endTime = minutes + ":" + seconds; //<==== total time in correct form

    var currentHour = parseInt(currentTime / 3600) % 24,
      currentMinute = parseInt(currentTime / 60) % 60,
      currentSecond = currentTime % 60,
      current_SecondsFixed = currentSecond.toFixed(),
      current_Time =
        (currentMinute < 10 ? "0" + currentMinute : currentMinute) +
        ":" +
        (current_SecondsFixed < 10
          ? "0" + current_SecondsFixed
          : current_SecondsFixed);

    var start = document.getElementById("start-time");
    start.innerHTML = current_Time;
    var end = document.getElementById("end-time");
    end.innerHTML = endTime;
    //onTimeUpdate
    this.setState({ seekValue: Math.floor((currentTime * 100) / length) });
    // state?
  }
  progressBarChange() {
    var myAudio = document.getElementById("myAudio");
    var progressbar = document.getElementById("progress");
    var currentTime = myAudio.currentTime;
    progressbar.value = currentTime / length;
    progressbar.addEventListener("click", this.seek);
    progressbar.addEventListener("drag", this.seek);
  }
  seek(e) {
    e.persist();
    console.log(e);
    var myAudio = document.getElementById("myAudio");
    var progressbar = document.getElementById("progress");
    var percent = e.nativeEvent.offsetX / e.target.offsetParent.offsetWidth;
    // var percent = e.target.value / e.target.max;
    console.log(`this is percent`, percent);
    myAudio.currentTime = percent * myAudio.duration;
    progressbar.value = percent / 1000;
  }

  //======================VOLUME BAR
  volumeBar() {
    var volumeNumber = document.getElementById("vol-control");
    var myAudio = document.getElementById("myAudio");
    myAudio.volume = volumeNumber.value / 100;
  }
  //====================SHOW VOLUME BAR ON CLICK
  displayVolume() {
    this.setState({ displayVolume: !this.state.displayVolume });
  }
  render() {
    return (
      <div id="mini-player">
        <audio
          id="myAudio"
          src={this.state.selected}
          // type="audio/mpeg"
          preload="auto"
          onEnded={this.next.bind(this)}
          onCanPlay={this.canPlay.bind(this)}
          onTimeUpdate={this.timeUpdate.bind(this)}
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
            {this.state.paused ? "Play" : "Pause"}
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
        <img
          src={
            this.state.playList.length
              ? this.state.playList[this.state.trackNumber].album_cover
              : ""
          }
          width="52"
          height="52"
        />
        {this.state.playList.length ? (
          <p>
            {this.state.playList[this.state.trackNumber].music_title}
            <small> by </small>
            {this.state.playList[this.state.trackNumber].artist_name}
          </p>
        ) : (
          ""
        )}

        <small id="start-time"></small>
        <span id="seek-container">
          <div id="progress-div">
            <progress
              id="progress"
              value={this.state.seekValue || 0}
              max="100"
              onClick={this.seek.bind(this)}
            ></progress>
          </div>
        </span>
        <small id="end-time"></small>

        <div id="volume-divgit">
          <button
            onClick={this.displayVolume.bind(this)}
            className="volume-button"
          >
            Volume
          </button>
          {this.state.displayVolume && (
            <div>
              {" "}
              <input
                id="vol-control"
                type="range"
                min="0"
                max="100"
                step="1"
                onChange={this.volumeBar.bind(this)}
              ></input>
            </div>
          )}
        </div>
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
