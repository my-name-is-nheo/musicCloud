import React from "react";
import ReactDOM from "react-dom";
import $ from "jquery";
import HoverMenu from "./HoverMenu.jsx";
import ButtonPlay_Pause from "../styled_components/buttons/play_pause.js";
import Button_Previous from "../styled_components/buttons/previous_button.js";
import Button_Next from "../styled_components/buttons/next_button.js";
import Button_Shuffle from "../styled_components/buttons/shuffle_button.js";
import Button_Repeat from "../styled_components/buttons/repeat_button.js";
import Button_PlayList from "../styled_components/buttons/playlist_button.js";
import Button_Volume from "../styled_components/buttons/volume_button.js";
import Music_Player from "../styled_components/container_style.js";
import Progress_div from "../styled_components/progress_div.js";
import Volume_Hover from "../styled_components/volume_hover.js";
import Music_Info from "../styled_components/music_info.js";
import Small_Start_Time from "../styled_components/start_time.js";
import Small_End_Time from "../styled_components/end_time.js";
import Volume_div from "../styled_components/volume_div.js";
import Album_Div from "../styled_components/album_div.js";
class MusicPlayerOnFooter extends React.Component {
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
    this.startTimeRef = React.createRef();
  }
  // create refs for audio/progress/start-time/end-times/vol-control
  componentDidMount() {
    $.ajax({
      type: "GET",
      url: "http://3.15.24.104:4000/getList",
      success: data => {
        console.log(data);
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
    if (this.state.playable) {
      return this.audioRef.current.play();
    } else {
      this.playAudio();
    }
  }
  pauseAudio() {
    this.setState({ paused: true });
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
  }
  //=================EventHandler
  canPlay() {
    this.setState({ playable: true });
    if (!this.state.paused) {
      this.audioRef.current.play();
    }
  }
  //=================PLAY/PAUSE BUTTON

  play_pause() {
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

    this.changeAudioSource(this.state.playList[trackNum].music_url, trackNum);

    return this.audioRef.current.paused ? this.pauseAudio() : this.playAudio();
  }
  //========================SHUFFLE BUTTON
  shuffle() {
    var playList = this.state.playList;
    var shuffle = playList.sort(func);
    function func(a, b) {
      return 0.5 - Math.random();
    }

    this.changeAudioSource(
      this.state.playList[this.state.trackNumber].music_url
    );
    this.setState({
      playList: shuffle
    });
    return this.audioRef.current.paused
      ? this.audioRef.current.play()
      : this.audioRef.current.pause();
  }
  //=========================REPEAT BUTTON
  repeat() {
    if (!this.audioRef.current.loop) {
      this.audioRef.current.loop = true;
    } else {
      this.audioRef.current.loop = false;
    }
  }
  // ==========================SHOW PLAYLIST
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
    var endTime = minutes + ":" + seconds;

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
    this.setState({ seekValue: Math.floor((currentTime * 100) / length) });
  }
  seek(e) {
    e.persist();

    var myAudio = this.audioRef;
    var progressbar = this.progressRef;
    var percent = e.nativeEvent.offsetX / e.target.offsetParent.offsetWidth;

    myAudio.current.currentTime = percent * 1.24 * myAudio.current.duration;
    progressbar.current.value = percent / 100;
  }

  //=================================VOLUME BAR
  volumeBar(e) {
    this.setState({ volume: e.currentTarget.value / 100 });
    this.audioRef.current.volume = e.currentTarget.value / 100;
  }
  //===================================SHOW VOLUME BAR ON CLICK
  displayVolume() {
    this.setState({ displayVolume: !this.state.displayVolume });
  }

  muteVolume() {
    this.setState({ muted: !this.state.muted });
    return (this.audioRef.current.muted = !this.audioRef.current.muted);
  }
  render() {
    return (
      <div>
        <Music_Player>
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
            <Button_Previous
              className="previous-button"
              onClick={this.previous.bind(this)}
            >
              <img
                src="https://image.flaticon.com/icons/svg/254/254437.svg"
                width="30px"
                height="30%"
              />
            </Button_Previous>
          </div>
          <div id="play-pause-div">
            {" "}
            <ButtonPlay_Pause
              className="playPause-button"
              onClick={this.play_pause.bind(this)}
            >
              {this.state.paused ? (
                <img
                  src="https://image.flaticon.com/icons/svg/254/254434.svg"
                  width="30px"
                  height="30%"
                />
              ) : (
                <img
                  src="https://image.flaticon.com/icons/svg/633/633940.svg"
                  width="30px"
                  height="30%"
                />
              )}
            </ButtonPlay_Pause>
          </div>

          <div id="next-div">
            {" "}
            <Button_Next className="next-button" onClick={this.next.bind(this)}>
              <img
                src="https://image.flaticon.com/icons/svg/254/254428.svg"
                width="30px"
                height="30%"
              />
            </Button_Next>
          </div>

          <div id="shuffle-div">
            {" "}
            <Button_Shuffle
              className="shuffle-button"
              onClick={this.shuffle.bind(this)}
            >
              <img
                src="https://image.flaticon.com/icons/svg/2057/2057590.svg"
                width="30px"
                height="30%"
              />
            </Button_Shuffle>
          </div>
          <div id="repeat-div">
            <Button_Repeat
              className="repeat-button"
              onClick={this.repeat.bind(this)}
            >
              <img
                src="https://image.flaticon.com/icons/svg/565/565272.svg"
                width="30px"
                height="30%"
              />
            </Button_Repeat>
          </div>
          <Album_Div id="album-cover">
            <img
              id="queen-image"
              src={
                this.state.playList.length
                  ? this.state.playList[this.state.trackNumber].album_cover
                  : ""
              }
              width="27"
              height="27"
            />
          </Album_Div>

          <Small_Start_Time id="start-time"></Small_Start_Time>
          <span id="seek-container">
            <Progress_div>
              <progress
                ref={this.progressRef}
                value={this.state.seekValue || 0}
                max="100"
                onClick={this.seek.bind(this)}
              ></progress>
            </Progress_div>
          </span>
          <Small_End_Time id="end-time"></Small_End_Time>

          <div ref={this.volumeRef} id="volume-button">
            {this.state.displayVolume && (
              <Volume_div>
                {" "}
                <Volume_Hover
                  ref={this.volumeControlRef}
                  type="range"
                  min="0"
                  max="100"
                  step="1"
                  onChange={this.volumeBar.bind(this)}
                ></Volume_Hover>
              </Volume_div>
            )}
            <Button_Volume
              onMouseOver={this.displayVolume.bind(this)}
              onClick={this.muteVolume.bind(this)}
              className="volume-button"
            >
              {this.state.muted ? (
                <img
                  src="https://image.flaticon.com/icons/svg/727/727269.svg"
                  width="30px"
                  height="30%"
                />
              ) : (
                <img
                  src="https://image.flaticon.com/icons/svg/727/727240.svg"
                  width="30px"
                  height="30%"
                />
              )}
            </Button_Volume>
          </div>
          {this.state.playList.length ? (
            <Music_Info id="music-info">
              {this.state.playList[this.state.trackNumber].music_title}
              <small> by </small>
              {this.state.playList[this.state.trackNumber].artist_name}
            </Music_Info>
          ) : (
            ""
          )}
          <div className="playlist-div">
            {this.state.displayList && (
              <HoverMenu
                playList={this.state.playList}
                selected={this.state.selected}
              />
            )}
            <Button_PlayList
              onClick={this.showList.bind(this)}
              className="playList-button"
            >
              <img
                src="https://image.flaticon.com/icons/svg/565/565266.svg"
                width="30px"
                height="30%"
              />
            </Button_PlayList>
          </div>
        </Music_Player>
      </div>
    );
  }
}

export default MusicPlayerOnFooter;
