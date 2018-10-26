import Service from "../../api"
import config from "../../api/config"

import {
  TRACKS_REQUEST,
  TRACKS_REQUEST_SUCCESS,
  TRACKS_REQUEST_FAILURE
} from "./types"

function getCountryName(country) {
  if (country.indexOf("America") !== -1) return "United States"
  if (country.indexOf("Britain") !== -1) return "United Kingdom"
  return country
}

export const getTopTracks = (country, page = 1) => async dispatch => {
  dispatch({ type: TRACKS_REQUEST });

  let countryName = getCountryName(country)
  try {
    const endpoint = `?method=geo.gettoptracks&country=${countryName}&api_key=${config.FM.APIKey}&format=json&limit=50&page=${page}`
    const data = await Service().makeRequest("get", endpoint, null, null)

    if (data["error"] !== undefined) {
      return dispatch({
        type: TRACKS_REQUEST_FAILURE,
        payload: data["error"]
      })
    } else {
      return dispatch(handleTracks(data));
    }
  } catch (error) {
    if (error["response"] !== undefined) {
      let errorObject = error["response"].data
      let errorCode = errorObject["error"]
      return dispatch({
        type: TRACKS_REQUEST_FAILURE,
        payload: errorCode
      });
    }
  }
}

export const handleTracks = data => dispatch => {
  if (data.tracks.track.length > 0) {
    let resultTracks = []
    for (let i = 0; i < data.tracks.track.length; i ++) {
      let currentTrack = data.tracks.track[i]
      let c = {
        "key": i.toString(), 
        "name": currentTrack.name, 
        "artist": currentTrack.artist.name,
        "listeners": currentTrack.listeners,
        "trackImageUrl": currentTrack.image[2]["#text"],
        "trackImageLarge": currentTrack.image[3]["#text"],
        "mbid": currentTrack.mbid
      }
      resultTracks.push(c)
    }
    dispatch({ type: TRACKS_REQUEST_SUCCESS, payload: {resultTracks, totalPages: data.tracks["@attr"].totalPages} });
  }
  return false;
};