import store from 'react-native-simple-store'
import config from './config'

export class Storage {
  constructor() {
    this.COUNTRIES = []
    this.COUNTRIES_KEY = config.StorageKeys.countries
    this.API_SIG_KEY = config.StorageKeys.api_sig
  }

  async storeApiSig(api_sig) {
    await store.save(this.API_SIG_KEY, api_sig)
  }

  async storeCountries(countries) {
    await store.save(this.COUNTRIES_KEY, countries)
  }

  async getCountries() {
    const countries = await store.get(this.COUNTRIES_KEY)
    return countries
  }

  async getApiSig() {
    const api_sig = await store.get(this.API_SIG_KEY)
    return api_sig
  }

  deleteCountries() {
    return store.delete(this.COUNTRIES_KEY)
  }

  deleteApiSig() {
    return store.delete(this.API_SIG_KEY)
  }
}

export const appStorage = new Storage()
