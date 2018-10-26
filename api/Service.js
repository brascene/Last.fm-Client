import axios from "axios";
import { appStorage } from "./Storage";
import config from './config'

const queryString = require("query-string");

class Service {
  initialize() {
    this.API_BASE_URL = config.FM.baseURL;
    this.COUNTRIES_URL = config.FM.countriesURL
  }

  async makeRequest(method, endpoint, body, header) {
    let constructedUrl = ""
    if (endpoint === "restcountries") {
      constructedUrl = this.COUNTRIES_URL;
    } else {
      constructedUrl = `${this.API_BASE_URL}${endpoint}`;
    }

    const axiosConfig = {
      method,
      url: constructedUrl
    };

    if (body) axiosConfig.data = body;

    try {
      const response = await axios(axiosConfig);
      if (response.status >= 200 && response.status <= 299) {
        return response.data;
      }
      if (response.status >= 400 && response.status <= 499) {
        return false;
      }
      throw response;
    } catch (error) {
      throw error
    }
  }
}

export const AppService = new Service();
