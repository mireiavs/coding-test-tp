import axios from "axios";
import { FETCH_EVENTS, EVENTS_LOADING } from "./types";

const config = {
  headers: {
    method: "GET",
    "Content-type": "application/json"
  }
};

export const fetchEvents = (gameId, provider, tpdid) => dispatch => {
  dispatch(setEventsLoading());
  axios
    .get(
      `https://cors-anywhere.herokuapp.com/http://react-test-backend.us-east-1.elasticbeanstalk.com/analytics-events?gameId=${gameId}&provider=${provider}&tpdid=${tpdid}`,
      config
    )
    .then(res =>
      dispatch({
        type: FETCH_EVENTS,
        payload: res.data
      })
    )
    .catch(err => console.log(err));
};

export const setEventsLoading = () => {
  return {
    type: EVENTS_LOADING
  };
};
