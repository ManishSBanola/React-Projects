import { fetchMatchDetails } from "../Actions/index";
import { FETCH_MATCH_DETAILS } from "../Actions/types";

export default (state = {}, Actions) => {
  switch (Actions.type) {
    case FETCH_MATCH_DETAILS:
      return { ...state, ...Actions.payload };

    default:
      return state;
  }
};
