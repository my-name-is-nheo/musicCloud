import React from "react";
import { shallow } from "enzyme";
import MusicPlayer from "../client/src/components/MusicPlayer.jsx";

describe("Examining the syntax of Jest tests", () => {
  it("sums numbers", () => {
    expect(1 + 2).toEqual(3);
    expect(2 + 2).toEqual(4);
  });
});

describe("First React component test with Enzyme", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<MusicPlayer />);
  });
});
