import {
  TRACKS_REQUEST,
  TRACKS_REQUEST_SUCCESS,
  TRACKS_REQUEST_FAILURE,
  MAP_LOVED_TRACKS,
  GET_LOVED_TRACKS_SUCCESS,
} from '../actions/types'

import { errorCodes } from '../../utils/errors'

export const INITIAL_STATE = {
  tracks: [],
  totalPages: 1,
  loading: false,
  hasError: false,
  error: '',
  lovedTracks: [],
}

function mapLovedToTracks(lovedTracks, allTracks) {
  const resultTracks = []
  for (let i = 0; i < allTracks.length; i += 1) {
    const lt = allTracks[i]
    const { name, artist } = lt

    // Find by name and artist
    const nameIndex = lovedTracks.find(a => (a.name === encodeURI(name) && a.artist === encodeURI(artist)))
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
      const { resultTracks, totalPages } = action.payload
      if (state.lovedTracks.length > 0) {
        const rTracks = mapLovedToTracks(state.lovedTracks, resultTracks)
        return {
          ...state,
          totalPages,
          tracks: rTracks,
          loading: false,
        }
      }
      return {
        ...state,
        ...INITIAL_STATE,
        tracks: resultTracks,
        totalPages,
      }
    case TRACKS_REQUEST_FAILURE:
      const errorMessage = errorCodes[action.payload]
      return {
        ...state,
        error: errorMessage,
        hasError: true,
        loading: false,
      }
    case GET_LOVED_TRACKS_SUCCESS:
      const mappedTracks = mapLovedToTracks(action.payload, state.tracks)
      if (mappedTracks.length > 0) {
        return {
          ...state,
          tracks: mappedTracks,
          lovedTracks: action.payload,
        }
      }
      return {
        ...state,
      }
    case MAP_LOVED_TRACKS:
      if (state.lovedTracks.length > 0) {
        const allTracks = mapLovedToTracks(state.lovedTracks, state.tracks)
        return {
          ...state,
          tracks: allTracks,
        }
      }
      return {
        ...state,
      }
    default:
      return state
  }
}
