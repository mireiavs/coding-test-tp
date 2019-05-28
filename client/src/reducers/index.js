import { FETCH_EVENTS, EVENTS_LOADING, GET_ERRORS } from "../actions/types";

const initialState = {
  events: {},
  loading: false,
  error: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_EVENTS:
      return {
        ...state,
        events: action.payload,
        loading: false,
        error: null
      };
    case EVENTS_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_ERRORS:
      return {
        error: action.payload
      };
    default:
      return state;
  }
}
