import Service from '../../api'
import config from '../../api/config'

import { appStorage } from '../../api/Storage'

import {
  GET_LOVED_TRACKS_REQUEST,
  GET_LOVED_TRACKS_SUCCESS,
  GET_LOVED_TRACKS_FAILURE,
} from './types'

export const handleLovedTracks = data => (dispatch) => {
  if (data.tracks.track.length > 0) {
    const resultTracks = []
    for (let i = 0; i < data.tracks.track.length; i += 1) {
      const currentTrack = data.tracks.track[i]
      const c = {
        key: i.toString(),
        name: currentTrack.name,
        artist: currentTrack.artist.name,
        mbid: currentTrack.mbid,
      }
      resultTracks.push(c)
    }
    dispatch({ type: GET_LOVED_TRACKS_SUCCESS, payload: resultTracks })
  }
  return false
}

export const getLovedTracks = () => async (dispatch) => {
  dispatch({ type: GET_LOVED_TRACKS_REQUEST })
  const user = await appStorage.getUsername()
  if (user && user !== '') {
    try {
      const endpoint = `?method=user.getlovedtracks&user=${user}&api_key=${config.FM.APIKey}&format=json`
      const data = await Service().makeRequest('get', endpoint, null, null)
      if (data['error'] !== undefined) {
        return dispatch({
          type: GET_LOVED_TRACKS_FAILURE,
          payload: data.error,
        })
      }
      return dispatch(handleLovedTracks(data))
    } catch (error) {
      if (error['response'] !== undefined) {
        const errorObject = error['response'].data
        const errorCode = errorObject['error']
        return dispatch({
          type: GET_LOVED_TRACKS_FAILURE,
          payload: errorCode,
        })
      }
    }
  }
  return true
}
