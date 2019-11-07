import { SEARCH_MATCH } from "../Actions/types";

export default (state = "", Actions) => {
  switch (Actions.type) {
    case SEARCH_MATCH:
      return Actions.payload;
    default:
      return state;
  }
};
