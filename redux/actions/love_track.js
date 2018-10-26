import config from "../../api/config"
import Service from "../../api"
import { appStorage } from "../../api/Storage"

import {
  TRACK_LOVE_REQUEST,
  TRACK_LOVE_REQUEST_SUCCESS,
  TRACK_LOVE_REQUEST_FAILURE
} from "./types"

export const loveThisTrack = (user, pass) => async dispatch => {
  let api_sig = Service().createApiSignature(user, pass)
  let savedApi_sig = await appStorage.getApiSig()
}