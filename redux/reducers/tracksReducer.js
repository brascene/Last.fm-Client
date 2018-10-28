import {
  TRACKS_REQUEST,
  TRACKS_REQUEST_SUCCESS,
  TRACKS_REQUEST_FAILURE,
  MAP_LOVED_TRACKS,
} from '../actions/types'

import { errorCodes } from '../../utils/errors'

export const INITIAL_STATE = {
  tracks: [],
  totalPages: 1,
  loading: false,
  hasError: false,
  error: '',
}

function mapLovedToTracks(lovedTracks, allTracks) {
  const resultTracks = []
  for (let i = 0; i < allTracks.length; i += 1) {
    const lt = allTracks[i]
    const { name, artist } = lt

    // Find by name and artist
    const nameIndex = lovedTracks.find(a => (a.name === name && a.artist === artist))
    if (nameIndex) {
      resultTracks.push(Object.assign(allTracks[i], { isLoved: true }))
    } else {
      resultTracks.push(allTracks[i])
    }
  }
  return resultTracks
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TRACKS_REQUEST:
      return {
        ...state, loading: true, hasError: false, error: '',
      }
    case TRACKS_REQUEST_SUCCESS:
      return {
        ...state,
        ...INITIAL_STATE,
        tracks: action.payload.resultTracks,
        totalPages: action.payload.totalPages,
      }
    case TRACKS_REQUEST_FAILURE:
      const errorMessage = errorCodes[action.payload]
      return {
        ...state,
        error: errorMessage,
        hasError: true,
        loading: false,
      }
    case MAP_LOVED_TRACKS:
      const mappedTracks = mapLovedToTracks(action.payload, state.tracks)
      return {
        ...state,
        tracks: mappedTracks,
      }
    default:
      return state
  }
}
