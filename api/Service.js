import axios from 'axios'
import md5 from 'crypto-js/md5'
import { appStorage } from './Storage'
import config from './config'

class Service {
  initialize() {
    this.API_BASE_URL = config.FM.baseURL
    this.API_BASE_URL_S = config.FM.baseURL_S
    this.COUNTRIES_URL = config.FM.countriesURL
  }

  encodeSearchParam(param) {
    if (param.indexOf(' ') !== -1) {
      return param.replace(/ /g, '+')
    }
    return param
  }

  async createApiSignature(username, password) {
    const parameters = `api_key${config.FM.APIKey}methodauth.getMobileSessionpassword${password}username${username}${config.FM.sharedSecret}`
    const encodedParameters = encodeURI(parameters)
    const api_sig = md5(encodedParameters)
    await appStorage.storeApiSig(api_sig.toString())
    return api_sig
  }

  async createApiSignatureLove(a, t) {
    const api_key = `api_key${config.FM.APIKey}`
    const artist = `artist${this.encodeSearchParam(a)}`
    const method = 'methodtrack.love'
    const session_key = await appStorage.getSessionKey()
    const sk = `sk${session_key}`
    const track = `track${this.encodeSearchParam(t)}`
    const secret = config.FM.sharedSecret
    const p = api_key + artist + method + sk + track + secret
    const api_sig = md5(p)
    return api_sig.toString()
  }

  async makeRequest(method, endpoint, body, header) {
    let constructedUrl = ''
    if (endpoint === 'restcountries') {
      constructedUrl = this.COUNTRIES_URL
    }

    if (method === 'post') {
      constructedUrl = `${this.API_BASE_URL_S}${endpoint}`
    } else {
      constructedUrl = `${this.API_BASE_URL}${endpoint}`
    }

    console.log("Constructed url: ", constructedUrl)

    const axiosConfig = {
      method,
      url: constructedUrl,
    }

    if (body) axiosConfig.data = body
    if (header) axiosConfig.header = header

    try {
      const response = await axios(axiosConfig)
      if (response.status >= 200 && response.status <= 299) {
        return response.data
      }
      if (response.status >= 400 && response.status <= 499) {
        return false
      }
      throw response
    } catch (error) {
      throw error
    }
  }
}

export const AppService = new Service()
