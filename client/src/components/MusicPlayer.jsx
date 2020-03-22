import React from "react";
import ReactDOM from "react-dom";
import $ from "jquery";
import HoverMenu from "./HoverMenu.jsx";

class MusicPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: "", // currently playing
      playable: false, // set true/false based on loading of src
      playList: [],
      paused: true, // change to false if i want to autoplay on load
      trackNumber: 0,
      displayList: false,
      displayVolume: false,
      seekValue: 0,
      muted: true,
      volume: 0.5
    };
    this.audioRef = React.createRef();
    this.progressRef = React.createRef();
    this.volumeRef = React.createRef();
    this.volumeControlRef = React.createRef();
  }
  // create refs for audio/progress/start-time/end-times/vol-control
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
  }
  //===============PREVIOUS BUTTON
  previous() {
    console.log("clicked previous button");
    var trackNum;
    if (this.state.trackNumber === 0) {
      trackNum = this.state.playList.length - 1;
    } else {
      trackNum = this.state.trackNumber - 1;
    }
    this.changeAudioSource(this.state.playList[trackNum].music_url, trackNum);
    return this.audioRef.current.paused ? this.pauseAudio() : this.playAudio();
  }

  //=================HELPER FUNCTIONS

  playAudio() {
    this.audioRef.current.volume = this.state.volume;
    console.log(this.audioRef.current.volume);
    if (this.state.playable) {
      return this.audioRef.current.play();
    } else {
      this.playAudio();
    }
  }
  pauseAudio() {
    this.setState({ paused: true });
    console.log("audio is paused");
    return this.audioRef.current.pause();
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
    this.setState({ playable: true });
    if (!this.state.paused) {
      this.audioRef.current.play();
    }
    console.log("audio source finished loading");
  }
  //=================PLAY/PAUSE BUTTON

  play_pause() {
    // var length = this.audioRef.current.duration;
    // var currentTime = this.audioRef.current.currentTime;
    // console.log(currentTime, length);

    // re-usability problem .. only one ID with audio so it should be fine.. for now.
    console.log("play/pause ", this.audioRef.current.paused);
    // console.log(myAudio.duration);

    this.setState({ paused: !this.state.paused });
    return this.audioRef.current.paused ? this.playAudio() : this.pauseAudio();
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
    console.log(this.audioRef.current.duration / 60);
    // myAudio.load();
    console.log(this.audioRef.current.paused);
    return this.audioRef.current.paused ? this.pauseAudio() : this.playAudio();
  }
  //========================SHUFFLE BUTTON
  shuffle() {
    console.log("clicked shuffle button");
    var playList = this.state.playList;
    var shuffle = playList.sort(func);
    function func(a, b) {
      return 0.5 - Math.random();
    }
    console.log(shuffle);

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
    return this.audioRef.current.paused
      ? this.audioRef.current.play()
      : this.audioRef.current.pause();
  }
  //=========================REPEAT BUTTON
  repeat() {
    console.log("clicked repeat button");
    if (!this.audioRef.current.loop) {
      this.audioRef.current.loop = true;
    } else {
      this.audioRef.current.loop = false;
    }
  }
  // =========================SHOW PLAYLIST
  showList() {
    this.setState({ displayList: !this.state.displayList });
  }
  // //==========================PROGRESS BAR
  timeUpdate() {
    var length = this.audioRef.current.duration;
    var currentTime = this.audioRef.current.currentTime;

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

    //onTimeUpdate
    this.setState({ seekValue: Math.floor((currentTime * 100) / length) });
    // state?
  }
  progressBarChange() {
    console.log(this.progressRef.current.value);
    var progressbar = this.progressRef;
    console.log(progressbar);
    var currentTime = this.audioRef.current.currentTime;
    progressbar.current.value = currentTime;
    progressbar.addEventListener("click", this.seek);
    progressbar.addEventListener("drag", this.seek);
  }
  seek(e) {
    e.persist();
    var myAudio = this.audioRef;
    var progressbar = this.progressRef;
    var percent = e.nativeEvent.offsetX / e.target.offsetParent.offsetWidth;
    // var percent = e.target.value / e.target.max;
    console.log(progressbar.current.value);
    console.log(`this is percent`, percent);

    myAudio.current.currentTime = percent * myAudio.current.duration;
    progressbar.current.value = percent;
  }

  //======================VOLUME BAR
  volumeBar(e) {
    console.log(this.audioRef.current.volume);
    this.setState({ volume: e.currentTarget.value / 100 });
    this.audioRef.current.volume = e.currentTarget.value / 100;
  }
  //====================SHOW VOLUME BAR ON CLICK
  displayVolume() {
    this.setState({ displayVolume: !this.state.displayVolume });
  }

  muteVolume() {
    this.setState({ muted: !this.state.muted });
    console.log(this.audioRef.current.muted);
    return (this.audioRef.current.muted = !this.audioRef.current.muted);
  }
  render() {
    return (
      <div id="mini-player">
        <audio
          ref={this.audioRef}
          src={this.state.selected}
          volume={this.state.volume}
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
              ref={this.progressRef}
              value={this.state.seekValue || 0}
              max="100"
              onClick={this.seek.bind(this)}
            ></progress>
          </div>
        </span>
        <small id="end-time"></small>

        <div ref={this.volumeRef}>
          <button
            onMouseOver={this.displayVolume.bind(this)}
            onClick={this.muteVolume.bind(this)}
            className="volume-button"
          >
            {this.state.muted ? "Volume" : "Muted"}
          </button>
          {this.state.displayVolume && (
            <div>
              {" "}
              <input
                ref={this.volumeControlRef}
                type="range"
                min="0"
                max="100"
                step="1"
                onChange={this.volumeBar.bind(this)}
              ></input>
            </div>
          )}
        </div>
        <div className="playlist-div">
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

export default MusicPlayer;
