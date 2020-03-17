import React from "react";

const HoverMenu = props => (
  <div>
    {props.playList.map((song, id) => {
      return (
        <div key={id}>
          <h4>Track Number</h4>
          <p>{song.id}</p>
          <h4>Title</h4>
          <p>{song.music_title}</p>
          <h4>Artist</h4>
          <p>{song.artist_name}</p>
          <h4>Album Cover</h4>
          <img src={song.album_cover} width="52" height="52" />
        </div>
      );
    })}
  </div>
);

export default HoverMenu;
