import {
  GET_LOVED_TRACKS_REQUEST,
  GET_LOVED_TRACKS_SUCCESS,
  GET_LOVED_TRACKS_FAILURE,
} from '../actions/types'

import { errorCodes } from '../../utils/errors'

export const INITIAL_STATE = {
  lovedTracks: [],
  loading: false,
  hasError: false,
  error: '',
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_LOVED_TRACKS_REQUEST:
      return {
        ...state, loading: true, hasError: false, error: '',
      }
    case GET_LOVED_TRACKS_SUCCESS:
      return {
        ...state,
        ...INITIAL_STATE,
        lovedTracks: action.payload.resultTracks,
      }
    case GET_LOVED_TRACKS_FAILURE:
      const errorMessage = errorCodes[action.payload]
      return {
        ...state,
        error: errorMessage,
        hasError: true,
        loading: false,
      }
    default:
      return state
  }
}
