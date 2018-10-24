import {
  COUNTRIES_REQUEST,
  COUNTRIES_REQUEST_SUCCESS,
  COUNTRIES_REQUEST_FAILURE,
} from "../actions/types";

export const INITIAL_STATE = {
  countries: [],
  loading: false,
  hasError: false,
  error: ""
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case COUNTRIES_REQUEST:
      return { ...state, loading: true, hasError: false, error: "" };

    case COUNTRIES_REQUEST_SUCCESS:
      let receivedCountries = action.payload
      let resultCountries = []
      for (let i = 0; i < receivedCountries.length; i++) {
        let country = {
          name: receivedCountries[i].name,
          flag: receivedCountries[i].flag
        }
        resultCountries.push(country)
      }
      return {
        ...state,
        ...INITIAL_STATE,
        countries: resultCountries
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
};
