import { SEARCH_MATCH } from "../Actions/types";

export default (state = "", Actions) => {
  debugger;
  switch (Actions.type) {
    case SEARCH_MATCH:
      return Actions.payload;
    default:
      return state;
  }
};
