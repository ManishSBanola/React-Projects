import {
  FETCH_NEW_MATCHES,
  FETCH_OLD_MATCHES,
  FETCH_SCORE,
  FETCH_PLAYER_ID,
  FETCH_PLAYER_STATS,
  SEARCH_MATCH,
  DARK_MODE,
  FETCH_PLAYER_NAME,
  FETCH_PLAYER_INFO,
  FETCH_MATCH_DETAILS,
  SEARCH_TYPE,
  OPEN_MODAL
} from "./types";
import cricketApi from "../api";

export const fetchNewMatches = () => async (dispatch, getState) => {
  const response = await cricketApi.get(
    `matches?apikey=${process.env.REACT_APP_CRICKET_API_KEY}`
  );
  dispatch({ type: FETCH_NEW_MATCHES, payload: response.data });
};
export const fetchScore = matchId => async (dispatch, getState) => {
  const response = await cricketApi.get(
    `cricketScore?apikey=${process.env.REACT_APP_CRICKET_API_KEY}&unique_id=${matchId}`
  );
  response.data.matchId = matchId;
  dispatch({ type: "FETCH_SCORE", payload: response.data });
};

export const searchMatch = (searchKey = "") => {
  return {
    type: SEARCH_MATCH,
    payload: searchKey
  };
};
export const toggleDarkMode = value => {
  return {
    type: DARK_MODE,
    payload: { dark: value }
  };
};
export const getPlayerByName = playerName => async (dispatch, getState) => {
  const response = await cricketApi.get(
    `playerFinder?apikey=${process.env.REACT_APP_CRICKET_API_KEY}&name=${playerName}`
  );

  dispatch({
    type: FETCH_PLAYER_NAME,
    payload: { playerName: response.data.data }
  });
};

export const fetchPlayerInfo = pid => async (dispatch, state) => {
  const response = await cricketApi.get(
    `playerStats?apikey=${process.env.REACT_APP_CRICKET_API_KEY}&pid=${pid}`
  );

  dispatch({
    type: FETCH_PLAYER_INFO,
    payload: { playerInfo: response.data }
  });
};

export const fetchMatchDetails = matchId => async (dispatch, state) => {
  const response = await cricketApi.get(
    `fantasySummary?apikey=${process.env.REACT_APP_CRICKET_API_KEY}&unique_id=${matchId}`
  );
  dispatch({ type: FETCH_MATCH_DETAILS, payload: response.data });
};

export const alterSearchType = searchType => {
  debugger;
  return {
    type: SEARCH_TYPE,
    payload: searchType
  };
};

export const setModalOpen = data => {
  return {
    type: OPEN_MODAL,
    payload: data
  };
};
