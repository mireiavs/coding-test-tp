import axios from "axios";
import { FETCH_EVENTS, EVENTS_LOADING, GET_ERRORS } from "./types";

// get events from api through backend to avoid CORS blocking
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

// set 'loading' state to true while events are being fetched
export const setEventsLoading = () => {
  return {
    type: EVENTS_LOADING
  };
};

// get api error if any
export const returnErrors = apiError => {
  return {
    type: GET_ERRORS,
    payload: apiError
  };
};
