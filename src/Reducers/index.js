import MatchReducer from "./MatchReducer";
import scoreReducer from "./scoreReducer";
import { combineReducers } from "redux";

export default combineReducers({
  NewMatches: MatchReducer,
  score: scoreReducer
});
