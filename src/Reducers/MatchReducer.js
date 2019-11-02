import Actions from "../Actions/index";
import { FETCH_NEW_MATCHES, FETCH_SCORE } from "../Actions/types";
export default (state = {}, Actions) => {
  switch (Actions.type) {
    case FETCH_NEW_MATCHES:
      return { ...state, ...Actions.payload };
      break;
    case FETCH_SCORE:
      return { ...state, ...Actions.payload };
    default:
      return state;
  }
};
