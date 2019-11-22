import MatchReducer from "./MatchReducer";
import scoreReducer from "./scoreReducer";
import searchMatch from "./searchMatch";
import { combineReducers } from "redux";
import MatchDetailsReducer from "./MatchDetailsReducer";
import AlterSearchTypeReducer from "./AlterSearchTypeReducer";
export default combineReducers({
  NewMatches: MatchReducer,
  score: scoreReducer,
  searchKey: searchMatch,
  MatchDetails: MatchDetailsReducer,
  searchType: AlterSearchTypeReducer
});
