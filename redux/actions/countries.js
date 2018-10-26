import Service from '../../api'
import { appStorage } from '../../api/Storage'

import {
  COUNTRIES_REQUEST,
  COUNTRIES_REQUEST_SUCCESS,
  COUNTRIES_REQUEST_FAILURE,
  SAVE_LOCAL_COUNTRIES,
  FILTER_COUNTRIES,
  FILTER_COUNTRIES_CLEAR,
} from './types'

export const saveLocalCountries = countries => dispatch => dispatch({
  type: SAVE_LOCAL_COUNTRIES,
  payload: countries,
})

export const handleCountries = countries => async (dispatch) => {
  if (countries.length > 0) {
    const resultCountries = []
    for (let i = 0; i < countries.length; i += 1) {
      const c = {
        key: i.toString(),
        name: countries[i].name,
        flag: countries[i].flag, // This uri is .svg and cannot render it correctly
        code: countries[i].alpha2Code, // I'll use this code to get local image
      }
      resultCountries.push(c)
    }
    dispatch({ type: COUNTRIES_REQUEST_SUCCESS, payload: resultCountries })
    await appStorage.storeCountries(resultCountries)
  }
  return false
}

export const getCountries = () => async (dispatch) => {
  dispatch({ type: COUNTRIES_REQUEST })
  try {
    const data = await Service().makeRequest('get', 'restcountries', null, null)
    return dispatch(handleCountries(data))
  } catch (error) {
    return dispatch({
      type: COUNTRIES_REQUEST_FAILURE,
      payload: error.message,
    })
  }
}

export const filterCountries = value => (dispatch) => {
  if (value === '') {
    return dispatch({
      type: FILTER_COUNTRIES_CLEAR,
    })
  }
  return dispatch({
    type: FILTER_COUNTRIES,
    payload: value,
  })
}
