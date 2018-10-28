import { combineReducers } from 'redux'
import CountriesReducer from './countriesReducer'
import TracksReducer from './tracksReducer'
import TrackLoveReducer from './trackLoveReducer'

export default combineReducers({
  countriesState: CountriesReducer,
  tracksState: TracksReducer,
  trackLove: TrackLoveReducer,
})
