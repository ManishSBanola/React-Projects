import {
  FETCH_NEW_MATCHES,
  FETCH_OLD_MATCHES,
  FETCH_SCORE,
  FETCH_PLAYER_ID,
  FETCH_PLAYER_STATS
} from "./types";
import cricketApi from "../api";

export const fetchNewMatches = () => async (dispatch, getState) => {
  const response = await cricketApi.get(
    `matches?apikey=${process.env.REACT_APP_CRICKET_API_KEY}`
  );
  dispatch({ type: FETCH_NEW_MATCHES, payload: response.data });
};
export const fetchScore = matchId => async (dispatch, getState) => {
  debugger;
  const response = await cricketApi.get(
    `cricketScore?apikey=${process.env.REACT_APP_CRICKET_API_KEY}&unique_id=${matchId}`
  );
  response.data.matchId = matchId;
  dispatch({ type: "FETCH_SCORE", payload: response.data });
};
