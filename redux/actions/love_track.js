import Service from '../../api'
import { appStorage } from '../../api/Storage'
import config from '../../api/config'

import {
  TRACK_LOVE_REQUEST,
  TRACK_LOVE_REQUEST_SUCCESS,
  TRACK_LOVE_REQUEST_FAILURE,
} from './types'

const queryString = require('query-string')

export const loveThisTrack = loveObj => async (dispatch) => {
  const {
    track, artist, username, password,
  } = loveObj

  // handle if alrady saved
  // const saved_session_key = await appStorage.getSessionKey()

  const api_sig = await Service().createApiSignature(username, password)
  const endpoint = `?method=auth.getMobileSession&password=${encodeURIComponent(password)}&username=${username}&api_key=${config.FM.APIKey}&api_sig=${api_sig}&format=json`
  dispatch({ type: TRACK_LOVE_REQUEST })
  try {
    const sessionData = await Service().makeRequest('post', endpoint, null, null)
    if (sessionData['session'] !== undefined) {
      const sessionObj = sessionData['session']
      const session_key = sessionObj['key']
      try {
        await appStorage.storeSessionKey(session_key)
        try {
          const api_sig_love = await Service().createApiSignatureLove(artist, track)

          const body = {
            method: 'track.love',
            artist,
            track,
            api_key: config.FM.APIKey,
            api_sig: api_sig_love.toString(),
            sk: session_key,
          }
          const loveEndpoint = '?format=json'
          const header = {
            'Content-type': config.API.xForm,
          }

          const data = queryString.stringify(body)

          try {
            const loveResponse = await Service().makeRequest('post', loveEndpoint, data, header)
            if (Object.keys(loveResponse).length === 0) {
              console.log("Added to loved!!!")
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
        } catch (error) {
          return dispatch({
            type: TRACK_LOVE_REQUEST_FAILURE,
            payload: 30,
          })
        }
      } catch (error) {
        return dispatch({
          type: TRACK_LOVE_REQUEST_FAILURE,
          payload: 30,
        })
      }
    } else {
      return dispatch({ type: TRACK_LOVE_REQUEST_FAILURE, payload: 30 })
    }
  } catch (error) {
    return dispatch({
      type: TRACK_LOVE_REQUEST_FAILURE,
      payload: 30,
    })
  }
}
