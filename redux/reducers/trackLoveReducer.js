import {
  TRACK_LOVE_REQUEST,
  TRACK_LOVE_REQUEST_SUCCESS,
  TRACK_LOVE_REQUEST_FAILURE,
  TRACK_LOVE_REQ_RESET,
} from '../actions/types'

import { errorCodes } from '../../utils/errors'

export const INITIAL_STATE = {
  loading: false,
  hasError: false,
  error: '',
  success: false,
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TRACK_LOVE_REQUEST:
      return {
        ...state, loading: true,
      }
    case TRACK_LOVE_REQUEST_SUCCESS:
      return {
        ...state, loading: false, success: true,
      }
    case TRACK_LOVE_REQUEST_FAILURE:
      const errorMessage = errorCodes[action.payload]
      return {
        ...state,
        error: errorMessage,
        hasError: true,
        loading: false,
      }
    case TRACK_LOVE_REQ_RESET:
      return INITIAL_STATE
    default:
      return state
  }
}
