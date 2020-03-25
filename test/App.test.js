import React from "react";
import ReactDOM from "react-dom";
import { shallow, mount } from "enzyme";
import MusicPlayerOnFooter from "../client/src/components/MusicPlayer.jsx";
import ButtonPlay_Pause from "../client/src/components/MusicPlayer.jsx";
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

  //on hover should render the menu
  test("Music Player should render properly", () => {
    const div = document.createElement("div");
    ReactDOM.render(<MusicPlayerOnFooter />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  const mockFn = jest.fn();

  test("playbutton simulating click event", () => {
    const wrapper = shallow(<ButtonPlay_Pause handClick={mockFn} />);
    wrapper.simulate("click");
    expect(mockFn).toHaveBeenCalled();
  });
});
