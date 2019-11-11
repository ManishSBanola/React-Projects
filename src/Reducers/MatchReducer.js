import {
  FETCH_NEW_MATCHES,
  FETCH_SCORE,
  SEARCH_MATCH,
  DARK_MODE,
  FETCH_PLAYER_NAME
} from "../Actions/types";
export default (state = {}, Actions) => {
  switch (Actions.type) {
    case FETCH_NEW_MATCHES:
      return { ...state, ...Actions.payload };

    case FETCH_SCORE:
      return { ...state, ...Actions.payload };

    case DARK_MODE:
      return { ...state, ...Actions.payload };
    case FETCH_PLAYER_NAME:
      return { ...state, ...Actions.payload };
    default:
      return state;
  }
};
