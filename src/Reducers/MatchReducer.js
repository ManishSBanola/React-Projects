import { FETCH_NEW_MATCHES, FETCH_SCORE, SEARCH_MATCH } from "../Actions/types";
export default (state = {}, Actions) => {
  switch (Actions.type) {
    case FETCH_NEW_MATCHES:
      return { ...state, ...Actions.payload };

    case FETCH_SCORE:
      return { ...state, ...Actions.payload };

    default:
      return state;
  }
};
