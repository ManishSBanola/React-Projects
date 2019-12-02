import { OPEN_MODAL } from "../Actions/types";

export default (state = {}, Action) => {
  switch (Action.type) {
    case OPEN_MODAL:
      return { ...state, ...Action.payload };
    default:
      return state;
  }
};
