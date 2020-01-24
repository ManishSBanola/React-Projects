import React from "react";
import ReactDOM from "react-dom";
import NewMatches from "./NewMatches";
import { testStore } from "../../utils/index";
import { Provider } from "react-redux";
import { shallow } from "enzyme";
describe("New Matches component", () => {
  test("no results found", () => {
    const store = testStore({});
    const wrapper = shallow(<NewMatches />);
    expect(wrapper.length).toBe(1);
  });
});
