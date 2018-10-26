import axios from "axios";
import { appStorage } from "./Storage";
import config from './config'
import md5 from 'crypto-js/md5';

class Service {
  initialize() {
    this.API_BASE_URL = config.FM.baseURL;
    this.COUNTRIES_URL = config.FM.countriesURL
  }

  async createApiSignature(username, password) {
    let encodedPassword = encodeURI(password)
    let parameters = `api_key${config.FM.APIKey}methodauth.getMobileSessionpassword${encodedPassword}username${username}${config.FM.sharedSecret}`
    let encodedParameters = encodeURI(parameters)
    let api_sig = md5(encodedParameters)
    await appStorage.storeApiSig(api_sig.toString())
  }

  async makeRequest(method, endpoint, body, header) {
    let constructedUrl = ""
    if (endpoint === "restcountries") {
      constructedUrl = this.COUNTRIES_URL;
    } else {
      constructedUrl = `${this.API_BASE_URL}${endpoint}`;
    }

    console.log("URL: ", constructedUrl)

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
