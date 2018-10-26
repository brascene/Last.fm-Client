import {
  TRACKS_REQUEST,
  TRACKS_REQUEST_SUCCESS,
  TRACKS_REQUEST_FAILURE
} from "../actions/types"

import { errorCodes } from "../../utils/errors"

export const INITIAL_STATE = {
  tracks: [],
  totalPages: 1,
  loading: false,
  hasError: false,
  error: ""
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TRACKS_REQUEST:
      return { ...state, loading: true, hasError: false, error: "" };
    case TRACKS_REQUEST_SUCCESS:
      return {
        ...state,
        ...INITIAL_STATE,
        tracks: action.payload.resultTracks,
        totalPages: action.payload.totalPages
      }
    case TRACKS_REQUEST_FAILURE:
      let errorMessage = errorCodes[action.payload]
      return {
        ...state,
        error: errorMessage,
        hasError: true,
        loading: false,
      }
    default:
      return state;
  }
}