import {
  COUNTRIES_REQUEST,
  COUNTRIES_REQUEST_SUCCESS,
  COUNTRIES_REQUEST_FAILURE,
  SAVE_LOCAL_COUNTRIES,
  FILTER_COUNTRIES,
  FILTER_COUNTRIES_CLEAR
} from "../actions/types"

export const INITIAL_STATE = {
  countries: [],
  loading: false,
  hasError: false,
  error: "",
  isFiltering: false,
  filterValue: "",
  filteredCountries: []
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
    case FILTER_COUNTRIES:
      let filterResult = []
      filterResult = state.countries.filter((country) => {
        return country.name.toLowerCase().startsWith(action.payload)
      })
      return {
        ...state,
        isFiltering: true,
        filterValue: action.payload,
        filteredCountries: filterResult
      }
    case SAVE_LOCAL_COUNTRIES:
      return {
        ...state,
        ...INITIAL_STATE,
        countries: action.payload
      }
    case FILTER_COUNTRIES_CLEAR:
      return {
        ...state,
        isFiltering: false,
        filteredCountries: []
      }
    default:
      return state;
  }
}
