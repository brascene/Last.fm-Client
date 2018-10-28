import Service from '../../api'
import config from '../../api/config'
import { appStorage } from '../../api/Storage'

import {
  TRACKS_REQUEST,
  TRACKS_REQUEST_SUCCESS,
  TRACKS_REQUEST_FAILURE,
  TRACK_LOVE_REQUEST,
  TRACK_LOVE_REQUEST_SUCCESS,
  TRACK_LOVE_REQUEST_FAILURE,
  TRACK_LOVE_REQ_RESET,
  MAP_LOVED_TRACKS,
} from './types'

const queryString = require('query-string')

function getCountryName(country) {
  if (country.indexOf('America') !== -1) return 'United States'
  if (country.indexOf('Britain') !== -1) return 'United Kingdom'
  return country
}

export const handleTracks = data => (dispatch) => {
  if (data.tracks.track.length > 0) {
    const resultTracks = []
    for (let i = 0; i < data.tracks.track.length; i += 1) {
      const currentTrack = data.tracks.track[i]
      const c = {
        key: i.toString(),
        name: currentTrack.name,
        artist: currentTrack.artist.name,
        listeners: currentTrack.listeners,
        trackImageUrl: currentTrack.image[2]['#text'],
        trackImageLarge: currentTrack.image[3]['#text'],
        mbid: currentTrack.mbid,
      }
      resultTracks.push(c)
    }
    dispatch({ type: TRACKS_REQUEST_SUCCESS, payload: { resultTracks, totalPages: data.tracks['@attr'].totalPages } })
  }
  return false
}

export const mapLovedTracks = lovedTracks => async dispatch => dispatch({ type: MAP_LOVED_TRACKS, payload: lovedTracks })

export const getTopTracks = (country, page = 1) => async (dispatch) => {
  dispatch({ type: TRACKS_REQUEST })
  const countryName = getCountryName(country)
  try {
    const endpoint = `?method=geo.gettoptracks&country=${countryName}&api_key=${config.FM.APIKey}&format=json&limit=50&page=${page}`
    const data = await Service().makeRequest('get', endpoint, null, null)

    if (data['error'] !== undefined) {
      return dispatch({
        type: TRACKS_REQUEST_FAILURE,
        payload: data.error,
      })
    }
    return dispatch(handleTracks(data))
  } catch (error) {
    if (error['response'] !== undefined) {
      const errorObject = error['response'].data
      const errorCode = errorObject['error']
      return dispatch({
        type: TRACKS_REQUEST_FAILURE,
        payload: errorCode,
      })
    }
  }
  return true
}

// Track.love

const loveRequest = ({ saved_session_key, artist, track }) => async (dispatch) => {
  const api_sig_love = await Service().createApiSignatureLove(artist, track)

  const body = {
    method: 'track.love',
    artist: encodeURI(artist),
    track: encodeURI(track),
    api_key: config.FM.APIKey,
    api_sig: api_sig_love.toString(),
    sk: saved_session_key,
  }
  const endpoint = '?format=json'
  const header = {
    'Content-type': config.API.xForm,
  }
  const data = queryString.stringify(body)

  try {
    const loveResponse = await Service().makeRequest('post', endpoint, data, header)
    if (Object.keys(loveResponse).length === 0) {
      return dispatch({
        type: TRACK_LOVE_REQUEST_SUCCESS,
        payload: 31,
      })
    }
    return dispatch({
      type: TRACK_LOVE_REQUEST_FAILURE,
      payload: 30,
    })
  } catch (error) {
    return dispatch({
      type: TRACK_LOVE_REQUEST_FAILURE,
      payload: 30,
    })
  }
}

export const loveTrack = loveObj => async (dispatch) => {
  const {
    track,
    artist,
    username,
    password,
  } = loveObj

  dispatch({ type: TRACK_LOVE_REQUEST })

  // If already authenticated - session key is stored locally
  const saved_session_key = await appStorage.getSessionKey()
  if (saved_session_key && saved_session_key.toString() !== '') {
    return dispatch(loveRequest({ saved_session_key: saved_session_key.toString(), track, artist }))
  }

  // If not authhenticated - perfom auth and love request
  const api_sig = await Service().createApiSignature(username, password)
  const endpoint = `?method=auth.getMobileSession&password=${encodeURIComponent(password)}&username=${username}&api_key=${config.FM.APIKey}&api_sig=${api_sig}&format=json`

  try {
    const sessionData = await Service().makeRequest('post', endpoint, null, null)
    if (sessionData['session'] !== undefined) {
      const sessionObj = sessionData['session']
      const session_key = sessionObj['key']
      const username = sessionObj['name']
      await appStorage.storeUsername(username)
      await appStorage.storeSessionKey(session_key)
      return dispatch(loveRequest({ saved_session_key: session_key, artist, track }))
    }
    return dispatch({ type: TRACK_LOVE_REQUEST_FAILURE, payload: 30 })
  } catch (error) {
    return dispatch({ type: TRACK_LOVE_REQUEST_FAILURE, payload: 30 })
  }
}

export const resetLoveReq = () => dispatch => dispatch({ type: TRACK_LOVE_REQ_RESET })
