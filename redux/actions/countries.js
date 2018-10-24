import { NavigationActions } from "react-navigation"
import Service from "../../api"
import { appStorage } from "../../api/Storage";

import {
  COUNTRIES_REQUEST,
  COUNTRIES_REQUEST_SUCCESS,
  COUNTRIES_REQUEST_FAILURE,
} from "./types"

export const getCountries = () => async dispatch => {
  dispatch({ type: COUNTRIES_REQUEST });
  try {
    const data = await Service().makeRequest("get", "restcountries", null, null);
    return dispatch(handleCountries(data));
  } catch (error) {
    return dispatch({
      type: COUNTRIES_REQUEST_FAILURE,
      payload: error.message
    });
  }
};

export const handleCountries = (countries) => async dispatch => {
  if (countries.length > 0) {
    console.log("Success")
    console.log(countries)
    let resultCountries = []
    for (let i = 0; i < countries.length; i ++) {
      console.log("Countries[i] equals ", countries[i])
      let c = {
        key: i.toString(),
        name: countries[i].name,
        flag: countries[i].flag,
        code: countries[i].alpha2Code
      }
      resultCountries.push(c)
    }
    dispatch({ type: COUNTRIES_REQUEST_SUCCESS, payload: resultCountries });
    await appStorage.storeCountries(resultCountries)
  }
  return false;
};