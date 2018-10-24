import {
  COUNTRIES_REQUEST,
  COUNTRIES_REQUEST_SUCCESS,
  COUNTRIES_REQUEST_FAILURE,
} from "../actions/types"

export const INITIAL_STATE = {
  countries: [],
  loading: false,
  hasError: false,
  error: ""
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case COUNTRIES_REQUEST:
      return { ...state, loading: true, hasError: false, error: "" };
    case COUNTRIES_REQUEST_SUCCESS:
      return {
        ...state,
        ...INITIAL_STATE,
        countries: action.payload
      };
    case COUNTRIES_REQUEST_FAILURE:
      return {
        ...state,
        error: action.payload,
        hasError: true,
        loading: false,
      };
    default:
      return state;
  }
}
