import axios from "axios";
import { FETCH_EVENTS, EVENTS_LOADING, GET_ERRORS } from "./types";

export const fetchEvents = (gameId, provider, tpdid) => dispatch => {
  dispatch(setEventsLoading());
  axios
    .get(`/events/${gameId}/${provider}/${tpdid}`)
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
