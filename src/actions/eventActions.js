import axios from "axios";
import { FETCH_EVENTS, EVENTS_LOADING, GET_ERRORS } from "./types";

export const fetchEvents = (gameId, provider, tpdid) => dispatch => {
  dispatch(setEventsLoading());
  const config = {
    params: {}
  };

  if (gameId !== "") config.params.gameId = gameId;
  if (provider !== "") config.params.provider = provider;
  if (tpdid !== "") config.params.tpdid = tpdid;

  axios
    .get(
      `https://cors-anywhere.herokuapp.com/http://react-test-backend.us-east-1.elasticbeanstalk.com/analytics-events`,
      config
    )
    .then(res => {
      if (res.data.error) {
        dispatch(returnErrors(res.data.error));
      } else {
        dispatch({
          type: FETCH_EVENTS,
          payload: res.data
        });
      }
    })
    .catch(err => {
      console.log(err);
    });
};

export const setEventsLoading = () => {
  return {
    type: EVENTS_LOADING
  };
};

export const returnErrors = error => {
  return {
    type: GET_ERRORS,
    payload: error
  };
};
