import React from "react";
import { shallow, mount } from "enzyme";
import MusicPlayer from "../client/src/components/MusicPlayer.jsx";
import HoverMenu from "../client/src/components/HoverMenu.jsx";

describe("Examining the syntax of Jest tests", () => {
  it("sums numbers", () => {
    expect(1 + 2).toEqual(3);
    expect(2 + 2).toEqual(4);
  });
});

describe("MusicPlayer", () => {
  test("should render snapshot", () => {
    const wrapper = mount(<MusicPlayer />);
    expect(wrapper).toMatchSnapshot();
  });

  test("song information should render.", () => {
    const songMock = [
      {
        id: "Test #1",
        music_title: "I'm baby",
        artist_name: "Queen",
        album_cover:
          "https://i.kym-cdn.com/photos/images/original/001/627/845/c22.jpg",
        music_url: "some Url#2"
      },
      {
        id: "Test #2",
        music_title: "uh.",
        artist_name: "Spears",
        album_cover:
          "https://i.kym-cdn.com/photos/images/original/001/627/845/c22.jpg",
        music_url: "some URL #2"
      }
    ];

    const example = shallow(<HoverMenu playList={songMock} />);
    expect(example).toMatchSnapshot();
  });

  test("should not render hoverList if displayList is false.", () => {
    const wrapper = shallow(<MusicPlayer />);
    expect(wrapper.find("HoverMenu").length).toEqual(0);
  });

  //on hover should render the menu
});
