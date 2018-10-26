import { combineReducers } from "redux";
import CountriesReducer from "./countriesReducer"
import TracksReducer from "./tracksReducer"

export default combineReducers({
  countriesState: CountriesReducer,
  tracksState: TracksReducer
});
