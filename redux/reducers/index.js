import { combineReducers } from "redux";
import CountriesReducer from "./countriesReducer"

export default combineReducers({
  countriesState: CountriesReducer
});
