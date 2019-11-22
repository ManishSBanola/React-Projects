import { alterSearchType } from "../Actions/index";
import { SEARCH_TYPE } from "../Actions/types";

export default (state = {}, Actions) => {
  switch (Actions.type) {
    case SEARCH_TYPE:
      return Actions.payload;
    default:
      return state;
  }
};
