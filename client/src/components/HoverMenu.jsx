import React from "react";
import HoverDiv from "../styled_components/hover_menu_style.js";
import Button_Clear from "../styled_components/buttons/clear_button.js";
import Hover_Next from "../styled_components/Hover_Next.js";

const HoverMenu = props => (
  <HoverDiv>
    <Hover_Next>
      Next Up <Button_Clear>Clear</Button_Clear>
    </Hover_Next>

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
          <img src={song.album_cover} width="27" height="27" />
        </div>
      );
    })}
  </HoverDiv>
);

export default HoverMenu;
